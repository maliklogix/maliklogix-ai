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

const injectScriptsIntoStaticHtml = async (config) => {
    try {
        const indexPath = path.join(__dirname, 'dist', 'index.html');
        if (!fs.existsSync(indexPath)) return;

        let html = await fs.promises.readFile(indexPath, 'utf8');

        // Clean previous script injections cleanly
        const startTag = '<!-- ML_SCRIPTS_START -->';
        const endTag = '<!-- ML_SCRIPTS_END -->';
        const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}\\n?`, 'g');
        html = html.replace(regex, '');

        if (!config.testMode && config.scripts && config.scripts.length > 0) {
            const scriptsHtml = config.scripts
                .filter(script => script.enabled) // Global static injection natively required
                .map(s => {
                    if (!s.code.includes('<script') && !s.code.includes('<meta')) {
                        return `<script${config.deferAll ? ' defer' : ''}>\n${s.code}\n</script>`;
                    }
                    return s.code;
                }).join('\n');

            if (scriptsHtml) {
                const injection = `${startTag}\n${scriptsHtml}\n${endTag}\n`;
                html = html.replace('</head>', `${injection}</head>`);
            }
        }

        await fs.promises.writeFile(indexPath, html, 'utf8');
        console.log('Successfully synced header scripts to static index.html');
    } catch (e) {
        console.error('Failed to update static HTML:', e);
    }
};

const initScriptsDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS site_scripts (
                id INT PRIMARY KEY DEFAULT 1,
                config JSON NOT NULL
            )
        `);
        const gaScript = `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-2ZWKHZ2KQ4"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-2ZWKHZ2KQ4');\n</script>`;
        const adsenseScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9083888001969660"\n     crossorigin="anonymous"></script>`;
        
        const defaultConfig = {
            scripts: [],
            deferAll: true,
            testMode: false,
            lastUpdated: new Date().toISOString()
        };

        // Insert default row if not exists
        await pool.query(
            "INSERT IGNORE INTO site_scripts (id, config) VALUES (1, ?)",
            [JSON.stringify(defaultConfig)]
        );
        console.log('Scripts DB initialized successfully');

        // Sync static HTML on boot for persistence
        const [rows] = await pool.query("SELECT config FROM site_scripts WHERE id = 1");
        if (rows.length > 0) {
            const config = typeof rows[0].config === 'string' ? JSON.parse(rows[0].config) : rows[0].config;
            await injectScriptsIntoStaticHtml(config);
        }
    } catch (err) {
        console.error('Error initializing Scripts DB:', err);
    }
};
initScriptsDB();

