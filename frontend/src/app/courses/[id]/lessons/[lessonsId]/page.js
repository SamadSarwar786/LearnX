"use client";
import LessonPlayer from "@/components/LessonPlayer";
import CourseSidebar from "@/components/CourseSidebar";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLessonById } from "@/store/slices/lessonSlice";

export default function LessonPage() {
  const params = useParams();
  const courseId = Number(params.id);
  const lessonId = Number(params.lessonsId);

  const [lessons, setLessons] = useState([]);

  const [getLessons] = api.endpoints.getCourseLessons.useLazyQuery();

  useEffect(() => {
    const fetchLessons = async () => {
      const { lessons } = await getLessons({ courseId }).unwrap();
      setLessons(lessons);
    };

    fetchLessons();
  }, [courseId, getLessons]);

  const currentLesson = useSelector((state) => getLessonById(state, lessonId));

  return (
    <div className="flex h-screen bg-background">
      <CourseSidebar courseId={courseId} lessons={lessons} />
      {currentLesson && <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <LessonPlayer
            courseId={courseId}
            lessonId={lessonId}
            lesson={currentLesson}
          />
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-foreground">
              {currentLesson.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{currentLesson.description}</p>
          </div>
        </div>
      </main>}
    </div>
  );
}
