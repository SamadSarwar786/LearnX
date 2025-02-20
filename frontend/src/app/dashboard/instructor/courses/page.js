"use client"
import Link from "next/link";
import { CourseCard } from "@/components/courseCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useGetInstructorCoursesQuery } from "@/services/api";

export default function Cources() {
  const { data: courses, isLoading } = useGetInstructorCoursesQuery();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses?.map((course) => (  
            <Link key={course.id} href={`/courses/${course.id}/purchase`}>
              <CourseCard key={course.id} {...course} />
            </Link>
          ))}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
