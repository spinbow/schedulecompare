import { db, sectionsTable, Session } from '@schedulecompare/db';
import { and, asc, eq } from 'drizzle-orm';

export async function getSections(courseId: string, year: string, session: Session) {
  return await db
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
}
