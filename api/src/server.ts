import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './app-router';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'content-type,authorization,trpc-accept',
  Vary: 'Origin',
};

const server = createHTTPServer({
  router: appRouter,
  middleware(req, res, next) {
    for (const [key, value] of Object.entries(corsHeaders)) {
      res.setHeader(key, value);
    }

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    next();
  },
});

server.listen(3000);
console.log('API server running on port 3000');
