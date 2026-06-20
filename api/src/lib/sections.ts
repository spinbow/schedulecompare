import {
  auth,
  db,
  sectionsTable,
  selectSectionSchema,
  Session,
  SessionSchema,
} from '@schedulecompare/db';
import { and, asc, eq } from 'drizzle-orm';
import { publicProcedure } from '../trpc';
import z from 'zod';
import { TRPCError } from '@trpc/server';

async function getSections(courseId: string, year: string, session: Session) {
  const result = await db
    .select()
    .from(sectionsTable)
    .where(
      and(
        eq(sectionsTable.courseId, courseId),
        eq(sectionsTable.year, year),
        eq(sectionsTable.session, session),
      ),
    )
    .orderBy(asc(sectionsTable.code));

  return z.array(selectSectionSchema).parse(result);
}

export const getSectionsProcedure = publicProcedure
  .input(
    z.object({
      courseId: z.uuidv4(),
      year: z.string().length(4),
      session: SessionSchema,
    }),
  )
  .query(async ({ ctx, input }) => {
    const session = await auth.api.getSession({
      headers: ctx.headers,
    });

    if (!session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return getSections(input.courseId, input.year, input.session);
  });
