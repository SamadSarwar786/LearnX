import { Button } from "@/components/ui/button";
import { CourseCard } from "./courseCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CourseSection({ title, courses }) {
  const router = useRouter();
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
          <Button variant="ghost" size="sm" onClick={() => router.push("/courses")}>See all</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {courses && courses.slice(0, 8).map((course) => (
          <Link key={course.id} href={`/courses/${course.id}/purchase`}>
             <CourseCard key={course.id} {...course} />
          </Link>
        ))}
      </div>
    </section>
  );
}