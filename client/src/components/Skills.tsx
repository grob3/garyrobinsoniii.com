import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SkillBar from "./SkillBar";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

interface SkillsData {
  categories: SkillCategory[];
}

const Skills = () => {
  const { data, isLoading } = useQuery<SkillsData>({
    queryKey: ["/api/skills"],
  });

  return (
    <section
      id="skills"
      className="py-20 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      <ScrollReveal>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Technical Skills</h2>
            <div className="h-0.5 w-16 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              My expertise ranges across multiple domains, with a focus on quality assurance, automation, security, and AI.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-300">Loading skills...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {data?.categories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="bg-secondary bg-opacity-80 p-8 rounded-lg shadow-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <i className={`fas ${category.icon} text-primary mr-3`}></i>
                    {category.title}
                  </h3>

                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className={`mb-${
                        skillIndex === category.skills.length - 1 ? "0" : "8"
                      } skill-item`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-primary">{skill.percentage}%</span>
                      </div>
                      <SkillBar percentage={skill.percentage} />
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Skills;
