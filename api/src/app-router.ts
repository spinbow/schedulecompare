import { searchCoursesProcedure } from './lib/courses';
import { getSectionsProcedure } from './lib/sections';
import { getRegistrationsProcedure, registerSectionProcedure } from './lib/registrations';
import { router } from './trpc';

export const appRouter = router({
  searchCourses: searchCoursesProcedure,
  getSections: getSectionsProcedure,
  getRegistrations: getRegistrationsProcedure,
  registerSection: registerSectionProcedure,
});

export type AppRouter = typeof appRouter;
