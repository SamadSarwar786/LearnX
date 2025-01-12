import { WelcomeSection } from "@/components/WelcomeSection";
import { CategorySection } from "@/components/categorySection";
import { CourseSection } from "@/components/courseSection";
import { NewsletterSection } from "@/components/newsletterSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { recommendedCourses, choiceCourses, developmentCourses, viewingCourses } from "./dummy";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      { /* Header */}
       <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <CategorySection />
        <CourseSection 
          title="Recommended for you" 
          courses={recommendedCourses} 
        />
        <CourseSection 
          title="Get choice of your course" 
          courses={choiceCourses}
        />
        <NewsletterSection />
        <CourseSection 
          title="The course in personal development" 
          courses={developmentCourses}
        />
        <CourseSection 
          title="Student are viewing" 
          courses={viewingCourses}
        />
      </main>
      { /* Footer */}
      <Footer/>
    </div>
  );
}

export default Home;