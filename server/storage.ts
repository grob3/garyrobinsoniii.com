import { contactSubmissions, blogPosts, type ContactSubmission, type InsertContactSubmission, type BlogPost, type InsertBlogPost } from "@shared/schema";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | null>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | null>;
  deleteBlogPost(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private blogPosts: Map<number, BlogPost>;
  private currentId: number;
  private blogCurrentId: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.blogPosts = new Map();
    this.currentId = 1;
    this.blogCurrentId = 1;
    
    // Initialize with some sample blog posts
    this.initializeBlogPosts();
  }

  private initializeBlogPosts() {
    const samplePosts: BlogPost[] = [
      {
        id: 1,
        title: "AI-Driven Quality Assurance: The Future of Testing",
        slug: "ai-driven-quality-assurance-future-testing",
        content: "As a GenAI certified professional, I've witnessed firsthand how artificial intelligence is revolutionizing quality assurance practices. In this post, I'll share insights from implementing AI solutions for test design, data analysis, and defect triage across multiple enterprise platforms.\n\nThe integration of generative AI into QA workflows has enabled us to streamline processes that traditionally required extensive manual effort. From automated test case generation based on requirements to intelligent defect categorization, AI is becoming an indispensable tool for modern QA teams.\n\nKey areas where AI has made significant impact:\n\n1. **Automated Test Design**: Using AI to generate comprehensive test scenarios based on user stories and acceptance criteria\n2. **Intelligent Data Analysis**: Leveraging machine learning to identify patterns in test results and predict potential failure points\n3. **Enhanced Defect Triage**: Implementing AI-powered classification systems to prioritize and route defects to appropriate team members\n\nLooking ahead, the convergence of AI and quality assurance will continue to evolve, offering new opportunities to improve software reliability while reducing time-to-market.",
        excerpt: "Exploring how AI and machine learning are transforming quality assurance practices and what it means for the future of software testing.",
        category: "AI & Technology",
        tags: ["AI", "Quality Assurance", "Testing", "Automation"],
        published: "published",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15")
      },
      {
        id: 2,
        title: "Leading QA Teams in Federal Projects: Lessons from FEMA",
        slug: "leading-qa-teams-federal-projects-fema",
        content: "Leading a QA team for the FEMA National Flood Insurance Program taught me valuable lessons about managing quality in high-stakes, mission-critical environments. When you're dealing with systems that directly impact disaster relief efforts, there's no room for error.\n\nOur team of 4 engineers successfully launched a flood insurance policy quote application in just 7 months, a timeline that required exceptional coordination and strategic planning. Here are the key strategies that made this possible:\n\n**Building Comprehensive Test Coverage**\nWe developed over 200 API tests with data-driven capabilities using Postman, ensuring seamless integration across all application endpoints. The key was creating reusable test components that could adapt to different data scenarios.\n\n**Implementing Accessibility Standards**\nFederal projects require strict adherence to Section 508 accessibility guidelines. We established automated accessibility testing using Axe DevTools, training the entire team to identify and remediate accessibility issues early in the development cycle.\n\n**Performance Testing at Scale**\nGiven the potential for high traffic during disaster events, performance testing was critical. We implemented automated nightly and weekly performance runs, delivering actionable reports for each release.\n\n**Data Management Innovation**\nOne of our biggest challenges was handling thousands of rows of address data for testing. I developed a Jupyter notebook in Google Colab to process and format this data efficiently, improving our test coverage by 30%.\n\nWorking on federal projects requires a different mindset - one where quality isn't just about user experience, but about public service and disaster preparedness.",
        excerpt: "Key insights from leading QA initiatives on the FEMA National Flood Insurance Program and managing quality in mission-critical federal systems.",
        category: "Leadership",
        tags: ["Leadership", "Federal", "FEMA", "Team Management"],
        published: "published",
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01")
      },
      {
        id: 3,
        title: "Security-First QA: Lessons from Healthcare and Financial Services",
        slug: "security-first-qa-healthcare-financial",
        content: "During my time at United Healthcare and other organizations handling sensitive data, I learned that security cannot be an afterthought in quality assurance - it must be woven into every aspect of the testing process.\n\nAs a Security Advocate at Rally Health (now part of United Healthcare), I developed comprehensive threat models and leveraged OWASP ZAP to identify vulnerabilities before weekly releases. This experience taught me that effective security testing requires both technical expertise and strategic thinking.\n\n**Key Security QA Practices:**\n\n1. **Threat Modeling**: Before writing any test cases, we conducted thorough threat modeling sessions to identify potential attack vectors\n2. **Automated Security Scanning**: Integrated OWASP ZAP into our CI/CD pipeline for continuous security assessment\n3. **Data Protection Testing**: Specialized testing protocols for PHI (Protected Health Information) and PII (Personally Identifiable Information)\n4. **Penetration Testing**: Regular man-in-the-middle attack simulations to verify encryption protocols\n\n**The Mobile Security Challenge**\nOne of my most impactful discoveries was a critical bug affecting sensitive voice and location data in a mobile application destined for government and military organizations. This finding reinforced the importance of comprehensive security testing across all platforms.\n\n**Building Security Culture**\nSuccessful security QA isn't just about tools and processes - it's about building a culture where every team member understands their role in maintaining security. This involves regular training, clear documentation, and making security testing as routine as functional testing.\n\nIn today's threat landscape, security-first QA isn't optional - it's essential for protecting both organizational assets and user trust.",
        excerpt: "How to integrate security practices into quality assurance workflows, with insights from healthcare and government projects.",
        category: "Security",
        tags: ["Security", "Healthcare", "Testing", "OWASP"],
        published: "published",
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20")
      }
    ];

    samplePosts.forEach(post => {
      this.blogPosts.set(post.id, post);
      this.blogCurrentId = Math.max(this.blogCurrentId, post.id + 1);
    });
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentId++;
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogCurrentId++;
    const now = new Date();
    const post: BlogPost = {
      ...insertPost,
      id,
      tags: insertPost.tags || [],
      published: insertPost.published || "draft",
      createdAt: now,
      updatedAt: now,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published === "published")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPost(id: number): Promise<BlogPost | null> {
    return this.blogPosts.get(id) || null;
  }

  async updateBlogPost(id: number, updatePost: Partial<InsertBlogPost>): Promise<BlogPost | null> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return null;

    const updatedPost: BlogPost = {
      ...existingPost,
      ...updatePost,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
