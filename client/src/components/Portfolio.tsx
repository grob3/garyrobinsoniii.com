import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface ProjectTag {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  detailLink: string;
}

interface PortfolioData {
  projects: Project[];
}

const Portfolio = () => {
  const { data, isLoading } = useQuery<PortfolioData>({
    queryKey: ["/api/portfolio"],
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Get unique categories from projects
  const categories = data?.projects 
    ? ["all", ...Array.from(new Set(data.projects.map(project => project.category)))]
    : ["all"];

  useEffect(() => {
    if (data?.projects) {
      if (activeFilter === "all") {
        setFilteredProjects(data.projects);
      } else {
        setFilteredProjects(data.projects.filter(project => project.category === activeFilter));
      }
    }
  }, [data, activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <ScrollReveal>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Portfolio Projects</h2>
            <div className="h-0.5 w-16 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A showcase of my most impactful projects across quality assurance, automation, security, and AI development.
            </p>
          </div>

          {/* Portfolio Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full ${
                  activeFilter === category ? "bg-primary" : "bg-secondary"
                } text-white transition-colors duration-300`}
                onClick={() => handleFilterClick(category)}
              >
                {category === "all" 
                  ? "All" 
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-300">Loading projects...</p>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="portfolio-item bg-secondary rounded-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                    data-category={project.category}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary bg-opacity-30 text-primary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.detailLink}
                        className="text-primary hover:text-white transition-colors duration-300"
                      >
                        View Details <i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Portfolio;
