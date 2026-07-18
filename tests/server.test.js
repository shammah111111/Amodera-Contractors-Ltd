import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { app } from '../server.js';

let server;

async function getServer() {
  if (!server) {
    server = await new Promise((resolve) => {
      const instance = app.listen(0, () => resolve(instance));
    });
  }
  return server;
}

async function request(path, options = {}) {
  const instance = await getServer();
  const { port } = instance.address();

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path,
        method: options.method || 'GET',
        headers: options.headers || {}
      },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body });
        });
      }
    );

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

test('health endpoint responds successfully', async () => {
  const response = await request('/api/health');
  assert.equal(response.statusCode, 200);
  assert.match(response.body, /Server is running/);
});

test('contact endpoint validates required fields', async () => {
  const response = await request('/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Ada' })
  });

  assert.equal(response.statusCode, 400);
  assert.match(response.body, /Missing required fields/i);
});

test.after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
