const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3006;
const DIST = path.join(__dirname, 'dist');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.webm': 'video/webm',
    '.mp4': 'video/mp4',
};

const server = http.createServer((req, res) => {
    let filePath = path.join(DIST, req.url === '/' ? 'index.html' : req.url);

    // Remove query string
    filePath = filePath.split('?')[0];

    const ext = path.extname(filePath).toLowerCase();

    // If no extension, try as directory with index.html
    if (!ext) {
        filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Fallback to index.html for SPA
            fs.readFile(path.join(DIST, 'index.html'), (err2, fallback) => {
                if (err2) {
                    res.writeHead(404);
                    res.end('Not Found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(fallback);
            });
            return;
        }

        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
