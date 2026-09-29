const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // Route root and specific pages
  if (reqPath === '/' || reqPath === '/home') {
    reqPath = '/home.html';
  } else if (reqPath === '/work') {
    reqPath = '/index.html';
  } else if (reqPath.startsWith('/films/')) {
    const slug = reqPath.replace('/films/', '');
    // Check if films/{slug}.html exists
    const directFilmPath = path.join(PUBLIC_DIR, 'films', slug + '.html');
    if (fs.existsSync(directFilmPath)) {
      reqPath = '/films/' + slug + '.html';
    } else if (fs.existsSync(path.join(PUBLIC_DIR, 'films', slug))) {
      reqPath = '/films/' + slug;
    } else {
      // Fallback for my-project-x or unknown film
      reqPath = '/films/my-project-x.html';
    }
  }

  let filePath = path.join(PUBLIC_DIR, reqPath);

  // If path doesn't have an extension and .html exists, append .html
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  // Security check: ensure filePath is inside PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA Fallback: if not found and HTML request, serve home.html or index.html
      if (req.headers.accept && req.headers.accept.includes('text/html')) {
        const fallbackPath = path.join(PUBLIC_DIR, reqPath.startsWith('/films') ? 'films/my-project-x.html' : 'home.html');
        if (fs.existsSync(fallbackPath)) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(fallbackPath).pipe(res);
          return;
        }
      }
      res.writeHead(404);
      res.end('Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Handle HTTP Range Requests for video/audio streaming
    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mp3')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = end - start + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`1:1 Siena Clone Server running at http://127.0.0.1:${PORT}/`);
  console.log(`- Home page: http://127.0.0.1:${PORT}/`);
  console.log(`- Work page: http://127.0.0.1:${PORT}/work`);
  console.log(`- Case page: http://127.0.0.1:${PORT}/films/my-project-x`);
});
