import authRouter from './auth.js';

export const appRouter = {
  auth: authRouter
};

export type AppRouter = typeof appRouter;
