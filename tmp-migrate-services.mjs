import mysql from 'mysql2/promise';

const DB_URL = 'mysql://u373901266_maliklogix:Maliklog786555@srv1562.hstgr.io:3306/u373901266_maliklogix';

async function migrate() {
    const connection = await mysql.createConnection(DB_URL);
    console.log('Connected to database');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS services (
            slug VARCHAR(100) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            subtitle VARCHAR(255),
            group_name VARCHAR(100),
            status ENUM('published', 'draft') DEFAULT 'published',
            hero_description TEXT,
            cta_primary VARCHAR(100),
            cta_secondary VARCHAR(100),
            benefits JSON,
            steps JSON,
            stats JSON,
            meta_title VARCHAR(255),
            meta_desc TEXT,
            og_image VARCHAR(255),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    try {
        await connection.query(createTableQuery);
        console.log('Services table created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        await connection.end();
    }
}

migrate();
