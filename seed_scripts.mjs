import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const gaScript = `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-2ZWKHZ2KQ4"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-2ZWKHZ2KQ4');\n</script>`;

const adsenseScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9083888001969660"\n     crossorigin="anonymous"></script>`;

const config = {
    scripts: [
        { id: 'ga', name: 'Google Analytics', code: gaScript, enabled: true, injectOn: 'all', strategy: 'afterInteractive' },
        { id: 'adsense', name: 'Google AdSense', code: adsenseScript, enabled: true, injectOn: 'all', strategy: 'afterInteractive' }
    ],
    deferAll: true,
    testMode: false,
    lastUpdated: new Date().toISOString()
};

async function seed() {
    try {
        console.log("Seeding site_scripts table with Analytics and AdSense...");
        const configStr = JSON.stringify(config);
        
        // Ensure table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS site_scripts (
                id INT PRIMARY KEY DEFAULT 1,
                config JSON NOT NULL
            )
        `);

        await pool.query(
            "INSERT INTO site_scripts (id, config) VALUES (1, ?) ON DUPLICATE KEY UPDATE config = ?",
            [configStr, configStr]
        );
        
        console.log("Database seeded successfully.");

        // Also manually trigger the injection into dist/index.html to be absolutely sure
        const indexPath = path.join(__dirname, 'dist', 'index.html');
        if (await fs.stat(indexPath).catch(() => false)) {
            let html = await fs.readFile(indexPath, 'utf8');
            const startTag = '<!-- ML_SCRIPTS_START -->';
            const endTag = '<!-- ML_SCRIPTS_END -->';
            const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}\\n?`, 'g');
            html = html.replace(regex, '');

            const scriptsHtml = config.scripts
                .filter(s => s.enabled)
                .map(s => s.code)
                .join('\n');

            if (scriptsHtml) {
                const injection = `${startTag}\n${scriptsHtml}\n${endTag}\n`;
                html = html.replace('</head>', `${injection}</head>`);
            }

            await fs.writeFile(indexPath, html, 'utf8');
            console.log("Injected scripts into dist/index.html physically.");
        } else {
            console.warn("dist/index.html not found, cannot inject statically.");
        }

        process.exit(0);
    } catch (err) {
        console.error("Error seeding:", err);
        process.exit(1);
    }
}

seed();
