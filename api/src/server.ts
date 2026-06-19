import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { trpcServer } from '@hono/trpc-server';
import process from 'node:process';
import { appRouter } from './app-router';
import { cors } from 'hono/cors';
import { auth } from '@schedulecompare/db';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: process.env.BETTER_AUTH_URL,
    credentials: true,
  }),
);
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});
app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

const server = serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
