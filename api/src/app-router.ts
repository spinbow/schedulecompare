import { publicProcedure, router } from './trpc';
import { type User } from '@schedulecompare/shared';

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users: User[] = [{ id: '1', name: 'Katt' }];
    return users;
  }),
});

export type AppRouter = typeof appRouter;
