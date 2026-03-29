import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
    try {
        const srcDir = path.join(__dirname, 'src', 'pages', 'stack', 'partnerlogo');
        const destDir = path.join(__dirname, 'public', 'partnerlogo');

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        const files = fs.readdirSync(srcDir);
        for (const file of files) {
            fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
        }
        console.log('Copied ' + files.length + ' logos to public/partnerlogo');

        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).replace('.webp','').replace('.com', '').replace('-', ' ');

        const pool = mysql.createPool(process.env.DB_URL);
        await pool.query('DELETE FROM stack_coupons');
        await pool.query('DELETE FROM stack_companies');
        
        for (const file of files) {
            if (!file.endsWith('.webp')) continue;
            // E.g., fastcomet.webp -> Fastcomet
            let name = file.replace('.webp','').replace('.com','').replace(/-/g, ' ');
            name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

            const id = crypto.randomUUID();
            const logo_url = '/partnerlogo/' + file;
            
            await pool.query(
                `INSERT INTO stack_companies (id, name, description, logo_url, affiliate_url, status) VALUES (?, ?, ?, ?, ?, ?)`,
                [id, name, `Premium hosting solutions and high-performance servers from ${name}.`, logo_url, `https://${file.replace('.webp','')}.com?ref=MALIKLOGIX`, 'active']
            );
            
            await pool.query(
                `INSERT INTO stack_coupons (company_id, title, description, type, code, affiliate_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [id, 'Save up to 60% on Annual Plans', 'Get massive discounts on premium hosting plans when you pay annually.', 'deal', '', '', 'active']
            );
            await pool.query(
                `INSERT INTO stack_coupons (company_id, title, description, type, code, affiliate_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [id, 'Extra 20% Off Sitewide', 'Stack this code at checkout to maximize your savings.', 'coupon', 'SAVE20', '', 'active']
            );
        }
        console.log('Seeded ' + files.length + ' companies to the database successfully!');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

main();
