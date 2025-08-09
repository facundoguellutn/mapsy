import authRouter from './auth.js';
import visionRouter from './vision.js';

export const appRouter = {
  auth: authRouter,
  vision: visionRouter
};

export type AppRouter = typeof appRouter;
