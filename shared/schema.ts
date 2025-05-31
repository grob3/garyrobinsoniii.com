import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// About schema
export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  image: text("image").notNull(),
  paragraphs: json("paragraphs").$type<string[]>().notNull()
});

export const insertAboutSchema = createInsertSchema(about).omit({ id: true });
export type InsertAbout = z.infer<typeof insertAboutSchema>;
export type About = typeof about.$inferSelect;

// Resume schema
export const resume = pgTable("resume", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  details: json("details").$type<string[]>().notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull()
});

export const insertResumeSchema = createInsertSchema(resume).omit({ id: true });
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resume.$inferSelect;

// Skills schema
export const skillCategories = pgTable("skill_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull()
});

export const insertSkillCategorySchema = createInsertSchema(skillCategories).omit({ id: true });
export type InsertSkillCategory = z.infer<typeof insertSkillCategorySchema>;
export type SkillCategory = typeof skillCategories.$inferSelect;

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  percentage: integer("percentage").notNull(),
  order: integer("order").notNull()
});

export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

// Portfolio schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  detailLink: text("detail_link").notNull(),
  order: integer("order").notNull()
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Contact schema
export const contact = pgTable("contact", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  website: text("website").notNull(),
  socialLinks: json("social_links").$type<Array<{
    platform: string;
    icon: string;
    url: string;
  }>>().notNull()
});

export const insertContactSchema = createInsertSchema(contact).omit({ id: true });
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contact.$inferSelect;

// Contact messages schema
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
