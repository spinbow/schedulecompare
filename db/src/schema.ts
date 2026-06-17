import { char, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-orm/zod';
import { z } from 'zod';

export const coursesTable = pgTable('courses', {
  id: char({ length: 36 }).primaryKey(), // uuid from endpoint
  code: varchar({ length: 63 }).unique().notNull(),
  title: varchar({ length: 255 }).notNull(),
});

export const selectCourseSchema = createSelectSchema(coursesTable);

export type Course = z.infer<typeof selectCourseSchema>;
