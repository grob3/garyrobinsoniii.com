import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface AboutData {
  heroTitle: string;
  heroSubtitle: string;
}

const Hero = () => {
  const { data, isLoading } = useQuery<AboutData>({
    queryKey: ["/api/about"],
  });

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: `${windowHeight}px`,
        backgroundImage: 
          "url('https://images.unsplash.com/photo-1528818955841-a7f1425131b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="font-display text-5xl md:text-7xl font-bold mb-4 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isLoading ? "Loading..." : data?.heroTitle || "Gary Robinson "}
            <span className="text-primary">III</span>
          </motion.h1>
          <div className="h-0.5 w-24 bg-primary mx-auto my-6"></div>
          <motion.h2 
            className="text-xl md:text-2xl text-gray-300 font-light mb-8 tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isLoading ? "Loading..." : data?.heroSubtitle || "QA Engineering • Automation • Cybersecurity • Generative AI"}
          </motion.h2>
          <motion.a
            href="#about"
            className="inline-block px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Discover More
          </motion.a>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a href="#about" className="text-white text-2xl">
          <i className="fas fa-chevron-down"></i>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
