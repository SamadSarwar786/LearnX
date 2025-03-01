"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";
import { useGetStudentCoursesQuery, api } from '@/services/api';
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courseCard";
import { useDispatch } from 'react-redux';
import { setSelectedLesson } from '@/store/slices/generalSlice';
import { useToast } from "@/components/hooks/use-toast";

function DashboardPage() {
  const { data: studentCourses, isLoading: studentCoursesLoading } = useGetStudentCoursesQuery();
  const [ getLessons] = api.endpoints.getCourseLessons.useLazyQuery();
   
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
      const {lessons} = await getLessons({ courseId }).unwrap();
      if (lessons.length > 0) {
        const firstLesson = lessons[0];
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