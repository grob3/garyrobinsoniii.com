import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";

interface ContactInfo {
  email: string;
  location: string;
  website: string;
  socialLinks: {
    platform: string;
    icon: string;
    url: string;
  }[];
}

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { data: contactData, isLoading } = useQuery<ContactInfo>({
    queryKey: ["/api/contact"],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact/message", data);
      toast({
        title: "Message Sent!",
        description: "Your message has been sent successfully. I'll get back to you soon.",
        variant: "default"
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <ScrollReveal>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Get In Touch</h2>
            <div className="h-0.5 w-16 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Interested in working together or have a question? Feel free to reach out.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="bg-background p-8 rounded-lg shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center text-primary mr-4">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{contactData?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center text-primary mr-4">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white">{contactData?.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center text-primary mr-4">
                        <i className="fas fa-globe"></i>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Website</p>
                        <p className="text-white">{contactData?.website}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                <div className="flex space-x-4">
                  {isLoading ? (
                    <div className="py-2">Loading social links...</div>
                  ) : (
                    contactData?.socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300"
                      >
                        <i className={`fab ${link.icon}`}></i>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-background p-8 rounded-lg shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">Send A Message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your name"
                              className="w-full px-4 py-2 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Your Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              className="w-full px-4 py-2 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter subject"
                              className="w-full px-4 py-2 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your message"
                              rows={4}
                              className="w-full px-4 py-2 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="inline-block h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Contact;
