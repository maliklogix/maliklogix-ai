import mysql from 'mysql2/promise';

const DB_URL = 'mysql://u373901266_maliklogix:Maliklog786555@srv1562.hstgr.io:3306/u373901266_maliklogix';

async function migrate() {
    const connection = await mysql.createConnection(DB_URL);
    console.log('Connected for newsletter migration');

    const createSubscribersTable = `
        CREATE TABLE IF NOT EXISTS subscribers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255),
            status ENUM('active', 'unsubscribed') DEFAULT 'active',
            source VARCHAR(100) DEFAULT 'Website Footer',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    const createNewslettersTable = `
        CREATE TABLE IF NOT EXISTS newsletters (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subject VARCHAR(255) NOT NULL,
            content_html TEXT,
            status ENUM('draft', 'scheduled', 'sent') DEFAULT 'draft',
            sent_at TIMESTAMP NULL,
            scheduled_for TIMESTAMP NULL,
            recipient_count INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    const seedSubscribers = `
        INSERT IGNORE INTO subscribers (name, email, status)
        VALUES 
        ('Alice W.', 'alice@example.com', 'active'),
        ('Bob M.', 'bob@corp.com', 'active'),
        ('Charlie D.', 'charlie@startup.io', 'unsubscribed')
    `;

    try {
        await connection.query(createSubscribersTable);
        await connection.query(createNewslettersTable);
        await connection.query(seedSubscribers);
        console.log('Newsletter tables created and seeded');
    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

migrate();
