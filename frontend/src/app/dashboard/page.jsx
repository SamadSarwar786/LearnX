"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, Trophy } from "lucide-react";
import Link from "next/link";
import { WelcomeSection } from "@/components/WelcomeSection";
import { useGetStudentCoursesQuery, useGetCourseLessonsQuery, useGetPublicCoursesQuery } from '@/services/api';
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courseCard";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLesson, setSelectedCourseId } from '@/store/slices/generalSlice';
import { useState } from 'react';
import { useToast } from "@/components/hooks/use-toast";

function DashboardPage() {
  const [selectedCourseId, setLocalCourseId] = useState(null);
  const { data: studentCourses, isLoading: studentCoursesLoading } = useGetStudentCoursesQuery();
  const { data: publicCourses, isLoading: publicCoursesLoading } = useGetPublicCoursesQuery();
  const { data: lessonsData, isLoading: lessonsLoading } = useGetCourseLessonsQuery(
    { courseId: selectedCourseId },
    { skip: !selectedCourseId }
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const hasPurchased = true;

  const handleCourseClick = async (courseId) => {
    if (!hasPurchased) {
      router.push(`/courses/${courseId}/purchase`);
      return;
    }

    try {
      setLocalCourseId(courseId);
      dispatch(setSelectedCourseId(courseId));
      
      if (lessonsData?.lessons?.length > 0) {
        const firstLesson = lessonsData.lessons[0];
        dispatch(setSelectedLesson(firstLesson));
        router.push(`/courses/${courseId}/lessons/${firstLesson.id}`);
      } else {
        router.push("/courses");
        toast({
          variant: "destructive",
          title: "No Lessons Available",
          description: "This course doesn't have any lessons yet.",
        });
      }
    } catch (error) {
      router.push('/courses');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load course lessons.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Student!</h2>
        <p className="text-muted-foreground">Here's an overview of your learning progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        {/* <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <WelcomeSection />
          </CardContent>
        </Card> */}

        {studentCourses?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* here check if the course is purchased or not if purchased then show the course lesson page */}
            {studentCourses?.map((course) => (
              <div
                key={course.id}
                onClick={() => handleCourseClick(course.id)}
                className="cursor-pointer"
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Courses Enrolled</h2>
            <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet. Browse our courses and start learning today!</p>
            <Button onClick={() => router.push("/courses")}>
              Browse Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;