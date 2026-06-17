import { Course } from '../../schema';
import { ApiCourseData } from './schema';

export function apiCourseDataToDbCourse(data: ApiCourseData): Course {
  const attr = data.attributes;

  return {
    id: data.id,
    code: attr.field_course_code,
    title: attr.title,
  };
}
