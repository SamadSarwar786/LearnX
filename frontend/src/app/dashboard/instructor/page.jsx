"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, BookOpen, Upload, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useCreateCourseMutation, useGetInstructorCoursesQuery, useUpdateCourseMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { Loader2, Plus, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function InstructorDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const router = useRouter();
  const { toast } = useToast();
  const { data: courses, isLoading: coursesLoading } = useGetInstructorCoursesQuery();

  const [updateCourse] = useUpdateCourseMutation();

  const handleCreateCourse = async () => {
    try {
      const response = await createCourse({ title, description }).unwrap();

      if (response) {
        setIsOpen(false);
        setTitle("");
        setDescription("");

        toast({
          variant: "success",
          title: "Course Created!",
          description: response.message || "Course Successfully created! Please add your content",
        });

        router.push(
          `/dashboard/instructor/content/${response.id}`
        );
      }
    } catch (error) {
      console.error("Failed to create course:", error);
      toast({
        // Add failure toast
        variant: "error",
        title: "Error",
        description: "Failed to create course. Please try again.",
      });
    }
  };

  const handlePublishCourse = async (courseId) => {
    try {
      const payload = {
        courseId,
        isPublished: true,
      };

      await updateCourse(payload).unwrap();

      toast({
        variant: "default",
        title: "Course Published!",
        description: "Course published successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to publish course. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Instructor Dashboard
          </h2>
          <p className="text-muted-foreground">Manage your courses and content</p>
        </div>

        <div className="flex items-center justify-end">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Create New Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter course description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleCreateCourse}
                  loading={isLoading}
                  disabled={!title.trim() || !description.trim() || isLoading}
                >
                  Create Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Published courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,841</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Course Revenue
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,432</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Hours</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48h</div>
            <p className="text-xs text-muted-foreground">
              Total uploaded content
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Courses</CardTitle>
          <CardDescription>View and manage your recent course content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses?.length > 0 ? (courses?.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{course.title}</h4>
                    <Badge variant={course.isPublished ? "default" : "secondary"}>{course.isPublished ? "Published" : "Draft"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  {/* <p className="text-sm text-muted-foreground">
                      {course.lessonsCount} lessons • Last updated {course.lastUpdated}
                    </p> */}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => router.push(`/dashboard/instructor/courses/${course.id}/lessons`)} size="sm">
                    <BookOpen className="h-4 w-4" />
                    Lessons
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/instructor/content/${course.id}`)}>
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                  {!course.isPublished && <Button onClick={() => handlePublishCourse(course.id)} size="sm">Publish</Button>}
                </div>
              </div>
            ))) : (
              <div className="text-center text-muted-foreground">
                No courses created yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
