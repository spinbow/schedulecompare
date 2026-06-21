import { db, sectionsTable, selectSectionSchema, SessionSchema } from '@schedulecompare/db';
import type { Session } from '@schedulecompare/db';
import { and, asc, eq } from 'drizzle-orm';
import { authedProcedure } from '../trpc';
import z from 'zod';

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
export const getSectionsProcedure = authedProcedure
  .input(
    z.object({
      courseId: z.uuidv4(),
      year: z.string().length(4),
      session: SessionSchema,
    }),
  )
  .query(async ({ input }) => {
    return getSections(input.courseId, input.year, input.session);
  });
