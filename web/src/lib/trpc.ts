import type { AppRouter } from '@schedulecompare/api';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

const trpcUrl = new URL('trpc', import.meta.env.VITE_API_URL);

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: trpcUrl.toString(),
      fetch: (url, options) =>
        fetch(url, {
          ...options,
          credentials: 'include',
        }),
    }),
  ],
});
