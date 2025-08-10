import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import type { AuthenticatedRequest } from '../utils/auth.js';

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Authentication token required'
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid token - user not found'
      });
      return;
    }

    req.user = {
      _id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar ?? undefined,
      preferences: {
        language: (user.preferences as any)?.language ?? 'es',
        theme: (user.preferences as any)?.theme ?? 'system',
      },
      onboardingCompleted: user.onboardingCompleted,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};