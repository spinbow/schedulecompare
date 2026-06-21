import { courseRegTable, db, sectionWithCourseSchema } from '@schedulecompare/db';
import crypto from 'crypto';
import { authedProcedure } from '../trpc';
import { and, eq } from 'drizzle-orm';
import z, { uuidv4 } from 'zod';

// async function getRegistrations(userId: string) {
//   return await db.select().from(courseRegTable).where(eq(courseRegTable.userId, userId));
// }

async function getRegisteredSections(userId: string) {
  const registrations = await db.query.courseRegTable.findMany({
    where: {
      userId,
    },
    columns: {}, // don't return registration fields
    with: {
      section: {
        with: {
          course: true,
        },
      },
    },
  });

  const map = registrations.map((registration) => registration.section);
  return z.array(sectionWithCourseSchema).parse(map);
}
export const getRegisteredSectionsProcedure = authedProcedure.query(async ({ ctx }) => {
  return getRegisteredSections(ctx.session.user.id);
});

async function registerSection(userId: string, sectionId: string) {
  await db.insert(courseRegTable).values({ id: crypto.randomUUID(), userId, sectionId });
}
export const registerSectionProcedure = authedProcedure
  .input(
    z.object({
      id: uuidv4(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    registerSection(ctx.session.user.id, input.id);
  });

async function unregisterSection(userId: string, sectionId: string) {
  await db
    .delete(courseRegTable)
    .where(and(eq(courseRegTable.userId, userId), eq(courseRegTable.sectionId, sectionId)));
}
export const unregisterSectionProcedure = authedProcedure
  .input(
    z.object({
      id: uuidv4(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    unregisterSection(ctx.session.user.id, input.id);
  });
