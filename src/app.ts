/**
 * BlackRoad OS Beacon - Hono app (exported for testing)
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { collectAllBeacons, collectServiceBeacon } from './lib/sigBeacon.js';
import { getServices } from './lib/servicesRegistry.js';
import { appendDeployRecord, queryDeployHistory } from './lib/sigDeployLog.js';
import { landingHtml, statusHtml } from './ui.js';

export const createApp = (): Hono => {
  const app = new Hono();

  app.use('*', cors());

  // ── JSON API ───────────────────────────────────────────────────────────────

  app.get('/health', (c) => {
    return c.json({
      ok: true,
      service: 'blackroad-os-beacon',
      version: '1.0.0',
      env: process.env.NODE_ENV || 'production',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/version', (c) => {
    return c.json({
      service: 'blackroad-os-beacon',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
    });
  });

  app.get('/services', (c) => {
    try {
      const services = getServices();
      return c.json({ ok: true, services });
    } catch (error) {
      return c.json({ ok: false, error: (error as Error).message }, 500);
    }
  });

  app.get('/beacon', async (c) => {
    try {
      const services = await collectAllBeacons();
      return c.json({ ok: true, services });
    } catch (error) {
      return c.json({ ok: false, error: (error as Error).message }, 500);
    }
  });

  app.get('/beacon/:serviceId', async (c) => {
    const serviceId = c.req.param('serviceId');
    try {
      const allServices = getServices();
      const svc = allServices.find((s) => s.id === serviceId);
      if (!svc) return c.json({ ok: false, error: 'Service not found' }, 404);
      const beacon = await collectServiceBeacon(svc);
      return c.json({ ok: true, beacon });
    } catch (error) {
      return c.json({ ok: false, error: (error as Error).message }, 500);
    }
  });

  app.get('/deploys', (c) => {
    const { service, env, limit } = c.req.query();
    try {
      const parsedLimit = limit ? parseInt(limit, 10) : undefined;
      const history = queryDeployHistory({
        service: service || undefined,
        env: env || undefined,
        limit: parsedLimit && !Number.isNaN(parsedLimit) ? parsedLimit : undefined,
      });
      return c.json({ ok: true, deploys: history });
    } catch (error) {
      return c.json({ ok: false, error: (error as Error).message }, 500);
    }
  });

  app.post('/deploys', async (c) => {
    try {
      const body = await c.req.json();
      appendDeployRecord(body);
      return c.json({ ok: true });
    } catch (error) {
      return c.json({ ok: false, error: (error as Error).message }, 400);
    }
  });

  // ── Visual Pages ───────────────────────────────────────────────────────────

  app.get('/status', (c) => c.html(statusHtml));
  app.get('/', (c) => c.html(landingHtml));

  return app;
};
