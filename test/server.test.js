'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');

const app = require('../index');

let server;
let baseUrl;

before(() => {
  server = app.listen(0);
  const { port } = server.address();
  baseUrl = `http://localhost:${port}`;
});

after(() => server.close());

// ---------------------------------------------------------------------------
// GET /
// ---------------------------------------------------------------------------
describe('GET /', () => {
  it('returns HTTP 200', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
  });

  it('returns Content-Type application/json', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.match(res.headers.get('content-type'), /application\/json/);
  });

  it('response body has required fields', async () => {
    const res = await fetch(`${baseUrl}/`);
    const data = await res.json();

    assert.equal(typeof data, 'object');
    assert.ok('project' in data,  'missing field: project');
    assert.ok('status'  in data,  'missing field: status');
    assert.ok('contract' in data, 'missing field: contract');
  });

  it('project is cerebro-agent-network', async () => {
    const res = await fetch(`${baseUrl}/`);
    const { project } = await res.json();
    assert.equal(project, 'cerebro-agent-network');
  });

  it('status is Streaming Education', async () => {
    const res = await fetch(`${baseUrl}/`);
    const { status } = await res.json();
    assert.equal(status, 'Streaming Education');
  });

  it('contract is a non-empty string', async () => {
    const res = await fetch(`${baseUrl}/`);
    const { contract } = await res.json();
    assert.equal(typeof contract, 'string');
    assert.ok(contract.length > 0, 'contract should not be empty');
  });

  it('contract matches default Stellar address when CONTRACT_ID is unset', async () => {
    // Only assert the default when the env var is not overridden in this run
    if (!process.env.CONTRACT_ID) {
      const res = await fetch(`${baseUrl}/`);
      const { contract } = await res.json();
      assert.equal(contract, 'CB7OZPTIUENDWJWNHRGDPZLIEIS6TXMFRYT4WCGHIZVYLCTXEONC6VHY');
    }
  });

  it('returns the same response on repeated calls (idempotent)', async () => {
    const [r1, r2] = await Promise.all([
      fetch(`${baseUrl}/`).then(r => r.json()),
      fetch(`${baseUrl}/`).then(r => r.json()),
    ]);
    assert.deepEqual(r1, r2);
  });
});

// ---------------------------------------------------------------------------
// Unknown routes
// ---------------------------------------------------------------------------
describe('unknown routes', () => {
  it('GET /unknown returns 404', async () => {
    const res = await fetch(`${baseUrl}/unknown`);
    assert.equal(res.status, 404);
  });

  it('POST / returns 404', async () => {
    const res = await fetch(`${baseUrl}/`, { method: 'POST' });
    assert.equal(res.status, 404);
  });
});
