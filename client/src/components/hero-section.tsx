import { motion } from "framer-motion";
import { ChevronDown, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaGithub, FaDribbble, FaTwitter } from "react-icons/fa";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral via-white to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-6">
              Hi, I'm <span className="text-primary">Gary</span>
            </h1>
            <h2 className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
              GenAI Certified QA Engineering Leader with Active Security Clearance
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              15+ years driving quality, automation, and security across enterprise platforms. 
              Leading AI-driven quality initiatives that accelerate innovation and improve software reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("portfolio")}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                View My Experience
              </Button>
              <Button
                variant="outline"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200"
              >
                Download Resume
              </Button>
            </div>
            
            <div className="flex gap-6 mt-10">
              <a href="https://www.linkedin.com/in/garyrobinsoniii" className="text-2xl text-gray-600 hover:text-primary transition-colors duration-200">
                <FaLinkedin />
              </a>
              <a href="#" className="text-2xl text-gray-600 hover:text-primary transition-colors duration-200">
                <FaGithub />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600" 
                alt="Professional headshot of Gary Robinson III" 
                className="rounded-2xl shadow-2xl w-80 h-96 object-cover object-center"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-green-500 text-white p-4 rounded-xl shadow-lg"
              >
                <div className="text-2xl font-mono">&lt;&gt;</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="text-primary text-2xl"
        >
          <ChevronDown />
        </button>
      </motion.div>
    </section>
  );
}
