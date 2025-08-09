import express from 'express';
import type { Response } from 'express';
import { uploadSingle } from '../middleware/upload.js';
import { googleVisionService } from '../services/googleVision.js';
import { authMiddleware, type AuthRequest } from '../utils/auth.js';

type UploadedFile = {
  buffer: Buffer;
  originalname: string;
  size: number;
  mimetype: string;
};

type VisionRequest = AuthRequest & { file?: UploadedFile };

const router = express.Router();

// Apply authentication to all vision endpoints
router.use(authMiddleware);

/**
 * POST /api/vision/detect-landmark
 * Detect landmarks in an uploaded image
 */
router.post('/detect-landmark', uploadSingle, async (req: VisionRequest, res: Response) => {
  try {
    console.log('🚀 Starting detect-landmark endpoint');
    console.log('Headers received:', req.headers);
    console.log('Auth user:', req.user?.email);
    
    if (!req.file) {
      console.log('❌ No file in request');
      console.log('Request body:', req.body);
      return res.status(400).json({
        error: 'No image file provided',
        message: 'Please upload an image file'
      });
    }

    console.log(`✅ Processing image: ${req.file.originalname}, size: ${req.file.size} bytes, mimetype: ${req.file.mimetype}`);

    // Check if Google Vision API key is configured
    if (!process.env.GOOGLE_VISION_API_KEY) {
      console.log('❌ Google Vision API key not configured');
      // Return mock data for testing
      const mockResult = {
        landmarks: [],
        webDetection: {
          webEntities: [],
          bestGuessLabels: [{ label: 'Test image (API key not configured)' }]
        },
        textAnnotations: []
      };
      
      return res.json({
        success: true,
        data: mockResult,
        landmarks: mockResult.landmarks,
        webDetection: mockResult.webDetection,
        textAnnotations: mockResult.textAnnotations,
        message: 'Mock response - Google Vision API key not configured'
      });
    }

    // Process the image with Google Vision API
    console.log('🔍 Calling Google Vision API...');
    const result = await googleVisionService.detectLandmarks(req.file.buffer);

    // Log results for debugging
    console.log('📊 Vision API Results:', {
      landmarksFound: result.landmarks.length,
      webDetectionEntities: result.webDetection?.webEntities.length || 0,
      textAnnotations: result.textAnnotations?.length || 0,
    });

    // Return the results
    res.json({
      success: true,
      data: result,
      landmarks: result.landmarks,
      webDetection: result.webDetection,
      textAnnotations: result.textAnnotations,
    });

  } catch (error) {
    console.error('❌ Error in detect-landmark endpoint:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        error: 'Failed to process image',
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing the image',
      });
    }
  }
});

/**
 * POST /api/vision/analyze-text
 * Extract and analyze text from an image
 */
router.post('/analyze-text', uploadSingle, async (req: VisionRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No image file provided',
      });
    }

    // For now, we'll use the same service but could extend it
    const result = await googleVisionService.detectLandmarks(req.file.buffer);

    res.json({
      success: true,
      textAnnotations: result.textAnnotations,
    });

  } catch (error) {
    console.error('Error in analyze-text endpoint:', error);
    res.status(500).json({
      error: 'Failed to analyze text in image',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/vision/test
 * Test endpoint to verify the API is working
 */
router.get('/test', (req: VisionRequest, res: Response) => {
  res.json({
    message: 'Vision API is working',
    timestamp: new Date().toISOString(),
    user: req.user?.email || 'Unknown',
  });
});

export default router;