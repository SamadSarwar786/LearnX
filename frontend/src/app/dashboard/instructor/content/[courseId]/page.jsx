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
import { Upload, Video } from "lucide-react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  useGetCategoriesQuery,
  useGetThumbnailUrlQuery,
  useUploadThumbnailImgMutation,
  useUpdateCourseMutation
} from "@/services/api";
import { useToast } from "@/components/hooks/use-toast";

export default function ContentUpload() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = params.courseId;
  const { toast } = useToast();
  const { data: thumbnailUrl, isLoading: thumbnailUrlLoading } = useGetThumbnailUrlQuery({ courseId });
  const [uploadThumbnailImg] = useUploadThumbnailImgMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(""); 
  const [previewUrl, setPreviewUrl] = useState(null); 
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
        variant: "destructive",
        title: "Error",
        description: "Failed to upload thumbnail. Please try again.",
      });
    }
  };

  const updateCourseContent = async () => {
    try {
      const payload = {
        courseId,
        title,
        price,
        description,
        categoryId: selectedCategory,
      };

      await updateCourse(payload).unwrap();

      toast({
        variant: "success",
        title: "Success",
        description: "Course content updated successfully!",
      });

      router.push("/dashboard/instructor");

    } catch (error) {
      console.error("Update error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update course content. Please try again.",
      });
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Cleanup preview URL when component unmounts or file is removed
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
                  <Select onValueChange={(value) => setSelectedCategory(value)} value={selectedCategory}>
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
                  <Label htmlFor="price">Course Price</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter course price"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Thumbnail</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                    {(selectedFile) ? (<div className="flex flex-col items-center gap-4">
                      <img
                        src={previewUrl}
                        alt="Thumbnail preview"
                        className="max-w-[200px] h-auto rounded-lg"
                      />
                       <Button variant="outline" onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}>
                          Remove
                        </Button>
                    </div>) : (<>
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div>
                        <Label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                        >
                          <span>Click to upload</span>
                          <Input
                            id="file-upload"
                            name="thumbnail"
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
                    </>)}
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
                  disabled={!selectedFile || thumbnailUrlLoading} // Add disabled state
                >
                  <Upload className="mr-2 h-4 w-4" />
                  upload
                  { thumbnailUrlLoading ? "Uploading..." : "Upload Thumbnail"}
                </Button>

                <Button className="w-full" onClick={updateCourseContent}>Save course content</Button>
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
