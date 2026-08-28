import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = fileURLToPath(new URL('..', import.meta.url));
const statePath = join(workspaceRoot, 'DSA-Mastery', '20-Revision', 'revision-state.json');
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

const readState = async () => JSON.parse(await readFile(statePath, 'utf8'));
const sendJson = (response, statusCode, body) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  try {
    if (url.pathname === '/api/revisions' && request.method === 'GET') {
      return sendJson(response, 200, await readState());
    }

    if (url.pathname === '/api/revisions' && request.method === 'PUT') {
      let body = '';
      for await (const chunk of request) body += chunk;
      const state = JSON.parse(body);
      if (!Array.isArray(state.reviews) || !state.settings) {
        return sendJson(response, 400, { error: 'Invalid revision state.' });
      }
      await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
      return sendJson(response, 200, state);
    }

    const requestedPath = url.pathname === '/' ? '/revision-dashboard/index.html' : url.pathname;
    const relativePath = normalize(requestedPath).replace(/^[/\\]+/, '');
    const filePath = join(workspaceRoot, relativePath);
    if (!filePath.startsWith(workspaceRoot)) return sendJson(response, 403, { error: 'Forbidden' });

    const content = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream' });
    response.end(content);
  } catch (error) {
    if (error.code === 'ENOENT') return sendJson(response, 404, { error: 'Not found' });
    console.error(error);
    return sendJson(response, 500, { error: 'Server error' });
  }
});

server.listen(port, () => {
  console.log(`Revision dashboard: http://localhost:${port}`);
});