"use client";

import Link from "next/link";
import { CourseCard } from "@/components/courseCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useGetPublicCoursesQuery } from "@/services/api";

export default function Cources() {
  const { data: publicCourses, isLoading: publicCoursesLoading } = useGetPublicCoursesQuery();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center">
        {publicCourses?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* here check if the course is published or not if purchased then show the course lesson page */}
            {publicCourses.map((course) => (
              <Link href={`/courses/${course.id}/purchase`}>
                <CourseCard key={course.id} {...course} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Courses Available</h2>
            <p className="text-gray-600 mb-6">There are currently no courses available. Please check back later!</p>
          </div>
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
