import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.js";
import { ChatSession, ChatMessage } from "../models/index.js";
import { googleVisionService } from "../services/googleVision.js";
import { groqAIService } from "../services/groqAI.js";
import type { AuthenticatedRequest } from "../utils/auth.js";

const router = express.Router();

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Create new chat session
router.post(
  "/sessions",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { country, city } = req.body;

      if (!country || !city) {
        return res.status(400).json({
          success: false,
          error: "Country and city are required",
        });
      }

      const chatSession = new ChatSession({
        userId: req.user!._id,
        country: country.trim(),
        city: city.trim(),
        isActive: true,
      });

      await chatSession.save();

      // Create welcome message
      const welcomeMessage = new ChatMessage({
        chatSessionId: chatSession._id,
        type: "system",
        content: `¡Bienvenido a tu guía turístico de ${city}, ${country}! 🗺️ 

Puedes:
📸 Subir fotos de lugares para obtener información detallada
💬 Hacer preguntas sobre la ciudad y sus atracciones
🎯 Pedir recomendaciones de lugares cercanos

¡Comencemos tu aventura!`,
        sender: "assistant",
        timestamp: new Date(),
      });

      await welcomeMessage.save();

      res.json({
        success: true,
        data: {
          session: chatSession.toJSON(),
          welcomeMessage: welcomeMessage.toJSON(),
        },
      });
    } catch (error) {
      console.error("Error creating chat session:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create chat session",
      });
    }
  }
);

// Get user's chat sessions
router.get(
  "/sessions",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const sessions = await ChatSession.find({ userId: req.user!._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      // Get last message for each session
      const sessionsWithLastMessage = await Promise.all(
        sessions.map(async (session) => {
          const lastMessage = await ChatMessage.findOne({
            chatSessionId: session._id,
          })
            .sort({ timestamp: -1 })
            .select("content type sender timestamp _id")
            .lean();

          const normalizedLastMessage = lastMessage
            ? {
                id: String(lastMessage._id),
                content: lastMessage.content,
                type: lastMessage.type,
                sender: lastMessage.sender,
                timestamp: lastMessage.timestamp,
              }
            : undefined;

          return {
            id: String(session._id),
            country: session.country,
            city: session.city,
            title: session.title,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            isActive: session.isActive,
            lastMessage: normalizedLastMessage,
          };
        })
      );

      const totalSessions = await ChatSession.countDocuments({
        userId: req.user!._id,
      });

      res.json({
        success: true,
        data: {
          sessions: sessionsWithLastMessage,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalSessions / limit),
            totalItems: totalSessions,
            hasNext: page * limit < totalSessions,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch chat sessions",
      });
    }
  }
);

// Get messages for a specific chat session
router.get(
  "/sessions/:sessionId/messages",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { sessionId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const skip = (page - 1) * limit;

      // Verify session belongs to user
      const session = await ChatSession.findOne({
        _id: sessionId,
        userId: req.user!._id,
      });

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Chat session not found",
        });
      }

      const messages = await ChatMessage.find({ chatSessionId: sessionId })
        .sort({ timestamp: 1 }) // Oldest first for chat display
        .skip(skip)
        .limit(limit)
        .lean();

      const totalMessages = await ChatMessage.countDocuments({
        chatSessionId: sessionId,
      });

      res.json({
        success: true,
        data: {
          session: session.toJSON(),
          messages,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalMessages / limit),
            totalItems: totalMessages,
            hasNext: page * limit < totalMessages,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch chat messages",
      });
    }
  }
);

// Send text message
router.post(
  "/sessions/:sessionId/messages",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { sessionId } = req.params;
      const { content } = req.body;

      if (!content || !content.trim()) {
        return res.status(400).json({
          success: false,
          error: "Message content is required",
        });
      }

      // Verify session belongs to user
      const session = await ChatSession.findOne({
        _id: sessionId,
        userId: req.user!._id,
      });

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Chat session not found",
        });
      }

      // Create user message
      const userMessage = new ChatMessage({
        chatSessionId: sessionId,
        type: "text",
        content: content.trim(),
        sender: "user",
        timestamp: new Date(),
      });

      await userMessage.save();

      // Generate AI response
      try {
        const aiResponse = await groqAIService.answerQuestion(
          {
            country: session.country,
            city: session.city,
          },
          content.trim()
        );

        const assistantMessage = new ChatMessage({
          chatSessionId: sessionId,
          type: "text",
          content: aiResponse,
          sender: "assistant",
          timestamp: new Date(),
        });

        await assistantMessage.save();

        res.json({
          success: true,
          data: {
            userMessage: userMessage.toJSON(),
            assistantMessage: assistantMessage.toJSON(),
          },
        });
      } catch (aiError) {
        console.error("Error generating AI response:", aiError);

        const errorMessage = new ChatMessage({
          chatSessionId: sessionId,
          type: "system",
          content:
            "Lo siento, no pude procesar tu pregunta en este momento. Por favor intenta de nuevo.",
          sender: "assistant",
          timestamp: new Date(),
        });

        await errorMessage.save();

        res.json({
          success: true,
          data: {
            userMessage: userMessage.toJSON(),
            assistantMessage: errorMessage.toJSON(),
          },
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({
        success: false,
        error: "Failed to send message",
      });
    }
  }
);

