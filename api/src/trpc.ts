import { auth } from '@schedulecompare/db';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

export const createTRPCContext = (opts: { headers: Headers }) => {
  return {
    headers: opts.headers,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson, // use superjson to preserve Date, Map, Set, etc.
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

// use this to enforce user is authenticated
export const authedProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  const session = await auth.api.getSession({
    headers: ctx.headers,
  });

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      session,
    },
  });
});
