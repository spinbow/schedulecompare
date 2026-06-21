import { searchCoursesProcedure } from './lib/courses';
import { getSectionsProcedure } from './lib/sections';
import {
  getRegisteredSectionsProcedure,
  registerSectionProcedure,
  unregisterSectionProcedure,
} from './lib/registrations';
import { router } from './trpc';

export const appRouter = router({
  searchCourses: searchCoursesProcedure,
  getSections: getSectionsProcedure,
  getRegisteredSections: getRegisteredSectionsProcedure,
  registerSection: registerSectionProcedure,
  unregisterSection: unregisterSectionProcedure,
});

export type AppRouter = typeof appRouter;
