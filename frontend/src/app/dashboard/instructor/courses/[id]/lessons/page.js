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
import { useCreateLessonMutation, useGetCourseLessonsQuery, useUpdateLessonMutation } from "@/services/api";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { Loader2, Plus, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Lessons() {
    const params = useParams();
    const courseId = params.id;

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [createLesson, { isLoading }] = useCreateLessonMutation();
    const router = useRouter();
    const { toast } = useToast();
    const { data: response, isLoading: lessonsLoading } = useGetCourseLessonsQuery({ courseId });
    const lessons = response?.lessons || [];
    const [updateLesson] = useUpdateLessonMutation();

    const handleCreateLesson = async () => {
        try {
            const response = await createLesson({
                courseId,
                title,
                description
            }).unwrap();

            if (response) {
                setIsOpen(false);
                setTitle("");
                setDescription("");

                toast({
                    variant: "success",
                    title: "Lesson Created!",
                    description: response.message || "Lesson Successfully created! Please add your content",
                });

                router.push(
                    `/dashboard/instructor/courses/${courseId}/lessons/${response.id}`
                );
            }
        } catch (error) {
            console.error("Failed to create lesson:", error);
            toast({
                // Add failure toast
                variant: "destructive",
                title: "Error",
                description: "Failed to create lesson. Please try again.",
            });
        }
    };

    //   const handlePublishCourse = async (courseId) => {
    //     try {
    //       const payload = {
    //         courseId,
    //         isPublished: true,
    //       };

    //       await updateCourse(payload).unwrap();

    //       toast({
    //         variant: "success",
    //         title: "Course Published!",
    //         description: "Course published successfully!",
    //       });
    //     } catch (error) {
    //       toast({
    //         variant: "destructive",
    //         title: "Error",
    //         description: "Failed to publish course. Please try again.",
    //       });
    //     }
    //   };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Course Lessons
                    </h2>
                    <p className="text-muted-foreground">Manage your course lessons</p>
                </div>

                <div className="flex items-center justify-end">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full" size="lg">
                                <Plus className="mr-2 h-4 w-4" />
                                Create New Lesson
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Lesson</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Lesson Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter lesson title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Lesson Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter lesson description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                    />
                                </div>
                                <Button
                                    className="w-full"
                                    onClick={handleCreateLesson}
                                    loading={isLoading}
                                    disabled={!title.trim() || !description.trim() || isLoading}
                                >
                                    Create Lesson
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Lessons</CardTitle>
                    <CardDescription>View and manage your recent course lessons</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {lessons?.length > 0 ? (lessons?.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold">{lesson.title}</h4>
                                        <Badge variant={lesson.isPaid ? "default" : "secondary"}>{lesson.isPaid ? "Paid" : "Free"}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {lesson.description}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/instructor/courses/${courseId}/lessons/${lesson.id}`)}>
                                        <Edit2 className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))) : (
                            <div className="text-center text-muted-foreground">
                                No lessons created yet
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
