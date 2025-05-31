import { 
  type User, 
  type InsertUser, 
  type About, 
  type Resume, 
  type Project, 
  type Contact,
  type InsertMessage,
  type Message
} from "@shared/schema";
import fs from "fs";
import path from "path";

// Interface for all storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAbout(): Promise<any>;
  getResumeItems(): Promise<any>;
  getSkills(): Promise<any>;
  getPortfolio(): Promise<any>;
  getContact(): Promise<any>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private currentUserId: number;
  private currentMessageId: number;
  
  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.loadData();
  }

  // Load initial data from JSON files
  private loadData() {
    // This would initialize the data files if needed in a real implementation
    // For this example, we'll assume the files exist
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Content methods
  async getAbout(): Promise<any> {
    try {
      const data = await this.readJsonFile("about.json");
      return data;
    } catch (error) {
      console.error("Error reading about data:", error);
      throw error;
    }
  }

  async getResumeItems(): Promise<any> {
    try {
      const data = await this.readJsonFile("resume.json");
      return data;
    } catch (error) {
      console.error("Error reading resume data:", error);
      throw error;
    }
  }

  async getSkills(): Promise<any> {
    try {
      const data = await this.readJsonFile("skills.json");
      return data;
    } catch (error) {
      console.error("Error reading skills data:", error);
      throw error;
    }
  }

  async getPortfolio(): Promise<any> {
    try {
      const data = await this.readJsonFile("portfolio.json");
      return data;
    } catch (error) {
      console.error("Error reading portfolio data:", error);
      throw error;
    }
  }

  async getContact(): Promise<any> {
    try {
      const data = await this.readJsonFile("contact.json");
      return data;
    } catch (error) {
      console.error("Error reading contact data:", error);
      throw error;
    }
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const now = new Date();
    const newMessage: Message = {
      ...message,
      id,
      createdAt: now
    };
    
    this.messages.set(id, newMessage);
    return newMessage;
  }

  // Helper method to read JSON data files
  private async readJsonFile(filename: string): Promise<any> {
    const filePath = path.join(process.cwd(), "server", "data", filename);
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error);
      throw error;
    }
  }

  // Helper method to write JSON data files (for admin updates)
  private async writeJsonFile(filename: string, data: any): Promise<void> {
    const filePath = path.join(process.cwd(), "server", "data", filename);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
      throw error;
    }
  }
}

export const storage = new MemStorage();
