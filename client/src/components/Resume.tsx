import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { apiRequest } from "@/lib/queryClient";

interface ResumeItem {
  id: string;
  category: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  details: string[];
  icon: string;
}

const Resume = () => {
  const { data, isLoading } = useQuery<ResumeItem[]>({
    queryKey: ["/api/resume"],
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<ResumeItem[]>([]);

  useEffect(() => {
    if (data) {
      let filtered = data;
      
      // Apply category filter
      if (activeFilter !== "all") {
        filtered = filtered.filter(item => item.category === activeFilter);
      }
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(term) ||
          item.organization.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.details.some(detail => detail.toLowerCase().includes(term))
        );
      }
      
      setFilteredItems(filtered);
    }
  }, [data, activeFilter, searchTerm]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadResume = async () => {
    try {
      const response = await apiRequest("GET", "/api/resume/download", undefined);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gary_robinson_resume.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  // Filter categories available in data
  const categories = data ? [...new Set(data.map(item => item.category))] : [];

  return (
    <section id="resume" className="py-20 bg-background">
      <ScrollReveal>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Professional Experience</h2>
            <div className="h-0.5 w-16 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              My career journey spans multiple industries and roles, with a focus on quality assurance, automation, and security.
            </p>

            {/* Resume Search */}
            <div className="max-w-md mx-auto mt-8 mb-12">
              <div className="relative">
                <input
                  type="text"
                  id="resume-search"
                  placeholder="Search resume..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 bg-secondary text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            {/* Resume Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                className={`px-6 py-2 rounded-full ${
                  activeFilter === "all" ? "bg-primary" : "bg-secondary"
                } text-white transition-colors duration-300`}
                onClick={() => handleFilterClick("all")}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full ${
                    activeFilter === category ? "bg-primary" : "bg-secondary"
                  } text-white transition-colors duration-300`}
                  onClick={() => handleFilterClick(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Resume Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary"></div>

            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-gray-300">Loading experience...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-300">No items match your search criteria.</p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`mb-16 opacity-0`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-category={item.category}
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-primary mb-2">{item.organization}</p>
                      <p className="text-gray-400">{item.period}</p>
                    </div>
                    <div className="md:w-12 flex justify-center items-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <i className={`fas ${item.icon}`}></i>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      <p className="text-gray-300 mb-3">{item.description}</p>
                      {item.details && item.details.length > 0 && (
                        <ul className="text-gray-400 list-disc pl-5">
                          {item.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleDownloadResume}
              className="inline-block px-8 py-3 bg-primary text-white hover:bg-blue-700 transition-colors duration-300"
            >
              <i className="fas fa-download mr-2"></i> Download Full Resume
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Resume;
