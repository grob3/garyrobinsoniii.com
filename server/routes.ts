import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/about", async (req, res) => {
    try {
      const aboutData = await storage.getAbout();
      res.json(aboutData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch about data" });
    }
  });

  app.get("/api/resume", async (req, res) => {
    try {
      const resumeData = await storage.getResumeItems();
      res.json(resumeData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resume data" });
    }
  });

  app.get("/api/skills", async (req, res) => {
    try {
      const skillsData = await storage.getSkills();
      res.json(skillsData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills data" });
    }
  });

  app.get("/api/portfolio", async (req, res) => {
    try {
      const portfolioData = await storage.getPortfolio();
      res.json(portfolioData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const contactData = await storage.getContact();
      res.json(contactData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact data" });
    }
  });

  // Contact message submission
  app.post("/api/contact/message", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Resume download endpoint (placeholder functionality)
  app.get("/api/resume/download", (req, res) => {
    // In a real implementation, this would generate or fetch a PDF
    // For now, we'll send a mock response
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: "Resume download functionality would be implemented here" });
  });

  // Admin data update routes would typically go here
  // These would be protected by authentication
  
  const httpServer = createServer(app);

  return httpServer;
}