app.get('/api/admin/scripts', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT config FROM site_scripts WHERE id = 1");
        if (rows.length > 0) {
            res.json(typeof rows[0].config === 'string' ? JSON.parse(rows[0].config) : rows[0].config);
        } else {
            res.json({ scripts: [], deferAll: true, testMode: false, lastUpdated: new Date().toISOString() });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/admin/scripts', async (req, res) => {
    try {
        const config = {
            ...req.body,
            lastUpdated: new Date().toISOString()
        };
        const configStr = JSON.stringify(config);
        await pool.query(
            "INSERT INTO site_scripts (id, config) VALUES (1, ?) ON DUPLICATE KEY UPDATE config = ?",
            [configStr, configStr]
        );
        
        // Push updates dynamically to static HTML 
        await injectScriptsIntoStaticHtml(config);
        
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
 * STACK ENDPOINTS (Coupons & Deals)
 */

// Initialize DB tables for Stack Coupons & Deals
const initStackDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS stack_companies (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description VARCHAR(255),
                logo_url VARCHAR(500),
                affiliate_url VARCHAR(500),
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS stack_coupons (
                id INT AUTO_INCREMENT PRIMARY KEY,
                company_id VARCHAR(36) NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                type ENUM('coupon', 'deal') DEFAULT 'deal',
                code VARCHAR(100),
                affiliate_url VARCHAR(500),
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (company_id) REFERENCES stack_companies(id) ON DELETE CASCADE
            )
        `);
        console.log('Stack DB initialized successfully');
    } catch (err) {
        console.error('Error initializing Stack DB:', err);
    }
};
initStackDB();

// GET all active companies and their active coupons for public display
app.get('/api/stack/public', async (req, res) => {
    try {
        const [companies] = await pool.query("SELECT * FROM stack_companies WHERE status = 'active' ORDER BY name ASC");
        const [coupons] = await pool.query("SELECT * FROM stack_coupons WHERE status = 'active' ORDER BY created_at DESC");
        
        // Group coupons by company
        const stackData = companies.map(comp => {
            return {
                ...comp,
                coupons: coupons.filter(c => c.company_id === comp.id)
            };
        });
        
        res.json(stackData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all companies for admin
app.get('/api/admin/stack/companies', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM stack_companies ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single company
app.get('/api/admin/stack/companies/:id', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM stack_companies WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Company not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new company
app.post('/api/admin/stack/companies', async (req, res) => {
    const { name, description, logo_url, affiliate_url, status } = req.body;
    const id = crypto.randomUUID();
    try {
        await pool.query(
            "INSERT INTO stack_companies (id, name, description, logo_url, affiliate_url, status) VALUES (?, ?, ?, ?, ?, ?)",
            [id, name, description, logo_url, affiliate_url, status || 'active']
        );
        res.json({ id, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update company
app.put('/api/admin/stack/companies/:id', async (req, res) => {
    const { name, description, logo_url, affiliate_url, status } = req.body;
    try {
        await pool.query(
            "UPDATE stack_companies SET name=?, description=?, logo_url=?, affiliate_url=?, status=? WHERE id=?",
            [name, description, logo_url, affiliate_url, status, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE company
app.delete('/api/admin/stack/companies/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM stack_companies WHERE id = ?", [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET specific company's coupons (for admin)
app.get('/api/admin/stack/companies/:company_id/coupons', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM stack_coupons WHERE company_id = ? ORDER BY created_at DESC", [req.params.company_id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new coupon
app.post('/api/admin/stack/coupons', async (req, res) => {
    const { company_id, title, description, type, code, affiliate_url, status, expiry_date } = req.body;
    try {
        await pool.query(
            "INSERT INTO stack_coupons (company_id, title, description, type, code, affiliate_url, status, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [company_id, title, description, type, code, affiliate_url, status || 'active', expiry_date || null]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update coupon
app.put('/api/admin/stack/coupons/:id', async (req, res) => {
    const { title, description, type, code, affiliate_url, status, expiry_date } = req.body;
    try {
        await pool.query(
            "UPDATE stack_coupons SET title=?, description=?, type=?, code=?, affiliate_url=?, status=?, expiry_date=? WHERE id=?",
            [title, description, type, code, affiliate_url, status, expiry_date || null, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE coupon
app.delete('/api/admin/stack/coupons/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM stack_coupons WHERE id = ?", [req.params.id]);
        res.json({ success: true });
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

/**
 * YOUTUBE ENDPOINTS
 */

// Initialize DB tables for YouTube
const initYoutubeDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS youtube_videos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                youtubeUrl VARCHAR(500) NOT NULL,
                thumbnailUrl VARCHAR(500) NOT NULL,
                description TEXT,
                publishedAt DATETIME NOT NULL,
                duration VARCHAR(50),
                views INT DEFAULT 0,
                isFeatured BOOLEAN DEFAULT false,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS youtube_resources (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                type ENUM('doc', 'video_summary', 'ai_title', 'guide', 'tool', 'link', 'other') NOT NULL,
                url VARCHAR(500) NOT NULL,
                description TEXT,
                icon VARCHAR(255),
                tags VARCHAR(500),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS youtube_suggestions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                suggestion TEXT NOT NULL,
                source VARCHAR(50) DEFAULT 'youtube',
                status ENUM('pending', 'reviewed', 'ignored') DEFAULT 'pending',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS youtube_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                key_name VARCHAR(255) UNIQUE NOT NULL,
                value TEXT NOT NULL
            )
        `);
        
        // Seed default settings if empty
        const [settings] = await pool.query("SELECT COUNT(*) as count FROM youtube_settings");
        if (settings[0].count === 0) {
            await pool.query(`
                INSERT INTO youtube_settings (key_name, value) VALUES 
                ('channelUrl', 'https://youtube.com/@maliklogix'),
                ('channelHandle', '@maliklogix'),
                ('youtubeApiKey', ''),
                ('youtubeChannelId', 'UC-maliklogix-id-placeholder'),
                ('lastSync', '0'),
                ('showLatest', 'true'),
                ('showResources', 'true'),
                ('showSuggest', 'true'),
                ('resourcesPerPage', '10'),
                ('successMessage', 'Thanks! Your suggestion has been noted.')
            `);
        }
        console.log('YouTube DB initialized successfully');
    } catch (err) {
        console.error('Error initializing YouTube DB:', err);
    }
};
initYoutubeDB();

// --- YOUTUBE SYNC HELPER ---
const syncYoutubeVideos = async () => {
    try {
        const [settingsRows] = await pool.query("SELECT key_name, value FROM youtube_settings");
        const settings = settingsRows.reduce((acc, row) => ({ ...acc, [row.key_name]: row.value }), {});
        
        const apiKey = settings.youtubeApiKey;
        const channelId = settings.youtubeChannelId;

        if (!apiKey || !channelId) {
            return { success: false, error: "Missing configuration" };
        }

        // Fetch 3 most recent videos from YouTube
        const ytResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3&type=video`
        );
        
        if (!ytResponse.ok) {
            const errorData = await ytResponse.json();
            throw new Error(`YouTube API Error: ${errorData.error?.message || ytResponse.statusText}`);
        }

        const data = await ytResponse.json();
        const videos = data.items || [];

        for (const item of videos) {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const description = item.snippet.description;
            const thumbnailUrl = item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url;
            const publishedAt = item.snippet.publishedAt;
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

            // We use INSERT ... ON DUPLICATE KEY UPDATE but youtubeUrl isn't unique in schema yet.
            // Let's check if video exists by URL
            const [existing] = await pool.query("SELECT id FROM youtube_videos WHERE youtubeUrl = ?", [youtubeUrl]);
            
            if (existing.length > 0) {
                await pool.query(
                    "UPDATE youtube_videos SET title=?, thumbnailUrl=?, description=?, publishedAt=? WHERE id=?",
                    [title, thumbnailUrl, description, publishedAt, existing[0].id]
                );
            } else {
                await pool.query(
                    "INSERT INTO youtube_videos (title, youtubeUrl, thumbnailUrl, description, publishedAt, duration, views, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [title, youtubeUrl, thumbnailUrl, description, publishedAt, 'Auto', 0, 0]
                );
            }
        }

        // Update lastSync timestamp
        const now = Date.now().toString();
        // Ensure tables exist before sync if not already checked
        await initYoutubeDB();

        await pool.query("UPDATE youtube_settings SET value=? WHERE key_name='lastSync'", [now]);
        
        return { success: true, count: videos.length };
    } catch (error) {
        console.error("YouTube sync error:", error);
        return { success: false, error: error.message };
    }
};


// --- PUBLIC API ROUTES ---

// GET latest videos (limit 3)
app.get('/api/youtube/videos', async (req, res) => {
    try {
        // Auto-sync logic: if lastSync > 24 hours, trigger background sync
        const [syncRows] = await pool.query("SELECT value FROM youtube_settings WHERE key_name = 'lastSync'");
        const lastSync = syncRows.length > 0 ? parseInt(syncRows[0].value) : 0;
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (Date.now() - lastSync > oneDay) {
            syncYoutubeVideos().catch(err => console.error("Auto-sync background error:", err));
        }

        const [videos] = await pool.query("SELECT * FROM youtube_videos ORDER BY publishedAt DESC LIMIT 3");
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET resources
app.get('/api/youtube/resources', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const type = req.query.type || 'all';
        
        // get limit from settings
        const [settingRows] = await pool.query("SELECT value FROM youtube_settings WHERE key_name = 'resourcesPerPage'");
        const limit = settingRows.length > 0 ? parseInt(settingRows[0].value) : 10;
        const offset = (page - 1) * limit;

        let query = "SELECT * FROM youtube_resources";
        let params = [];
        
        if (type !== 'all') {
            query += " WHERE type = ?";
            params.push(type);
        }
        
        const countQuery = query.replace("SELECT *", "SELECT COUNT(*) as total");
        const [countResult] = await pool.query(countQuery, params);
        const total = countResult[0].total;

        query += " ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);
        
        const [resources] = await pool.query(query, params);
        
        res.json({
            data: resources,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET public settings
app.get('/api/youtube/settings', async (req, res) => {
    try {
        const [settings] = await pool.query("SELECT key_name, value FROM youtube_settings");
        const config = {};
        settings.forEach(s => config[s.key_name] = s.value);
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST suggestion
app.post('/api/youtube/suggest', async (req, res) => {
    try {
        const { email, suggestion, source } = req.body;
        if (!email || !suggestion) return res.status(400).json({ error: "Email and suggestion required" });
        
        await pool.query("INSERT INTO youtube_suggestions (email, suggestion, source) VALUES (?, ?, ?)", [email, suggestion, source || 'youtube']);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- ADMIN API ROUTES ---

// GET all videos
app.get('/api/admin/youtube/videos', async (req, res) => {
    try {
        const [videos] = await pool.query("SELECT * FROM youtube_videos ORDER BY publishedAt DESC");
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/admin/youtube/videos', async (req, res) => {
    try {
        const { title, youtubeUrl, thumbnailUrl, description, publishedAt, duration, views, isFeatured } = req.body;
        await pool.query(
            "INSERT INTO youtube_videos (title, youtubeUrl, thumbnailUrl, description, publishedAt, duration, views, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [title, youtubeUrl, thumbnailUrl, description, new Date(publishedAt), duration, views || 0, isFeatured || false]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/admin/youtube/videos/:id', async (req, res) => {
    try {
        const { title, youtubeUrl, thumbnailUrl, description, publishedAt, duration, views, isFeatured } = req.body;
        await pool.query(
            "UPDATE youtube_videos SET title=?, youtubeUrl=?, thumbnailUrl=?, description=?, publishedAt=?, duration=?, views=?, isFeatured=? WHERE id=?",
            [title, youtubeUrl, thumbnailUrl, description, new Date(publishedAt), duration, views || 0, isFeatured || false, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/admin/youtube/videos/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM youtube_videos WHERE id=?", [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Resources CRUD
app.get('/api/admin/youtube/resources', async (req, res) => {
    try {
        const [resources] = await pool.query("SELECT * FROM youtube_resources ORDER BY createdAt DESC");
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/admin/youtube/resources', async (req, res) => {
    try {
        const { title, type, url, description, icon, tags } = req.body;
        await pool.query(
            "INSERT INTO youtube_resources (title, type, url, description, icon, tags) VALUES (?, ?, ?, ?, ?, ?)",
            [title, type, url, description, icon, tags]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/admin/youtube/resources/:id', async (req, res) => {
    try {
        const { title, type, url, description, icon, tags } = req.body;
        await pool.query(
            "UPDATE youtube_resources SET title=?, type=?, url=?, description=?, icon=?, tags=? WHERE id=?",
            [title, type, url, description, icon, tags, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/admin/youtube/resources/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM youtube_resources WHERE id=?", [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Suggestions
app.get('/api/admin/youtube/suggestions', async (req, res) => {
    try {
        const [suggestions] = await pool.query("SELECT * FROM youtube_suggestions ORDER BY createdAt DESC");
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/admin/youtube/suggestions/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await pool.query("UPDATE youtube_suggestions SET status=? WHERE id=?", [status, req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/admin/youtube/suggestions/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM youtube_suggestions WHERE id=?", [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin Settings
app.post('/api/admin/youtube/settings', async (req, res) => {
    try {
        const settings = req.body;
        for (const [key, value] of Object.entries(settings)) {
            await pool.query(
                "INSERT INTO youtube_settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=?",
                [key, String(value), String(value)]
            );
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Manual Sync Route
app.post('/api/admin/youtube/sync', async (req, res) => {
    try {
        const result = await syncYoutubeVideos();
        if (result.success) {
            res.json({ success: true, message: `Successfully synced ${result.count} videos.` });
        } else {
            res.status(400).json({ success: false, error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Backend API running at http://localhost:${port}`);
});

