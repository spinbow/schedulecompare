import { auth, coursesTable, db } from '@schedulecompare/db';
import { ilike, or } from 'drizzle-orm';
import { publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import z from 'zod';

async function searchCourses(query: string) {
  const pattern = `%${query}%`;

  return await db
    .select()
    .from(coursesTable)
    .where(or(ilike(coursesTable.code, pattern)))
    .limit(10);
}

export const searchCoursesProcedure = publicProcedure
  .input(
    z.object({
      query: z.string().trim().min(1).max(100),
    }),
  )
  .query(async ({ ctx, input }) => {
    const session = await auth.api.getSession({
      headers: ctx.headers,
    });

    if (!session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return searchCourses(input.query);
  });
