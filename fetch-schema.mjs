import fs from 'fs';
import mysql from 'mysql2/promise';

const DB_URL = 'mysql://u373901266_maliklogix:Maliklog786555@srv1562.hstgr.io:3306/u373901266_maliklogix?connection_limit=20';

async function run() {
    const connection = await mysql.createConnection(DB_URL);
    const [tables] = await connection.query('SHOW TABLES');
    const tableKey = Object.keys(tables[0])[0];
    const tableNames = tables.map(t => t[tableKey]);
    
    // Find the blog table
    const potentialNames = ['posts', 'blogs', 'blog_posts', 'articles', 'wp_posts'];
    const foundTable = tableNames.find(name => potentialNames.includes(name.toLowerCase())) || tableNames[0];
    
    const [columns] = await connection.query(`DESCRIBE \`${foundTable}\``);
    const [rows] = await connection.query(`SELECT * FROM \`${foundTable}\` LIMIT 1`);
    
    fs.writeFileSync('schema.json', JSON.stringify({
        tableName: foundTable,
        columns: columns,
        sampleRow: rows[0]
    }, null, 2));
    
    await connection.end();
}
run();
