export * from './auth';
export * from './courses';
export * from './registrations';

import { defineRelations } from 'drizzle-orm';
import { authRelations } from './auth';
import { courseRelations } from './courses';
import { courseRegRelations } from './registrations';

const baseRelations = defineRelations({}); // drizzle needs a base relation
export const relations = {
  ...baseRelations,
  ...authRelations,
  ...courseRelations,
  ...courseRegRelations,
};
