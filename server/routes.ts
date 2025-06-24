import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid contact data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create contact" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(newsletterData);
      res.json({ success: true, subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid email address", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to subscribe to newsletter" });
      }
    }
  });

  // Chat message handling
  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const chatMessage = await storage.createChatMessage(messageData);
      
      // Simple AI response simulation (in a real app, this would call an AI service)
      let response = "Thank you for your message! I'm here to help you with information about our automation services. ";
      
      if (messageData.message.toLowerCase().includes('chatbot')) {
        response += "Our AI Chatbots can handle customer inquiries 24/7, increase satisfaction, and reduce support costs by up to 60%. Would you like to learn more about implementation?";
      } else if (messageData.message.toLowerCase().includes('email')) {
        response += "Our Email Marketing Automation creates personalized sequences with behavioral triggers and advanced segmentation. We typically see conversion improvements of 40-80%.";
      } else if (messageData.message.toLowerCase().includes('3d') || messageData.message.toLowerCase().includes('website')) {
        response += "Our 3D Website Development creates immersive experiences that captivate visitors. These sites typically see 85%+ increases in conversion rates.";
      } else if (messageData.message.toLowerCase().includes('price') || messageData.message.toLowerCase().includes('cost')) {
        response += "Our pricing is customized based on your specific needs and business size. Would you like to schedule a free consultation to discuss your requirements?";
      } else {
        response += "Our services include AI Chatbots, Email Marketing Automation, 3D Website Development, Growth Automation, and App Development. Which service interests you most?";
      }
      
      await storage.updateChatMessageResponse(chatMessage.id, response);
      
      res.json({ 
        success: true, 
        message: chatMessage.message,
        response: response
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process chat message" });
      }
    }
  });

  // Get chat history for a session
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
