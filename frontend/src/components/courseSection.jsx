import { Button } from "@/components/ui/button";
import { CourseCard } from "./courseCard";
import Link from "next/link";

export function CourseSection({ title, courses }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link href="/courses">
          <Button variant="ghost" size="sm">See all</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`}>
             <CourseCard key={course.id} {...course} />
          </Link>
        ))}
      </div>
    </section>
  );
}