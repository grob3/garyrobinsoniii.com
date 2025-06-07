import Navigation from "@/components/navigation";
import BlogSection from "@/components/blog-section";
import Footer from "@/components/footer";

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <BlogSection />
      </div>
      <Footer />
    </div>
  );
}