import {
  auth,
  courseRegTable,
  db,
  selectCourseRegSchema,
  selectSectionSchema,
} from '@schedulecompare/db';
import crypto from 'crypto';
import { publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import z, { uuidv4 } from 'zod';

async function getRegistrations(userId: string) {
  return await db.select().from(courseRegTable).where(eq(courseRegTable.userId, userId));
}

export const getRegistrationsProcedure = publicProcedure.query(async ({ ctx }) => {
  const session = await auth.api.getSession({
    headers: ctx.headers,
  });

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return getRegistrations(session.user.id);
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
