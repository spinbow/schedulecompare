export * from './auth';
export * from './courses';
export * from './friends';
export * from './registrations';

import { defineRelations } from 'drizzle-orm';
import { account, authRelationsConfig, session, user, verification } from './auth';
import { courseRelationsConfig, coursesTable, sectionsTable } from './courses';
import { courseRegRelationsConfig, courseRegTable } from './registrations';
import { friendRelationsConfig, friendsTable } from './friends';
import { mergeRelationConfigs } from '../lib/merge-relation-configs';

const allTables = {
  account,
  courseRegTable,
  coursesTable,
  friendsTable,
  sectionsTable,
  session,
  user,
  verification,
};
export type AllTables = typeof allTables;

// to have scoped relations, we need a special function to merge the relation configs
// since object spreading only gets us shallow merges.
export const relations = defineRelations(allTables, (r) => {
  return mergeRelationConfigs(
    authRelationsConfig(r),
    courseRelationsConfig(r),
    courseRegRelationsConfig(r),
    friendRelationsConfig(r),
  );
});
