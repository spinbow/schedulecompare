import { z } from 'zod';

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

const LinksSchema = z.object({
  next: z
    .object({
      href: z.string(),
    })
    .optional(),
});

export const ApiResponseSchema = z.object({
  jsonapi: z.object({
    version: z.literal('1.1'),
  }),
  data: z.array(ApiCourseDataSchema),
  links: LinksSchema,
});

export type ApiCourseData = z.infer<typeof ApiCourseDataSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
