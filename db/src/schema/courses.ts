import { boolean, char, pgTable, text, time, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-orm/zod';
import { defineRelations } from 'drizzle-orm';
import { string, z } from 'zod';

export const DayOfTheWeekSchema = z.literal(['m', 't', 'w', 'th', 'f']);
export const SessionSchema = z.literal(['s', 'w']);
export const TermSchema = z.literal(['1', '2', null]);

export type DayOfTheWeek = z.infer<typeof DayOfTheWeekSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Term = z.infer<typeof TermSchema>;

export const coursesTable = pgTable('courses', {
  id: uuid().primaryKey(), // uuid from API
  code: varchar({ length: 16 }).unique().notNull(),
  title: text().notNull(),
});

export const sectionsTable = pgTable('sections', {
  id: uuid().primaryKey(), // uuid from API
  courseId: uuid('course_id')
    .notNull()
    .references(() => coursesTable.id, { onDelete: 'cascade' }),

  code: varchar({ length: 8 }).notNull(),
  year: char({ length: 4 }).notNull(), // e.g. 2025
  session: char({ length: 1 }).notNull(),
  term: char({ length: 1 }),

  startTime: time('start_time'),
  endTime: time('end_time'),

  monday: boolean().notNull().default(false),
  tuesday: boolean().notNull().default(false),
  wednesday: boolean().notNull().default(false),
  thursday: boolean().notNull().default(false),
  friday: boolean().notNull().default(false),
});

export const relations = defineRelations({ coursesTable, sectionsTable }, (r) => ({
  sectionsTable: {
    course: r.one.coursesTable({
      from: r.sectionsTable.courseId,
      to: r.coursesTable.id,
    }),
  },
}));

export const selectCourseSchema = createSelectSchema(coursesTable).extend({
  id: z.uuidv4(),
});
export const selectSectionSchema = createSelectSchema(sectionsTable).extend({
  id: z.uuidv4(),
  courseId: z.uuidv4(),
  year: string().length(4),
  session: SessionSchema,
  term: TermSchema,
});

export type Course = z.infer<typeof selectCourseSchema>;
export type Section = z.infer<typeof selectSectionSchema>;
