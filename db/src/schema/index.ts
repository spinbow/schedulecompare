export * from './auth';
export * from './courses';
export * from './friends';
export * from './registrations';

import { defineRelations } from 'drizzle-orm';
import { account, authRelationsConfig, session, user, verification } from './auth';
import { courseRelationsConfig, coursesTable, sectionsTable } from './courses';
import { courseRegRelationsConfig, courseRegTable } from './registrations';
import { friendRelationsConfig, friendsTable } from './friends';
import deepmerge from 'deepmerge';
import { isPlainObject } from 'lodash-es';

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

// use deepmerge to define scoped relations, then combine them into a single config
export const relations = defineRelations(allTables, (r) => {
  const relationsArray = [
    authRelationsConfig(r),
    courseRelationsConfig(r),
    courseRegRelationsConfig(r),
    friendRelationsConfig(r),
  ];
  return deepmerge.all(relationsArray, {
    isMergeableObject: isPlainObject,
  });
});
