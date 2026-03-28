import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// File Upload Endpoint
app.post('/api/admin/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

const DB_URL = process.env.DB_URL;
const pool = mysql.createPool({
    uri: DB_URL,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 5000,
    connectTimeout: 20000, // 20 seconds
    acquireTimeout: 20000,
    timeout: 30000
});

// Test connection
pool.getConnection()
    .then(conn => {
        console.log('Successfully connected to Hostinger MySQL');
        conn.release();
    })
    .catch(err => {
        console.error('Initial DB Connection Error:', err);
    });

// Helper for retrying queries with explicit connection management
const executeQuery = async (query, params = [], retries = 3) => {
    let lastError;
    for (let i = 0; i < retries; i++) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [results] = await connection.query(query, params);
            return [results];
        } catch (error) {
            lastError = error;
            if ((error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.fatal) && i < retries - 1) {
                console.warn(`Database connection error (${error.code}). Retrying (${i + 1}/${retries})...`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s instead of 1s
                continue;
            }
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }
    throw lastError;
};

// GET all published blog posts
app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, title, subtitle, slug, cover_image_url, author_name, author_avatar, author_twitter, category, tags, read_time_mins, status, featured, subscriber_only, views, sponsor_name, sponsor_logo, sponsor_url, sponsor_body, seo_title, seo_description, og_image, published_at, created_at, updated_at FROM posts WHERE status = 'published' ORDER BY published_at DESC"
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET all posts for admin (including drafts)
app.get('/api/admin/posts', async (req, res) => {
    try {
        const [rows] = await executeQuery(
            "SELECT id, title, subtitle, slug, category, status, author_name, published_at, created_at FROM posts ORDER BY created_at DESC"
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching admin posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET single post for admin
app.get('/api/admin/posts/:id', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM posts WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new post
app.post('/api/admin/posts', async (req, res) => {
    console.log('Received NEW POST request:', req.body);
    const { title, subtitle, slug, content_html, category, status, author_name, cover_image_url, tags, published_at } = req.body;
    const id = crypto.randomUUID();
    try {
        await executeQuery(
            "INSERT INTO posts (id, title, subtitle, slug, content_html, category, status, author_name, cover_image_url, tags, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id, title, subtitle, slug, content_html, category, status || 'draft', author_name || 'Admin', cover_image_url, JSON.stringify(tags || []), published_at || null]
        );
        res.json({ id });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: error.message });
    }
});

// PUT update post
app.put('/api/admin/posts/:id', async (req, res) => {
    console.log(`Received UPDATE POST request for ID ${req.params.id}:`, req.body);
    const { title, subtitle, slug, content_html, category, status, author_name, cover_image_url, tags, published_at } = req.body;
    try {
        await executeQuery(
            "UPDATE posts SET title=?, subtitle=?, slug=?, content_html=?, category=?, status=?, author_name=?, cover_image_url=?, tags=?, published_at=? WHERE id=?",
            [title, subtitle, slug, content_html, category, status, author_name, cover_image_url, JSON.stringify(tags || []), published_at || null, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE post
app.delete('/api/admin/posts/:id', async (req, res) => {
    console.log(`Attempting to delete post with ID: ${req.params.id}`);
    try {
        const [result] = await executeQuery("DELETE FROM posts WHERE id = ?", [req.params.id]);
        console.log(`Delete result:`, result);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found or already deleted' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error(`Error deleting post ${req.params.id}:`, error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * SERVICES ENDPOINTS
 */

// GET all services
app.get('/api/admin/services', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM services ORDER BY group_name, title");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single service
app.get('/api/admin/services/:slug', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM services WHERE slug = ?", [req.params.slug]);
        if (rows.length === 0) return res.status(404).json({ error: 'Service not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update service
app.put('/api/admin/services/:slug', async (req, res) => {
    const { title, subtitle, group_name, status, hero_description, cta_primary, cta_secondary, benefits, steps, stats, meta_title, meta_desc, og_image } = req.body;
    try {
        await executeQuery(
            "UPDATE services SET title=?, subtitle=?, group_name=?, status=?, hero_description=?, cta_primary=?, cta_secondary=?, benefits=?, steps=?, stats=?, meta_title=?, meta_desc=?, og_image=? WHERE slug=?",
            [title, subtitle, group_name, status, hero_description, cta_primary, cta_secondary, JSON.stringify(benefits), JSON.stringify(steps), JSON.stringify(stats), meta_title, meta_desc, og_image, req.params.slug]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * LEADS ENDPOINTS
 */

// GET all leads
app.get('/api/admin/leads', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM leads ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single lead
app.get('/api/admin/leads/:id', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM leads WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Lead not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update lead
app.put('/api/admin/leads/:id', async (req, res) => {
    const { status, priority, assigned_to } = req.body;
    try {
        await executeQuery(
            "UPDATE leads SET status=?, priority=?, assigned_to=? WHERE id=?",
            [status, priority, assigned_to, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * NEWSLETTER ENDPOINTS
 */

// GET all subscribers
app.get('/api/admin/subscribers', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM subscribers ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET newsletter stats
app.get('/api/admin/stats/newsletters', async (req, res) => {
    try {
        const [subRow] = await executeQuery("SELECT COUNT(*) as total FROM subscribers WHERE status = 'active'");
        const [sentRow] = await executeQuery("SELECT COUNT(*) as total FROM newsletters WHERE status = 'sent'");
        res.json({
            totalSubscribers: subRow[0].total,
            campaignsSent: sentRow[0].total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all newsletters (campaigns)
app.get('/api/admin/newsletters', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM newsletters ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new campaign
app.post('/api/admin/newsletters', async (req, res) => {
    const { subject, content_html, status, scheduled_for } = req.body;
    try {
        const [result] = await executeQuery(
            "INSERT INTO newsletters (subject, content_html, status, scheduled_for) VALUES (?, ?, ?, ?)",
            [subject, content_html, status || 'draft', scheduled_for]
        );
        res.json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * TOOLS ENDPOINTS
 */

// GET all tools
app.get('/api/admin/tools', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM site_tools ORDER BY category, name");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single tool
app.get('/api/admin/tools/:id', async (req, res) => {
    try {
        const [rows] = await executeQuery("SELECT * FROM site_tools WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Tool not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update tool
app.put('/api/admin/tools/:id', async (req, res) => {
    const { name, description, category, status, cta_text, cta_url, icon_name } = req.body;
    try {
        await executeQuery(
            "UPDATE site_tools SET name=?, description=?, category=?, status=?, cta_text=?, cta_url=?, icon_name=? WHERE id=?",
            [name, description, category, status, cta_text, cta_url, icon_name, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * HEADER SCRIPTS ENDPOINTS
 */

const SCRIPTS_CONFIG_PATH = path.join(__dirname, 'public/scripts-config.json');

app.get('/api/admin/scripts', async (req, res) => {
    try {
        const data = await fs.promises.readFile(SCRIPTS_CONFIG_PATH, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        // If file doesn't exist, return default
        res.json({ scripts: [], deferAll: true, testMode: false, lastUpdated: new Date().toISOString() });
    }
});

app.post('/api/admin/scripts', async (req, res) => {
    try {
        const config = {
            ...req.body,
            lastUpdated: new Date().toISOString()
        };
        await fs.promises.writeFile(SCRIPTS_CONFIG_PATH, JSON.stringify(config, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GLOBAL STATS
 */

app.get('/api/admin/stats', async (req, res) => {
    try {
        const [posts] = await executeQuery("SELECT COUNT(*) as total FROM posts");
        const [subs] = await executeQuery("SELECT COUNT(*) as total FROM subscribers WHERE status = 'active'");
        const [leads] = await executeQuery("SELECT COUNT(*) as total FROM leads WHERE status = 'new'");
        const [services] = await executeQuery("SELECT COUNT(*) as total FROM services");
        
        res.json({
            posts: posts[0].total,
            subscribers: subs[0].total,
            openLeads: leads[0].total,
            services: services[0].total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single blog post by slug
app.get('/api/posts/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const [rows] = await pool.query(
            "SELECT * FROM posts WHERE slug = ? AND status = 'published' LIMIT 1",
            [slug]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Backend API running at http://localhost:${port}`);
});

// ─── Serve React SPA (Production) ────────────────────────────────────────────
// This must come AFTER all API routes.
// When deployed, Express serves the built Vite output (dist/) for every
// non-API request. React Router then handles /dash, /contact, etc. client-side.
app.use(express.static(path.join(__dirname, 'dist')));



app.get('/{*path}', (req, res) => {

    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
