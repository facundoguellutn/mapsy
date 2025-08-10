import authRouter from './auth.js';
import visionRouter from './vision.js';
import chatRouter from './chat.js';

export const appRouter = {
  auth: authRouter,
  vision: visionRouter,
  chat: chatRouter
};

export type AppRouter = typeof appRouter;
