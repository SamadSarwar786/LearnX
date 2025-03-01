"use client";

import { CategorySection } from "@/components/categorySection";
import { CourseSection } from "@/components/courseSection";
import { NewsletterSection } from "@/components/newsletterSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Hero from '@/components/Hero';
import FAQSection from '@/components/FaqSection';
import { useGetPublicCoursesQuery } from "@/services/api";
import { useEffect } from "react";
import { validateUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";

function Home() {
  const { data: publicCourses, isLoading: publicCoursesLoading } = useGetPublicCoursesQuery();
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(validateUser());
  },[]);
  return (
    <div className="min-h-screen bg-slate-50">
      { /* Header */}
       <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <CourseSection 
            title="Get choice of your course" 
            courses={publicCourses}
          />
        <CategorySection />
        <NewsletterSection />
        <FAQSection />
      </main>
      { /* Footer */}
      <Footer/>
    </div>
  );
}

export default Home;