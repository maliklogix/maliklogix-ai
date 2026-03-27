import mysql from 'mysql2/promise';

const DB_URL = 'mysql://u373901266_maliklogix:Maliklog786555@srv1562.hstgr.io:3306/u373901266_maliklogix';

async function migrate() {
    const connection = await mysql.createConnection(DB_URL);
    console.log('Connected for leads migration');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS leads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            country VARCHAR(100),
            service VARCHAR(100),
            message TEXT,
            source VARCHAR(100) DEFAULT 'Contact Form',
            status ENUM('new', 'contacted', 'qualified', 'closed') DEFAULT 'new',
            priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
            assigned_to VARCHAR(100) DEFAULT 'Malik Farooq',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    const seedQuery = `
        INSERT INTO leads (name, email, country, service, message, status, priority)
        VALUES 
        ('Sarah K.', 'sarah@dtcbrand.com', 'USA', 'AI Marketing', 'I need help with AI marketing for my Shopify store', 'new', 'high'),
        ('James R.', 'james@saas.io', 'UK', 'Automation', 'Looking for n8n automation for our onboarding flow', 'contacted', 'medium'),
        ('Michael B.', 'm.brown@techcorp.de', 'Germany', 'SEO & Content', 'Interested in your GEO search optimization service.', 'new', 'medium')
        ON DUPLICATE KEY UPDATE name=name;
    `;

    try {
        await connection.query(createTableQuery);
        console.log('Leads table created');
        await connection.query(seedQuery);
        console.log('Sample leads seeded');
    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

migrate();
