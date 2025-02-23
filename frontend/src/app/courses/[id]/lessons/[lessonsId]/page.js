"use client";
import { redirect } from "next/navigation";
import LessonPlayer from "@/components/LessonPlayer";
import CourseSidebar from "@/components/CourseSidebar";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { getCourseById } from "@/store/slices/coursesSlice";
import { getLessonById, getAllLessons } from "@/store/slices/lessonSlice";

export default function LessonPage() {
  const params = useParams();
  const courseId = Number(params.id);
  const lessonId = Number(params.lessonsId);

  // Get course and lessons data from Redux store
  const course = useSelector((state) => getCourseById(state, courseId));
  const currentLesson = useSelector((state) => getLessonById(state, lessonId));
  const allLessons = useSelector((state) => getAllLessons(state));
  const courseLessons = allLessons.filter(lesson => lesson.courseId === courseId);
  
  // If no course found or no lessons for this course, redirect to 404
  if (!course || courseLessons.length === 0) {
    redirect("/404");
  }

  // If lesson not found, redirect to first lesson of the course
  if (!currentLesson) {
    redirect(`/courses/${courseId}/lessons/${courseLessons[0].id}`);
  }

  // Replace with your actual purchase verification
  const hasPurchased = false; 

  return (
    <div className="flex h-screen bg-background">
      <CourseSidebar course={course} currentLessonId={currentLesson.id} courseLessons={courseLessons} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <LessonPlayer 
            lesson={currentLesson} 
            courseId={courseId}
          />
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-foreground">
              {currentLesson.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{currentLesson.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
