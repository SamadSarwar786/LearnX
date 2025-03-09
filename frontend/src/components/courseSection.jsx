import { Button } from "@/components/ui/button";
import { CourseCard } from "./courseCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useDispatch } from "react-redux";
import { setSelectedCourse } from "@/store/slices/coursesSlice";

export function CourseSection({ title, courses }) {
  const router = useRouter();
  const [courseLessons, setCourseLessons] = useState({});
  const [getLessons] = api.endpoints.getCourseLessons.useLazyQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (courses) {
      const fetchLessonsForCourses = async () => {
        const lessonsMap = {};

        for (const course of courses) {
          try {
            const result = await getLessons({ courseId: course.id }).unwrap();

            if (result.lessons && result.lessons.length > 0) {
              lessonsMap[course.id] = result.lessons[0].id;
            }
          } catch (error) {
            console.error(
              `Error fetching lessons for course ${course.id}:`,
              error
            );
          }
        }

        setCourseLessons(lessonsMap);
      };

      fetchLessonsForCourses();
    }
  }, [courses, getLessons]);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/courses")}
        >
          See all
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {courses &&
          courses.slice(0, 8).map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}/lessons/${courseLessons[course.id]}`}
              onClick={() => dispatch(setSelectedCourse(course))}
            >
              <CourseCard key={course.id} {...course} />
            </Link>
          ))}
      </div>
    </section>
  );
}
