import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { apiFetch, apiFetchJson } from '../../src/lib/api';

const nativeFetch = globalThis.fetch;
let requests = 0;
globalThis.fetch = async () => { requests++; throw new Error('Demo attempted a real request'); };
after(() => { globalThis.fetch = nativeFetch; assert.equal(requests, 0); });

test('mock responses support standard JSON, status, and blob callers', async () => {
  const response = await apiFetch('/clients/');
  assert(response instanceof Response);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert(data.clients.length > 0);
  data.clients[0].name = 'Changed caller copy';
  assert.notEqual((await (await apiFetch('/clients/')).json()).clients[0].name, 'Changed caller copy');
  const missing = await apiFetch('/clients/999999');
  assert.equal(missing.status, 404);
  assert.equal(missing.ok, false);
  await assert.rejects(apiFetchJson('/clients/999999'), /HTTP 404/);
  const download = await apiFetch('/storage/download/1');
  assert.equal(await (await download.blob()).text(), 'Demo file content');
});

test('password operations and writes remain simulations without network or persistence', async () => {
  const before = await apiFetchJson('/clients/');
  for (const path of ['/api/forgot-password', '/api/reset-password', '/api/change-password']) {
    const result = await apiFetchJson(path, { method: 'POST', body: JSON.stringify({ email: 'fictional@example.invalid', password: 'Fictional!12345' }) });
    assert.match(result.message, /Demo mode:.*simulated/);
  }
  const created = await apiFetchJson('/clients/', { method: 'POST', body: JSON.stringify({ name: 'Fictional upgrade test' }) });
  assert.match(created.message, /simulated/);
  assert.deepEqual(await apiFetchJson('/clients/'), before);
  assert(Array.isArray(await apiFetchJson('/api/users/')));
  const accounts = await apiFetchJson('/accounts/');
  assert(accounts.length > 0);
  assert(accounts.every((account: { client_name?: string }) => account.client_name));
});
