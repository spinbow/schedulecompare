import { fetchSections } from '../src/lib/ubc-course-api/fetch';

// const courses = await fetchCourses();
// console.log(courses);
// console.log(courses.length);

const sections = await fetchSections('');
console.log(sections);
