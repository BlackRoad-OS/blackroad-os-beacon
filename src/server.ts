/**
 * BlackRoad OS Beacon Service - entry point
 */

import { serve } from '@hono/node-server';
import { createApp } from './app.js';

const app = createApp();
const port = parseInt(process.env.PORT || '8000', 10);

console.log('🖤 BlackRoad OS Beacon Service');
console.log(`   Running on http://localhost:${port}`);
console.log(`   Dashboard:    GET /`);
console.log(`   Status page:  GET /status`);
console.log(`   Health check: GET /health\n`);

serve({ fetch: app.fetch, port });
