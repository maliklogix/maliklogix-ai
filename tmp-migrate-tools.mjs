import mysql from 'mysql2/promise';

const DB_URL = 'mysql://u373901266_maliklogix:Maliklog786555@srv1562.hstgr.io:3306/u373901266_maliklogix';

async function migrate() {
    const connection = await mysql.createConnection(DB_URL);
    console.log('Connected for tools migration');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS site_tools (
            id INT AUTO_INCREMENT PRIMARY KEY,
            slug VARCHAR(100) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            category VARCHAR(100),
            status ENUM('active', 'inactive') DEFAULT 'active',
            cta_text VARCHAR(100),
            cta_url VARCHAR(255),
            icon_name VARCHAR(50),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    const seedQuery = `
        INSERT IGNORE INTO site_tools (slug, name, description, category, cta_text, cta_url, icon_name)
        VALUES 
        ('automation', 'OpenClaw Automation', 'Build complex AI automation loops with our visual builder.', 'OpenClaw', 'Launch Builder', '/tools/openclaw/automation', 'Zap'),
        ('extensions', 'Chrome Extensions', 'Custom AI extensions for your browser and workflow.', 'OpenClaw', 'Download', '/tools/openclaw/extensions', 'Puzzle'),
        ('skillhub', 'AI SkillHub', 'A marketplace of pre-built AI skills for your business.', 'OpenClaw', 'Browse Skills', '/tools/openclaw/skillhub', 'Layers'),
        ('submit', 'Submit Tool', 'Submit your own AI tool to the MalikLogix ecosystem.', 'OpenClaw', 'Submit Now', '/tools/openclaw/submit', 'Plus')
    `;

    try {
        await connection.query(createTableQuery);
        await connection.query(seedQuery);
        console.log('Tools table created and seeded');
    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

migrate();
