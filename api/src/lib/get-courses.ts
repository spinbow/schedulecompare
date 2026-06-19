import { coursesTable, db } from '@schedulecompare/db';
import { ilike, or } from 'drizzle-orm';

export async function searchCourses(query: string) {
  const pattern = `%${query}%`;

  return await db
    .select()
    .from(coursesTable)
    .where(or(ilike(coursesTable.code, pattern), ilike(coursesTable.title, pattern)))
    .limit(10);
}
