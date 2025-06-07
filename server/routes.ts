import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({
        message: "Contact form submitted successfully",
        id: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Internal server error"
        });
      }
    }
  });

  // Get all contact submissions (for admin use)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });

  // Blog API routes
  // Get all published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });

  // Get a specific blog post by ID
  app.get("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid blog post ID"
        });
      }
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({
          message: "Blog post not found"
        });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });

  // Create a new blog post
  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      
      res.status(201).json({
        message: "Blog post created successfully",
        post
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Internal server error"
        });
      }
    }
  });

  // Update a blog post
  app.put("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid blog post ID"
        });
      }

      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      
      if (!post) {
        return res.status(404).json({
          message: "Blog post not found"
        });
      }
      
      res.json({
        message: "Blog post updated successfully",
        post
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Internal server error"
        });
      }
    }
  });

  // Delete a blog post
  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid blog post ID"
        });
      }

      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) {
        return res.status(404).json({
          message: "Blog post not found"
        });
      }
      
      res.json({
        message: "Blog post deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