// Upload and process image
router.post(
  "/sessions/:sessionId/images",
  authMiddleware,
  upload.single("image"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { sessionId } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          error: "Image file is required",
        });
      }

      // Verify session belongs to user
      const session = await ChatSession.findOne({
        _id: sessionId,
        userId: req.user!._id,
      });

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Chat session not found",
        });
      }

      // Create user message with image
      const userMessage = new ChatMessage({
        chatSessionId: sessionId,
        type: "image",
        content: "Imagen compartida",
        sender: "user",
        processing: true,
        timestamp: new Date(),
      });

      await userMessage.save();

      try {
        // Process image with Google Vision
        const landmarkInfo = await googleVisionService.detectLandmarks(
          file.buffer
        );

        // Update user message
        userMessage.landmarkInfo = landmarkInfo;
        userMessage.processing = false;
        await userMessage.save();

        // Generate AI response based on detected landmarks
        let aiResponse = "";
        let landmarkName = "";

        if (landmarkInfo.landmarks && landmarkInfo.landmarks.length > 0) {
          landmarkName = landmarkInfo.landmarks[0].description;
          aiResponse = await groqAIService.generateTouristResponse({
            country: session.country,
            city: session.city,
            landmarkName,
            landmarkInfo,
          });

          // Update session title if not set
          if (!session.title) {
            session.title = `Chat sobre ${landmarkName}`;
            await session.save();
          }
        } else if (
          landmarkInfo.webDetection?.bestGuessLabels &&
          landmarkInfo.webDetection.bestGuessLabels.length > 0
        ) {
          landmarkName = landmarkInfo.webDetection.bestGuessLabels[0].label;
          aiResponse = await groqAIService.generateTouristResponse({
            country: session.country,
            city: session.city,
            landmarkName,
            landmarkInfo,
          });
        } else {
          aiResponse = `No pude identificar un lugar específico en tu imagen, pero puedo ayudarte con información sobre ${session.city}, ${session.country}. ¿Hay algo particular que te gustaría saber?`;
        }

        const assistantMessage = new ChatMessage({
          chatSessionId: sessionId,
          type: "text",
          content: aiResponse,
          aiResponse,
          sender: "assistant",
          timestamp: new Date(),
        });

        await assistantMessage.save();

        res.json({
          success: true,
          data: {
            userMessage: userMessage.toJSON(),
            assistantMessage: assistantMessage.toJSON(),
            landmarkInfo,
          },
        });
      } catch (processError) {
        console.error("Error processing image:", processError);

        userMessage.processing = false;
        await userMessage.save();

        const errorMessage = new ChatMessage({
          chatSessionId: sessionId,
          type: "system",
          content:
            "No pude procesar tu imagen en este momento. Por favor intenta de nuevo.",
          sender: "assistant",
          timestamp: new Date(),
        });

        await errorMessage.save();

        res.json({
          success: true,
          data: {
            userMessage: userMessage.toJSON(),
            assistantMessage: errorMessage.toJSON(),
          },
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        success: false,
        error: "Failed to process image",
      });
    }
  }
);

// Get recommendations
router.post(
  "/sessions/:sessionId/recommendations",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { sessionId } = req.params;
      const { currentLandmark } = req.body;

      // Verify session belongs to user
      const session = await ChatSession.findOne({
        _id: sessionId,
        userId: req.user!._id,
      });

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Chat session not found",
        });
      }

      try {
        const recommendations = await groqAIService.generateRecommendations(
          {
            country: session.country,
            city: session.city,
          },
          currentLandmark
        );

        const recommendationMessage = new ChatMessage({
          chatSessionId: sessionId,
          type: "recommendation",
          content: `Aquí tienes algunas recomendaciones de lugares cercanos para visitar en ${session.city}:`,
          recommendations,
          sender: "assistant",
          timestamp: new Date(),
        });

        await recommendationMessage.save();

        res.json({
          success: true,
          data: {
            message: recommendationMessage.toJSON(),
            recommendations,
          },
        });
      } catch (aiError) {
        console.error("Error generating recommendations:", aiError);
        res.status(500).json({
          success: false,
          error: "Failed to generate recommendations",
        });
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get recommendations",
      });
    }
  }
);

// Update session (mark as inactive, change title)
router.patch(
  "/sessions/:sessionId",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { sessionId } = req.params;
      const { isActive, title } = req.body;

      const session = await ChatSession.findOneAndUpdate(
        {
          _id: sessionId,
          userId: req.user!._id,
        },
        {
          ...(typeof isActive === "boolean" && { isActive }),
          ...(title && { title: title.trim() }),
        },
        { new: true }
      );

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Chat session not found",
        });
      }

      res.json({
        success: true,
        data: session.toJSON(),
      });
    } catch (error) {
      console.error("Error updating session:", error);
      res.status(500).json({
        success: false,
        error: "Failed to update session",
      });
    }
  }
);

export default router;
