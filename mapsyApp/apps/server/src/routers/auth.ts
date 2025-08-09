import express from 'express';
import type { Response, NextFunction } from 'express';
import { z } from 'zod';
import { User, RegisterSchema, LoginSchema } from '../models/User.js';
import { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  authMiddleware 
} from '../utils/auth.js';
import type { AuthRequest } from '../utils/auth.js';

const router = express.Router();

// Validation middleware
const validateBody = (schema: z.ZodSchema) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.issues.map((err: z.ZodIssue) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }
      next(error);
    }
  };
};

// Register endpoint
router.post('/register', validateBody(RegisterSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      preferences: {
        language: 'es',
        theme: 'system'
      },
      onboardingCompleted: false
    });

    await user.save();

    // Generate token
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          preferences: user.preferences,
          onboardingCompleted: user.onboardingCompleted,
          createdAt: user.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Login endpoint
router.post('/login', validateBody(LoginSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user.id, user.email);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          preferences: user.preferences,
          onboardingCompleted: user.onboardingCompleted,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.userId).select('-password');
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          preferences: user.preferences,
          onboardingCompleted: user.onboardingCompleted,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update onboarding status
const OnboardingSchema = z.object({
  onboardingCompleted: z.boolean()
});

router.patch('/onboarding', 
  authMiddleware, 
  validateBody(OnboardingSchema), 
  async (req: AuthRequest, res: Response) => {
    try {
      const { onboardingCompleted } = req.body;

      const user = await User.findByIdAndUpdate(
        req.user!.userId,
        { onboardingCompleted },
        { new: true }
      ).select('-password');

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Onboarding status updated',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            preferences: user.preferences,
            onboardingCompleted: user.onboardingCompleted,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin
          }
        }
      });

    } catch (error) {
      console.error('Update onboarding error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

// Logout endpoint (optional - mainly for token invalidation if needed)
router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  // Since we're using stateless JWT, logout is mainly handled on the client
  // But we can log it for analytics or update user's lastLogin
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;