"use client";
import { redirect } from "next/navigation";
// import { getCourse, getLesson, hasUserPurchasedCourse, courses } from '@/lib/courses';
import LessonPlayer from "@/components/LessonPlayer";
import CourseSidebar from "@/components/CourseSidebar";
import { useParams } from "next/navigation";
import { Metadata } from "next";

export const courses = {
  1: {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development from scratch",
    price: 99.99,
    lessons: [
      {
        id: "1",
        title: "Introduction to Web Development",
        description:
          "Get started with the basics of web development and understand the core concepts.",
        videoUrl: "https://example.com/intro.mp4",
        isFree: true,
        courseId: "1",
        order: 1,
      },
      {
        id: "2",
        title: "HTML Fundamentals",
        description: "Learn the building blocks of web pages with HTML5.",
        videoUrl: "https://example.com/html.mp4",
        isFree: false,
        courseId: "1",
        order: 2,
      },
      // Add more lessons as needed
    ],
  },
};

// export async function generateStaticParams() {
//   const paths = [];

//   for (const courseId of Object.keys(courses)) {
//     const course = courses[courseId];
//     for (const lesson of course.lessons) {
//       paths.push({
//         courseId: courseId,
//         lessonId: lesson.id,
//       });
//     }
//   }

//   console.log("paths",paths);

//   return paths;
// }

// export async function generateMetadata({ params }) {
//   const course = params.courseId;
//   const lesson = params.lessonId;

//   if (!course || !lesson) {
//     return {
//       title: "Lesson Not Found",
//     };
//   }

//   return {
//     title: `${lesson.title} - ${course.title}`,
//     description: lesson.description,
//   };
// }

export default function LessonPage() {
  const params = useParams();
  const course = params.courseId;
  const lesson = params.lessonId;

  console.log(course, lesson);

  if (!course || !lesson) {
    redirect("/404");
  }

  // Mock user ID - Replace with your actual user authentication
  //   const userId = 'user123';
  //   const hasPurchased = await hasUserPurchasedCourse(course.id, userId);

  if (!lesson.isFree && !hasPurchased) {
    redirect(`/courses/${course.id}/purchase`);
  }

  return (
    <div className="flex h-screen bg-background">
      <CourseSidebar course={course} currentLessonId={lesson.id} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <LessonPlayer lesson={lesson} />
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-foreground">
              {lesson.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{lesson.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
