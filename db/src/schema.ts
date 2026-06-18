import { boolean, char, pgTable, time, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-orm/zod';
import { defineRelations } from 'drizzle-orm';
import { z } from 'zod';

export const DayOfTheWeekSchema = z.literal(['m', 't', 'w', 'th', 'f']);
export const SessionSchema = z.literal(['s', 'w']);
export const TermSchema = z.literal(['1', '2', null]);

export type DayOfTheWeek = z.infer<typeof DayOfTheWeekSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Term = z.infer<typeof TermSchema>;

export const coursesTable = pgTable('courses', {
  id: char({ length: 36 }).primaryKey(), // uuid from API
  code: varchar({ length: 63 }).unique().notNull(),
  title: varchar({ length: 255 }).notNull(),
});

export const sectionsTable = pgTable('sections', {
  id: char({ length: 36 }).primaryKey(), // uuid from API
  courseId: char({ length: 36 })
    .notNull()
    .references(() => coursesTable.id, { onDelete: 'cascade' }),

  code: varchar({ length: 63 }).notNull(),
  year: char({ length: 4 }).notNull(),
  session: char({ length: 1 }).notNull(),
  term: char({ length: 1 }),

  startTime: time(),
  endTime: time(),

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
  session: SessionSchema,
  term: TermSchema,
});

export type Course = z.infer<typeof selectCourseSchema>;
export type Section = z.infer<typeof selectSectionSchema>;
