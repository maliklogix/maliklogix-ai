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

// GET all uploaded media files
app.get('/api/admin/media', async (req, res) => {
    const uploadsDir = path.join(__dirname, 'public/uploads');
    try {
        if (!fs.existsSync(uploadsDir)) {
            return res.json([]);
        }
        const files = await fs.promises.readdir(uploadsDir);
        const fileDetails = await Promise.all(
            files.map(async (file) => {
                const stats = await fs.promises.stat(path.join(uploadsDir, file));
                return {
                    name: file,
                    url: `http://localhost:3001/uploads/${file}`,
                    size: stats.size,
                    time: stats.mtime,
                    isImage: /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
                };
            })
        );
        // Sort by newest first
        res.json(fileDetails.sort((a, b) => b.time - a.time));
    } catch (error) {
        console.error('Error reading media library:', error);
        res.status(500).json({ error: 'Failed to read media library' });
    }
});

// DELETE media file
app.delete('/api/admin/media/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public/uploads', filename);
    try {
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

const pool = mysql.createPool({
    uri: process.env.DB_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



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
        const [rows] = await pool.query(
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
        const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);
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
        await pool.query(
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
        await pool.query(
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
        const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
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
        const [rows] = await pool.query("SELECT * FROM services ORDER BY group_name, title");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single service
app.get('/api/admin/services/:slug', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM services WHERE slug = ?", [req.params.slug]);
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
        await pool.query(
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
        const [rows] = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single lead
app.get('/api/admin/leads/:id', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM leads WHERE id = ?", [req.params.id]);
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
        await pool.query(
            "UPDATE leads SET status=?, priority=?, assigned_to=? WHERE id=?",
            [status, priority, assigned_to, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE single lead
app.delete('/api/admin/leads/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM leads WHERE id=?", [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST batch delete leads
app.post('/api/admin/leads/batch-delete', async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'No IDs provided' });
    }
    try {
        await pool.query("DELETE FROM leads WHERE id IN (?)", [ids]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new lead from contact form
app.post('/api/leads', async (req, res) => {
    console.log('Incoming Lead Submission:', req.body);
    const { name, email, businessType, budget, message } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
        await pool.query(
            "INSERT INTO leads (name, email, service, source, message, status, priority, country, assigned_to) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                name, 
                email, 
                businessType || 'General Inquiry', 
                budget || 'Not Specified', 
                message || '', 
                'new', 
                'medium',
                'Unknown', // country default
                'Malik Farooq' // assigned_to default
            ]
        );
        console.log('Lead saved successfully to database');
        res.json({ success: true });
    } catch (error) {
        console.error('DATABASE ERROR:', error);
        res.status(500).json({ error: `Database Error: ${error.message}` });
    }
});

/**
 * NEWSLETTER ENDPOINTS
 */

// GET all subscribers
app.get('/api/admin/subscribers', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM subscribers ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET newsletter stats
app.get('/api/admin/stats/newsletters', async (req, res) => {
    try {
        const [subRow] = await pool.query("SELECT COUNT(*) as total FROM subscribers WHERE status = 'active'");
        const [sentRow] = await pool.query("SELECT COUNT(*) as total FROM newsletters WHERE status = 'sent'");
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
        const [rows] = await pool.query("SELECT * FROM newsletters ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new campaign
app.post('/api/admin/newsletters', async (req, res) => {
    const { subject, content_html, status, scheduled_for } = req.body;
    try {
        const [result] = await pool.query(
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
        const [rows] = await pool.query("SELECT * FROM site_tools ORDER BY category, name");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single tool
app.get('/api/admin/tools/:id', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM site_tools WHERE id = ?", [req.params.id]);
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
        await pool.query(
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
        const [posts] = await pool.query("SELECT COUNT(*) as total FROM posts");
        const [subs] = await pool.query("SELECT COUNT(*) as total FROM subscribers WHERE status = 'active'");
        const [leads] = await pool.query("SELECT COUNT(*) as total FROM leads WHERE status = 'new'");
        const [services] = await pool.query("SELECT COUNT(*) as total FROM services");

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

/**
 * LIVE AGENT / CHATBOT ENDPOINTS
 */

// Initialize DB tables for Chat if they don't exist
const initChatDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS chat_sessions (
                id VARCHAR(36) PRIMARY KEY,
                status ENUM('active', 'completed') DEFAULT 'active',
                user_name VARCHAR(255) DEFAULT 'Visitor',
                user_email VARCHAR(255),
                last_message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS chat_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                session_id VARCHAR(36),
                role ENUM('user', 'assistant') NOT NULL,
                sender_name VARCHAR(255) DEFAULT 'MalikBot',
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
            )
        `);
        // Check if user_email exists, if not add it (for migration)
        const [cols] = await pool.query("SHOW COLUMNS FROM chat_sessions LIKE 'user_email'");
        if (cols.length === 0) {
            await pool.query("ALTER TABLE chat_sessions ADD COLUMN user_email VARCHAR(255) AFTER user_name");
        }
        const [msgCols] = await pool.query("SHOW COLUMNS FROM chat_messages LIKE 'sender_name'");
        if (msgCols.length === 0) {
            await pool.query("ALTER TABLE chat_messages ADD COLUMN sender_name VARCHAR(255) DEFAULT 'MalikBot' AFTER role");
        }
        const [aiCols] = await pool.query("SHOW COLUMNS FROM chat_sessions LIKE 'is_ai_enabled'");
        if (aiCols.length === 0) {
            await pool.query("ALTER TABLE chat_sessions ADD COLUMN is_ai_enabled BOOLEAN DEFAULT TRUE AFTER status");
        }
    } catch (err) {
        console.error('Error initializing Chat DB:', err);
    }
};
initChatDB();

// POST initialize or update session
app.post('/api/chat/session', async (req, res) => {
    const { id, user_name, user_email, status } = req.body;
    try {
        let sessionId = id;
        let isAiEnabled = true;

        // 1. Find existing session by email if provided
        if (user_email) {
            const [existing] = await pool.query("SELECT id, is_ai_enabled FROM chat_sessions WHERE user_email = ?", [user_email]);
            if (existing.length > 0) {
                return res.json({ id: existing[0].id, is_ai_enabled: !!existing[0].is_ai_enabled, success: true });
            }
        }

        // 2. Or find by provided ID
        if (sessionId) {
            const [existingById] = await pool.query("SELECT id, is_ai_enabled FROM chat_sessions WHERE id = ?", [sessionId]);
            if (existingById.length > 0) {
                isAiEnabled = !!existingById[0].is_ai_enabled;
                await pool.query("UPDATE chat_sessions SET status = ?, user_email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [status || 'active', user_email || null, sessionId]);
            } else {
                // If ID was provided but not found, insert it
                await pool.query("INSERT INTO chat_sessions (id, user_name, user_email, status) VALUES (?, ?, ?, ?)", [sessionId, user_name || 'Visitor', user_email || null, status || 'active']);
            }
        } else {
            // 3. Create new session if no Email/ID
            sessionId = crypto.randomUUID();
            await pool.query("INSERT INTO chat_sessions (id, user_name, user_email, status) VALUES (?, ?, ?, ?)", [sessionId, user_name || 'Visitor', user_email || null, status || 'active']);
        }

        res.json({ id: sessionId, is_ai_enabled: isAiEnabled, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST save a chat message
app.post('/api/chat/message', async (req, res) => {
    const { session_id, role, content, sender_name } = req.body;
    try {
        await pool.query("INSERT INTO chat_messages (session_id, role, content, sender_name) VALUES (?, ?, ?, ?)", [session_id, role, content, sender_name || (role === 'user' ? 'Client' : 'MalikBot')]);
        await pool.query("UPDATE chat_sessions SET last_message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [content, session_id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all chat sessions (Admin)
app.get('/api/admin/chat/sessions', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM chat_sessions ORDER BY updated_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET messages for a session (Admin)
app.get('/api/admin/chat/sessions/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`[ADMIN] Fetching history for session: ${id}`);
    try {
        const [rows] = await pool.query("SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC", [id]);
        console.log(`[ADMIN] Found ${rows.length} messages for session ${id}`);
        res.json(rows);
    } catch (error) {
        console.error(`[ADMIN] ERROR fetching history for ${id}:`, error);
        res.status(500).json({ error: error.message });
    }
});

// POST toggle AI for a session (Admin)
app.post('/api/admin/chat/sessions/:id/toggle-ai', async (req, res) => {
    const { enabled } = req.body;
    try {
        await pool.query("UPDATE chat_sessions SET is_ai_enabled = ? WHERE id = ?", [enabled, req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE chat session (Admin)
app.delete('/api/admin/chat/sessions/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM chat_sessions WHERE id = ?", [req.params.id]);
        res.json({ success: true });
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
