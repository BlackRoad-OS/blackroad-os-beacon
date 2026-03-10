import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { createApp } from '../src/app';
import { clearServicesCache } from '../src/lib/servicesRegistry';

// Mock native fetch used by sigBeacon
vi.stubGlobal('fetch', vi.fn());
const mockedFetch = fetch as unknown as ReturnType<typeof vi.fn>;

describe('HTTP routes (Hono)', () => {
  let configPath: string;
  let logPath: string;

  beforeEach(() => {
    const configDir = fs.mkdtempSync(path.join(os.tmpdir(), 'beacon-http-config-'));
    configPath = path.join(configDir, 'services.yaml');
    const yamlContent = `services:\n  - id: svc-http\n    name: Service HTTP\n    env: prod\n    health_url: http://svc-http/health\n    region: us-central\n`;
    fs.writeFileSync(configPath, yamlContent);
    process.env.BEACON_SERVICES_CONFIG_PATH = configPath;
    clearServicesCache();

    const logDir = fs.mkdtempSync(path.join(os.tmpdir(), 'deploy-http-'));
    logPath = path.join(logDir, 'deploy-log.jsonl');
    process.env.DEPLOY_LOG_PATH = logPath;
  });

  it('responds to /health', async () => {
    const app = createApp();
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.service).toBe('blackroad-os-beacon');
    expect(body.ok).toBe(true);
  });

  it('returns beacon data', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true, version: '9.9.9' }),
    });
    const app = createApp();
    const res = await app.request('/beacon');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.services[0].status).toBe('healthy');
  });

  it('accepts deploy POST and returns in query', async () => {
    const app = createApp();
    const payload = {
      service: 'svc-http',
      env: 'prod',
      git_sha: 'sha',
      actor: 'tester',
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      outcome: 'success',
      links: ['https://example.com/pr/1'],
    };

    const postRes = await app.request('/deploys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    expect(postRes.status).toBe(200);

    const getRes = await app.request('/deploys?service=svc-http&limit=1');
    expect(getRes.status).toBe(200);
    const body = await getRes.json();
    expect(body.deploys).toHaveLength(1);
    expect(body.deploys[0].service).toBe('svc-http');
  });

  it('serves HTML at /', async () => {
    const app = createApp();
    const res = await app.request('/');
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');
    const text = await res.text();
    expect(text).toContain('BlackRoad OS Beacon');
    expect(text).toContain('blackroad.io');
  });

  it('serves HTML at /status', async () => {
    const app = createApp();
    const res = await app.request('/status');
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');
    const text = await res.text();
    expect(text).toContain('System Status');
  });
});
