import { CategorySection } from "@/components/categorySection";
import { CourseSection } from "@/components/courseSection";
import { NewsletterSection } from "@/components/newsletterSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { choiceCourses } from "./dummy";
import Hero from '@/components/Hero';
import FAQSection from '@/components/FaqSection';

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      { /* Header */}
       <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <CategorySection />
          <CourseSection 
            title="Get choice of your course" 
            courses={choiceCourses}
          />
        <NewsletterSection />
        <FAQSection />
      </main>
      { /* Footer */}
      <Footer/>
    </div>
  );
}

export default Home;