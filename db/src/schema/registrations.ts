import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { sectionsTable } from './courses';
import z from 'zod';
import { createSelectSchema } from 'drizzle-orm/zod';
import { RelationsBuilder } from 'drizzle-orm';
import type { AllTables } from '.';

export const courseRegTable = pgTable('course_reg', {
  id: uuid('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  sectionId: uuid('section_id')
    .notNull()
    .references(() => sectionsTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const courseRegRelationsConfig = (r: RelationsBuilder<AllTables>) => ({
  courseRegTable: {
    section: r.one.sectionsTable({
      from: r.courseRegTable.sectionId,
      to: r.sectionsTable.id,
      optional: false,
    }),
  },
});

export const selectCourseRegSchema = createSelectSchema(courseRegTable);

export type CourseRegistration = z.infer<typeof selectCourseRegSchema>;