// ─── Serve React SPA (Production) ────────────────────────────────────────────
// This must come AFTER all API routes.

// Sitemap.xml Generator
app.get('/sitemap.xml', async (req, res) => {
    const baseUrl = 'https://maliklogix.com';
    try {
        const [posts] = await pool.query("SELECT slug, updated_at FROM posts WHERE status = 'published'");
        const [services] = await pool.query("SELECT slug FROM services WHERE status = 'active'");

        const staticRoutes = [
            '', '/about', '/contact', '/philosophy', '/blog', '/founder', '/legal', '/docs', 
            '/services', '/stack/coupons', '/youtube', '/instagram', '/github'
        ];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // Add static routes
        staticRoutes.forEach(route => {
            xml += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
        });

        // Add services
        services.forEach(s => {
            xml += `  <url>\n    <loc>${baseUrl}/services/${s.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
        });

        // Add blog posts
        posts.forEach(p => {
            const date = p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
            xml += `  <url>\n    <loc>${baseUrl}/blog/${p.slug}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        });

        xml += `</urlset>`;
        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Error generating sitemap');
    }
});

// When deployed, Express serves the built Vite output (dist/) for every
// non-API request. React Router then handles /dash, /contact, etc. client-side.
app.use(express.static(path.join(__dirname, 'dist'), { index: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/{*path}', async (req, res) => {
    try {
        let htmlBase = await fs.promises.readFile(path.join(__dirname, 'dist', 'index.html'), 'utf8');

        // Dynamic CSS Inlining to prevent render-blocking (Manual SSR-like optimization)
        try {
            const assetsDir = path.join(__dirname, 'dist', 'assets');
            const files = await fs.promises.readdir(assetsDir);
            const cssFile = files.find(f => f.endsWith('.css') && f.startsWith('index-'));
            
            if (cssFile) {
                const cssPath = path.join(assetsDir, cssFile);
                const cssContent = await fs.promises.readFile(cssPath, 'utf8');
                // Replace the link tag with the actual style content
                const linkTagRegex = new RegExp(`<link[^>]*href=["']\/assets\/${cssFile}["'][^>]*>`, 'i');
                htmlBase = htmlBase.replace(linkTagRegex, `<style>\n${cssContent}\n</style>`);
            }
        } catch (cssErr) {
            console.warn('CSS inlining failed, falling back to linked CSS:', cssErr.message);
        }

        // Fetch dynamic system header scripts
        const [rows] = await pool.query("SELECT config FROM site_scripts WHERE id = 1");
        if (rows.length > 0) {
            const config = typeof rows[0].config === 'string' ? JSON.parse(rows[0].config) : rows[0].config;
            
            // Handle active test mode checking preview URL
            const isPreview = req.query.ml_preview === '1';
            const shouldInject = !(config.testMode && !isPreview);

            if (shouldInject && config.scripts && config.scripts.length > 0) {
                // Determine normalized current path
                const pathStr = req.path;
                
                const scriptsHtml = config.scripts
                    .filter(script => {
                        if (!script.enabled) return false;
                        if (script.injectOn === 'homepage') return pathStr === '/';
                        return true; // injectOn === 'all'
                    })
                    .map(s => {
                        // If they are just code snippets without <script> tag, we wrap it safely
                        if (!s.code.includes('<script') && !s.code.includes('<meta')) {
                            return `\n<script${config.deferAll ? ' defer' : ''}>\n${s.code}\n</script>\n`;
                        }
                        return `\n${s.code}\n`;
                    }).join('');

                if (scriptsHtml) {
                    htmlBase = htmlBase.replace('</head>', `${scriptsHtml}\n</head>`);
                }
            }
        }
        // Inject JSON-LD Schema
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MalikLogix",
            "url": "https://maliklogix.com",
            "logo": "https://maliklogix.com/favicon.svg",
            "description": "Premium AI digital marketing and automation agency specializing in SEO, SGE, and business workflow optimization.",
            "sameAs": [
                "https://x.com/maliklogix",
                "https://github.com/maliklogix",
                "https://maliklogix.com/youtube",
                "https://maliklogix.com/instagram"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "url": "https://maliklogix.com/contact"
            }
        };
        const schemaHtml = `\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`;
        htmlBase = htmlBase.replace('</head>', `${schemaHtml}</head>`);

        res.send(htmlBase);
    } catch (e) {
        console.error('Error during SSR script injection:', e);
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
});
