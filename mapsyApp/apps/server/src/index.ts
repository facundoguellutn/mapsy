import "dotenv/config";
import cors from "cors";
import express from "express";
import "./db/index.js";
import { appRouter } from "./routers/index.js";

const app = express();

// CORS configuration for development and production
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',') 
  : [
    'http://localhost:3001',    // Web app
    'http://localhost:8081',    // Expo default
    'http://localhost:8082',    // Expo alternate
    'http://10.0.2.2:8081',     // Android emulator
    'http://10.0.2.2:8082',     // Android emulator alternate
  ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, postman, etc.)
      if (!origin) return callback(null, true);
      
      // In development, allow any localhost/10.0.2.2 and private network IPs
      if (process.env.NODE_ENV !== 'production') {
        if (
          origin.includes('localhost') || 
          origin.includes('127.0.0.1') ||
          origin.includes('10.0.2.2') ||
          origin.match(/^https?:\/\/192\.168\.\d+\.\d+/) ||
          origin.match(/^https?:\/\/172\.16\.\d+\.\d+/) ||
          origin.match(/^https?:\/\/10\.\d+\.\d+\.\d+/)
        ) {
          return callback(null, true);
        }
      }
      
      // Check against allowed origins list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Reject
      callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Add logging middleware for all requests
app.use((req, _res, next) => {
  console.log(`📨 ${req.method} ${req.path}`, {
    contentType: req.headers['content-type'],
    authorization: req.headers.authorization ? 'Bearer ***' : 'none',
    contentLength: req.headers['content-length']
  });
  next();
});

// Routes
app.use('/auth', appRouter.auth);
app.use('/api/vision', appRouter.vision);
app.use('/api/chat', appRouter.chat);

app.get("/", (_req, res) => {
  res.status(200).json({ 
    message: "Mapsy API is running",
    version: "1.0.0",
    endpoints: {
      auth: "/auth",
      vision: "/api/vision",
      chat: "/api/chat"
    }
  });
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
