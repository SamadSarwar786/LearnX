"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CourseCard } from "@/components/courseCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useGetPublicCoursesQuery } from "@/services/api";
import { api } from "@/services/api";
import { useDispatch } from "react-redux";
import { setSelectedCourse } from "@/store/slices/coursesSlice";

export default function Cources() {
  const { data: publicCourses } = useGetPublicCoursesQuery();
  const [courseLessons, setCourseLessons] = useState({});
  const [getLessons] = api.endpoints.getCourseLessons.useLazyQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (publicCourses) {
      const fetchLessonsForCourses = async () => {
        const lessonsMap = {};

        for (const course of publicCourses) {
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
  }, [publicCourses, getLessons]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center">
        {publicCourses?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* here check if the course is purchased or not if purchased then show the course lesson page */}
            {publicCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}/lessons/${courseLessons[course.id]}`}
                onClick={() => dispatch(setSelectedCourse(course))}
              >
                <CourseCard key={course.id} {...course} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No Courses Available
            </h2>
            <p className="text-gray-600 mb-6">
              There are currently no courses available. Please check back later!
            </p>
          </div>
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
