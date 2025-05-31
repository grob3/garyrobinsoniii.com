import { useQuery } from "@tanstack/react-query";
import ScrollReveal from "./ScrollReveal";

interface AboutData {
  image: string;
  paragraphs: string[];
}

const About = () => {
  const { data, isLoading } = useQuery<AboutData>({
    queryKey: ["/api/about"],
  });

  return (
    <section id="about" className="py-20 bg-secondary">
      <ScrollReveal>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src={data?.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000&q=80"}
                alt="Gary Robinson III"
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">About Me</h2>
              <div className="h-0.5 w-16 bg-primary mb-8"></div>
              
              {isLoading ? (
                <p className="text-gray-300 mb-6 leading-relaxed">Loading...</p>
              ) : (
                data?.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              )}
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="#resume"
                  className="px-6 py-2 bg-primary text-white hover:bg-blue-700 transition-colors duration-300"
                >
                  View Resume
                </a>
                <a
                  href="#contact"
                  className="px-6 py-2 border border-white text-white hover:bg-white hover:text-background transition-colors duration-300"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default About;
