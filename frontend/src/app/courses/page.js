import Link from "next/link";
import { CourseCard } from "@/components/courseCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { choiceCourses } from "../dummy";

export default function Cources() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {choiceCourses.map((course) => (
            <Link href={`/courses/${course.id}`}>
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
