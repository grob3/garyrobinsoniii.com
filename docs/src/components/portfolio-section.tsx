import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PortfolioProject } from "@shared/schema";

export default function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const projects: PortfolioProject[] = [
    {
      id: "1",
      title: "FEMA National Flood Insurance Program",
      description: "Led QA team of 4 engineers for USDA/FEMA flood insurance application launch in 7 months. Built 200+ API tests with data-driven capabilities.",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "federal",
      tags: ["Team Leadership", "API Testing", "Katalon"]
    },
    {
      id: "2",
      title: "Amazon Appstore QA Leadership",
      description: "QA Lead for multiple large-scale Amazon Appstore and Android client releases, ensuring quality across global distribution platforms.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "enterprise",
      tags: ["Mobile Testing", "Scale", "Leadership"]
    },
    {
      id: "3",
      title: "United Healthcare Find & Price Care",
      description: "QA Lead and Security Advocate developing automated testing frameworks and threat modeling for healthcare applications.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "healthcare",
      tags: ["Security", "Healthcare", "Automation"]
    },
    {
      id: "4",
      title: "AI-Driven QA Innovation",
      description: "GenAI certified professional implementing AI solutions for test design, data analysis, and defect triage across multiple platforms.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "innovation",
      tags: ["GenAI", "Automation", "Innovation"]
    },
    {
      id: "5",
      title: "Performance & Security Testing",
      description: "Comprehensive performance testing leadership with automated nightly runs, security assessments, and accessibility compliance (508).",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "security",
      tags: ["Performance", "Security", "508 Compliance"]
    },
    {
      id: "6",
      title: "CI/CD Pipeline Implementation",
      description: "Architected test management tools and CI/CD pipelines using GitHub Actions, Jenkins, with JIRA and Slack integrations.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "devops",
      tags: ["CI/CD", "DevOps", "Automation"]
    }
  ];

  const filters = [
    { id: "all", label: "All Experience" },
    { id: "federal", label: "Federal" },
    { id: "enterprise", label: "Enterprise" },
    { id: "healthcare", label: "Healthcare" },
    { id: "innovation", label: "AI Innovation" },
    { id: "security", label: "Security" },
    { id: "devops", label: "DevOps" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">Professional Experience</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Key accomplishments and leadership roles across federal and commercial sectors
          </p>
        </motion.div>
        
        {/* Portfolio Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <button className="text-primary font-medium hover:underline flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
