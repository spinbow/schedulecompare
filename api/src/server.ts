import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './app-router';
import cors from 'cors';

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

server.listen(3000);
console.log('API server running on port 3000');
