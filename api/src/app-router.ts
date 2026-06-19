import { searchCoursesProcedure } from './lib/get-courses';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  searchCourses: searchCoursesProcedure,
});

export type AppRouter = typeof appRouter;
