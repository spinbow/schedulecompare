import { fetchCourseData } from '../src/lib/ubc-course-api/fetch';

const courses = await fetchCourseData();
console.log(courses);
console.log(courses.length);
