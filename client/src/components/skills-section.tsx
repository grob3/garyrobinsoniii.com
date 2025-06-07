import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Bot, Cog } from "lucide-react";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      icon: <Bot className="text-4xl" />,
      title: "AI & Automation",
      skills: [
        { name: "GenAI Integration", level: 95 },
        { name: "Test Automation", level: 90 },
        { name: "Data Analysis", level: 85 },
      ]
    },
    {
      icon: <Shield className="text-4xl" />,
      title: "Quality & Security",
      skills: [
        { name: "Security Testing", level: 95 },
        { name: "Performance Testing", level: 90 },
        { name: "Accessibility (508)", level: 85 },
      ]
    },
    {
      icon: <Cog className="text-4xl" />,
      title: "Tools & Frameworks",
      skills: [
        { name: "Katalon/Playwright", level: 95 },
        { name: "Postman/API Testing", level: 90 },
        { name: "Jenkins/CI/CD", level: 85 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced capabilities in quality engineering, AI integration, and security testing
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-primary mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: (index * 0.2) + (skillIndex * 0.1) + 0.5 }}
                        className="bg-primary h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
