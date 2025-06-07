import Navigation from "@/components/navigation";
import BlogCMS from "@/components/blog-cms";
import Footer from "@/components/footer";

export default function Admin() {
  return (
    <div className="min-h-screen bg-neutral">
      <Navigation />
      <div className="pt-20">
        <BlogCMS />
      </div>
      <Footer />
    </div>
  );
}