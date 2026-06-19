import { publicProcedure, router } from './trpc';

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = [{ id: '1', name: 'Katt' }];
    return users;
  }),
});

export type AppRouter = typeof appRouter;
