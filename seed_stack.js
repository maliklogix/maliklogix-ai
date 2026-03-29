import 'dotenv/config';
import mysql from 'mysql2/promise';
import crypto from 'crypto';

const pool = mysql.createPool({
    uri: process.env.DB_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const companies = [
    {
        name: 'Hostinger',
        description: 'Premium Web Hosting tailored for large scale automation and speed.',
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Hostinger_logo.svg/2560px-Hostinger_logo.svg.png',
        affiliate_url: 'https://hostinger.com?REFERRAL=MALIKLOGIX'
    },
    {
        name: 'Namecheap',
        description: 'Affordable domain names, hosting, and SSL certificates.',
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Namecheap_logo.svg/2560px-Namecheap_logo.svg.png',
        affiliate_url: 'https://namecheap.com?aff=MALIKLOGIX'
    },
    {
        name: 'SEMrush',
        description: 'Elite SEO and content marketing toolkit for scaling organic growth.',
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Semrush_logo.svg/2560px-Semrush_logo.svg.png',
        affiliate_url: 'https://semrush.com?ref=MALIKLOGIX'
    },
    {
        name: 'GoHighLevel',
        description: 'The ultimate agency CRM toolkit to manage leads and automate workflows.',
        logo_url: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_9e31ff738ab7feab21dbea8d7dd012a6/gohighlevel.png',
        affiliate_url: 'https://gohighlevel.com?afmc=MALIKLOGIX'
    },
    {
        name: 'HostGator',
        description: 'Reliable and affordable shared, VPS, and dedicated web hosting.',
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/HostGator_Logo.svg/2560px-HostGator_Logo.svg.png',
        affiliate_url: 'https://hostgator.com?aff=MALIKLOGIX'
    }
];

const main = async () => {
    try {
        console.log('Initializing tables...');
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

        console.log('Clearing existing stack data...');
        await pool.query('DELETE FROM stack_coupons');
        await pool.query('DELETE FROM stack_companies');

        console.log('Inserting actual test data...');
        for (const comp of companies) {
            const id = crypto.randomUUID();
            await pool.query(
                "INSERT INTO stack_companies (id, name, description, logo_url, affiliate_url, status) VALUES (?, ?, ?, ?, ?, ?)",
                [id, comp.name, comp.description, comp.logo_url, comp.affiliate_url, 'active']
            );

            // Insert 2 deals & 1 coupon per company
            await pool.query(
                "INSERT INTO stack_coupons (company_id, title, description, type, code, affiliate_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [id, 'Save up to 75% on Annual Plans', 'Get incredible discounts on premium hosting tiers globally.', 'deal', '', comp.affiliate_url, 'active']
            );
            await pool.query(
                "INSERT INTO stack_coupons (company_id, title, description, type, code, affiliate_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [id, 'Free Domain & SSL for 1st Year', 'Claim your brand name with a free domain inclusion.', 'deal', '', comp.affiliate_url, 'active']
            );
            await pool.query(
                "INSERT INTO stack_coupons (company_id, title, description, type, code, affiliate_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [id, 'Extra 10% Off Sitewide', 'Stack this code with existing sales for maximum savings.', 'coupon', 'MALIK10', comp.affiliate_url, 'active']
            );
        }

        console.log('Seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding:', err);
        process.exit(1);
    }
};

main();
