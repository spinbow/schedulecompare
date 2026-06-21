export * from './auth';
export * from './courses';
export * from './registrations';

import { defineRelations } from 'drizzle-orm';
import { account, authRelations, session, user, verification } from './auth';
import { courseRelations, coursesTable, sectionsTable } from './courses';
import { courseRegRelations, courseRegTable } from './registrations';

const baseRelations = defineRelations({
  account,
  courseRegTable,
  coursesTable,
  sectionsTable,
  session,
  user,
  verification,
});

export const relations = {
  ...baseRelations,
  ...authRelations,
  ...courseRelations,
  ...courseRegRelations,
};
