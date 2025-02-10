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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Video, File, Image as ImageIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import {
  useGetCategoriesQuery,
  useGetThumbnailUrlQuery,
  useUploadThumbnailImgMutation,
} from "@/services/api";
import { useToast } from "@/components/hooks/use-toast";

export default function ContentUpload() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.courseId;
  const { toast } = useToast();
  const { data: thumbnailUrl } = useGetThumbnailUrlQuery({ courseId });
  const [uploadThumbnailImg] = useUploadThumbnailImgMutation();

  const [selectedFile, setSelectedFile] = useState(null);
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  // get the title and subtitles for the created course from query param
  const title = decodeURIComponent(
    searchParams.get("title") || "Untitled Course"
  );
  const description = decodeURIComponent(
    searchParams.get("description") || "No description available"
  );

  useEffect(() => {
    console.log("Course ID:", courseId);
  }, [courseId]);

  const handleUploadThumbnail = async () => {
    if (!selectedFile) return;

    try {
      // Check if we have the pre-signed URL
      if (!thumbnailUrl) {
        throw new Error("Failed to get upload URL");
      }

      // Upload to the pre-signed URL
      const response = await fetch(thumbnailUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile.type
        },
      });

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to upload to pre-signed URL");
      }

      // Update the course with the thumbnail URL using the mutation
      await uploadThumbnailImg({
        courseId,
      }).unwrap();

      toast({
        variant: "success",
        title: "Success",
        description: "Thumbnail uploaded successfully!",
      });

      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to upload thumbnail. Please try again.",
      });
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Course Content</h2>
        <p className="text-muted-foreground">
          Upload and manage your course materials
        </p>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload Content</TabsTrigger>
          <TabsTrigger value="manage">Manage Content</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Content</CardTitle>
              <CardDescription>
                Add videos, documents, or other course materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Content Title</Label>
                  <Input
                    id="title"
                    value={title}
                    placeholder="Enter content title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    placeholder="Describe what this content is about"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Select Course</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="loading">Loading...</SelectItem>
                      ) : error ? (
                        <SelectItem value="error">
                          Error loading categories
                        </SelectItem>
                      ) : (
                        categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Upload Thumbnail</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <div>
                      <Label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                      >
                        <span>Click to upload</span>
                        <Input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileSelect}
                          accept="image/*"
                        />
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        or drag and drop
                      </p>
                    </div>
                    {selectedFile && (
                      <div className="text-sm text-muted-foreground">
                        Selected: {selectedFile.name}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleUploadThumbnail}
                  // disabled={!selectedFile || thumbnailUrlLoading} // Add disabled state
                >
                  <Upload className="mr-2 h-4 w-4" />
                  upload
                  {/* {thumbnailUrlLoading ? "Uploading..." : "Upload Thumbnail"} */}
                </Button>

                <Button className="w-full" onClick={updateCourseContent}>Update course content</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>
                Manage your uploaded course content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Video className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-semibold">Content Title {item}</h4>
                        <p className="text-sm text-muted-foreground">
                          Video • 15:30 mins • Uploaded 2 days ago
                        </p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
