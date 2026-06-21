import { auth, courseRegTable, db, sectionWithCourseSchema } from '@schedulecompare/db';
import crypto from 'crypto';
import { publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
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

  console.log(registrations);
  const map = registrations.map((registration) => registration.section);
  return z.array(sectionWithCourseSchema).parse(map);
}

export const getRegisteredSectionsProcedure = publicProcedure.query(async ({ ctx }) => {
  const session = await auth.api.getSession({
    headers: ctx.headers,
  });

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return getRegisteredSections(session.user.id);
});

async function registerSection(userId: string, sectionId: string) {
  await db.insert(courseRegTable).values({ id: crypto.randomUUID(), userId, sectionId });
}

export const registerSectionProcedure = publicProcedure
  .input(
    z.object({
      id: uuidv4(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const session = await auth.api.getSession({
      headers: ctx.headers,
    });

    if (!session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    registerSection(session.user.id, input.id);
  });

async function unregisterSection(userId: string, sectionId: string) {
  await db
    .delete(courseRegTable)
    .where(and(eq(courseRegTable.userId, userId), eq(courseRegTable.sectionId, sectionId)));
}

export const unregisterSectionProcedure = publicProcedure
  .input(
    z.object({
      id: uuidv4(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const session = await auth.api.getSession({
      headers: ctx.headers,
    });

    if (!session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    unregisterSection(session.user.id, input.id);
  });
