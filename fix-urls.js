import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(directoryPath, function(filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Handle single quote strings: 'http://localhost:3001/api/...'
        const singleQuoteRegex = /'http:\/\/localhost:3001(\/api\/[^']*)'/g;
        if (singleQuoteRegex.test(content)) {
            content = content.replace(singleQuoteRegex, '`${import.meta.env.VITE_API_URL || ""}$1`');
            modified = true;
        }

        // Handle template literals: `http://localhost:3001/api/...`
        const templateLiteralRegex = /`http:\/\/localhost:3001(\/api\/[^`]*)`/g;
        if (templateLiteralRegex.test(content)) {
            content = content.replace(templateLiteralRegex, '`${import.meta.env.VITE_API_URL || ""}$1`');
            modified = true;
        }
        
        // Handle double quote strings just in case
        const doubleQuoteRegex = /"http:\/\/localhost:3001(\/api\/[^"]*)"/g;
        if (doubleQuoteRegex.test(content)) {
            content = content.replace(doubleQuoteRegex, '`${import.meta.env.VITE_API_URL || ""}$1`');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
