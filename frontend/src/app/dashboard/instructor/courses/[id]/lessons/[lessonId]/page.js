"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetVideoUrlQuery,
  useUploadVideoMutation,
  useUpdateLessonMutation,
  api,
} from "@/services/api";
import { useToast } from "@/components/hooks/use-toast";
import { useSelector } from "react-redux";

export default function LessonUpload() {
  const params = useParams();

  const lessonId = params.lessonId;
  const courseId = params.id;

  const router = useRouter();
  const { toast } = useToast();

  const lesson = useSelector((state) => state.general.selectedLesson);

  // State variables
  const [title, setTitle] = useState(lesson?.title || "");
  const [description, setDescription] = useState(lesson?.description || "");
  const [isFree, setIsFree] = useState(lesson?.isFree || false); // Paid or Free toggle
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(
    lesson?.videoUrl || ""
  );

  const [getVideoUrl, { data: videoUrl, isLoading: videoUrlLoading }] =
    api.endpoints.getVideoUrl.useLazyQuery();

  const [uploadVideo] = useUploadVideoMutation();
  const [updateLesson] = useUpdateLessonMutation();

  // Effect to update state when lesson is available
  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title || "");
      setDescription(lesson.description || "");
      setIsFree(lesson.isFree || false);
    }
  }, [lesson]);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Upload lesson video file
  const handleUploadVideo = async () => {
    if (!selectedFile) return;


    await getVideoUrl({ lessonId, courseId });

    try {
      const response = await fetch(videoUrl, {
        method: "PUT",
        body: selectedFile,
        headers: { "Content-Type": selectedFile.type },
      });

      if (!response.ok) throw new Error("Failed to upload video");
   
      await uploadVideo({ lessonId, courseId }).unwrap();

      toast({
        variant: "success",
        title: "Success",
        description: "Video uploaded successfully!",
      });

      setSelectedFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload video.",
      });
    }
  };

  // Update Lesson Content
  const updateLessonContent = async () => {
    try {
      const payload = { lessonId, courseId, title, description, isFree };
      await updateLesson(payload).unwrap();

      toast({
        variant: "success",
        title: "Success",
        description: "Lesson updated successfully!",
      });

      router.push(`/dashboard/instructor/courses/${courseId}/lessons`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update lesson.",
      });
    }
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    };
  }, [videoPreviewUrl]);

  if (!lesson) return <p>Lesson not found.</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{lesson?.title}</h2>
        <p className="text-muted-foreground">{lesson?.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Lesson</CardTitle>
          <CardDescription>
            Edit lesson details and upload video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description">Lesson Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Free or Paid Toggle */}
          <div className="space-y-2">
            <Label>Access Type</Label>
            <div className="flex items-center space-x-4">
              <Button
                variant={isFree ? "default" : "outline"}
                onClick={() => setIsFree(true)}
              >
                Free
              </Button>
              <Button
                variant={!isFree ? "default" : "outline"}
                onClick={() => setIsFree(false)}
              >
                Paid
              </Button>
            </div>
          </div>

          {/* Video Upload Section */}
          <div className="space-y-2">
            <Label>Upload Lesson Video</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
              {selectedFile || videoPreviewUrl ? (
                <div className="flex flex-col items-center gap-4">
                  <video
                    controls
                    src={videoPreviewUrl}
                    className="max-w-[300px] h-auto rounded-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setVideoPreviewUrl(null);
                    }}
                  >
                    Remove Video
                  </Button>
                </div>
              ) : (
                <>
                  <Video className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div>
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                    >
                      Click to upload
                      <Input
                        id="file-upload"
                        name="video"
                        type="file"
                        className="sr-only"
                        onChange={handleFileSelect}
                        accept="video/*"
                      />
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      or drag and drop
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Upload and Save Buttons */}
          <Button
            className="w-full"
            onClick={handleUploadVideo}
            disabled={!selectedFile || videoUrlLoading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {videoUrlLoading ? "Uploading..." : "Upload Video"}
          </Button>

          <Button className="w-full" onClick={updateLessonContent}>
            Save Lesson Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
