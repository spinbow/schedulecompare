import { char, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { sectionsTable } from './courses';
import z from 'zod';
import { createSelectSchema } from 'drizzle-orm/zod';
import { defineRelations } from 'drizzle-orm';

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

export const courseRegRelations = defineRelations({ courseRegTable, sectionsTable }, (r) => ({
  courseRegTable: {
    section: r.one.sectionsTable({
      from: r.courseRegTable.sectionId,
      to: r.sectionsTable.id,
    }),
  },
}));

export const selectCourseRegSchema = createSelectSchema(courseRegTable);

export type CourseRegistration = z.infer<typeof selectCourseRegSchema>;
