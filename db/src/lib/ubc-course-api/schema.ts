import { z } from 'zod';
import { DayOfTheWeekSchema } from '../../schema';

const LinksSchema = z.object({
  next: z
    .object({
      href: z.string(),
    })
    .optional(),
});

const ApiCourseDataSchema = z.object({
  id: z.uuidv4(),
  type: z.literal('node--course'),
  attributes: z.object({
    title: z.string(),
    field_course_code: z.string(),
    field_course_number: z.string(),
    field_course_instance_id: z.string(),
  }),
});
export const ApiCoursesResponseSchema = z.object({
  jsonapi: z.object({
    version: z.literal('1.1'),
  }),
  data: z.array(ApiCourseDataSchema),
  links: LinksSchema,
});

const ApiSectionDataSchema = z.object({
  id: z.uuidv4(),
  type: z.literal('node--section'),
  attributes: z.object({
    field_section_number: z.string(),
    field_start_date: z.iso.date(),
    field_end_date: z.iso.date(),
    field_start_time: z.number().int().positive().nullable(),
    field_end_time: z.number().int().positive().nullable(),
    field_days: z.array(DayOfTheWeekSchema),
  }),
});
export const ApiSectionsResponseSchema = z.object({
  jsonapi: z.object({
    version: z.literal('1.1'),
  }),
  data: z.array(ApiSectionDataSchema),
  links: LinksSchema,
});

export type ApiCourseData = z.infer<typeof ApiCourseDataSchema>;
export type ApiCoursesResponse = z.infer<typeof ApiCoursesResponseSchema>;
export type ApiSectionData = z.infer<typeof ApiSectionDataSchema>;
export type ApiSectionsResponse = z.infer<typeof ApiSectionsResponseSchema>;
