import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { handleContactRequest } from './server/contact-api.mjs';

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';
const root = resolve('dist');
const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ttf': 'font/ttf' };

createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (request.method === 'POST' && url.pathname === '/api/contact') return handleContactRequest(request, response);
  if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405); return response.end(); }
  if (url.pathname === '/') { response.writeHead(302, { Location: '/web/' }); return response.end(); }

  const requested = normalize(url.pathname.replace(/^\/web\/?/, '')) || 'index.html';
  let filePath = join(root, requested);
  if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) filePath = join(root, 'index.html');
  response.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' });
  if (request.method === 'HEAD') return response.end();
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => console.log(`Portfolio server running at http://127.0.0.1:${port}/web/`));
