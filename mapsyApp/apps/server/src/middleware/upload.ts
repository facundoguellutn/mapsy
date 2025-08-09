import multer from 'multer';
import type { Request } from 'express';
import type { Options as MulterOptions } from 'multer';

// Configure multer for memory storage (we don't need to save files)
const storage = multer.memoryStorage();

// File filter to only allow images
const fileFilter: MulterOptions['fileFilter'] = (
  req: Request,
  file: Express.Multer.File,
  cb
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Configure upload with limits
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
});

export const uploadSingle = (req: Request, res: any, next: any) => {
  console.log('📁 Upload middleware triggered');
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Content-Length:', req.headers['content-length']);
  
  const uploadHandler = upload.single('image');
  uploadHandler(req, res, (err: any) => {
    if (err) {
      console.error('❌ Upload middleware error:', err);
      return res.status(400).json({
        error: 'Upload failed',
        message: err.message,
      });
    }
    
    console.log('✅ Upload middleware completed');
    console.log('File received:', req.file ? 'YES' : 'NO');
    if (req.file) {
      console.log('File details:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
    }
    
    next();
  });
};