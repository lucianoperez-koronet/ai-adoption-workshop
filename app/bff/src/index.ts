import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import search from './routes/search.js';
import { log } from './lib/logger.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: ['http://localhost:5175', 'http://127.0.0.1:5175'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
  })
);

app.route('/api/search', search);

app.get('/health', (c) => c.json({ ok: true }));

const port = Number(process.env.PORT) || 3001;
const llmProvider = process.env.LLM_PROVIDER ?? 'not set';
log.info('bff', 'Starting BFF server', {
  port,
  llmProvider,
  env: process.env.NODE_ENV ?? 'development',
});
serve({ fetch: app.fetch, port });
console.log(`BFF listening on http://localhost:${port} (LLM_PROVIDER=${llmProvider})`);
