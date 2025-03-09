"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getCourseById } from "@/store/slices/coursesSlice";
import { selectedCourse } from "@/store/slices/coursesSlice";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const courseId = Number(id);

  const course = useSelector((state) => state.courses.selectedCourse);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={course?.thumbnailUrl}
          alt={course?.title}
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Course Overview */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex gap-2 mb-6">
              <h2 className="text-lg font-semibold">{course?.title}</h2>
            </div>

            {/* Rating Section */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">4</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      out of 5
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                      <Star className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Top Rating
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-14">5 stars</div>
                      <Progress value={75} className="h-2" />
                      <div className="text-sm w-12 text-right">75%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-14">4 stars</div>
                      <Progress value={60} className="h-2" />
                      <div className="text-sm w-14 text-right">60%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-14">3 stars</div>
                      <Progress value={45} className="h-2" />
                      <div className="text-sm w-14 text-right">45%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-14">2 stars</div>
                      <Progress value={30} className="h-2" />
                      <div className="text-sm w-14 text-right">30%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-14">1 star</div>
                      <Progress value={15} className="h-2" />
                      <div className="text-sm w-14 text-right">15%</div>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                {/* <div className="mt-8 space-y-6">
                  {[1, 2].map((review) => (
                    <div key={review} className="border-b pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">Una</h4>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4].map((star) => (
                                <Star
                                  key={star}
                                  className="w-4 h-4 fill-primary text-primary"
                                />
                              ))}
                              <Star className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            3 months ago
                          </p>
                          <p className="text-sm">
                            Class, launched less than a year ago by Blackboard
                            co-founder Michael Chasen, integrates exclusively...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}

                <div className="mt-8 space-y-6">
                  <h3 className="font-semibold">Course Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {course?.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Info Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                {/* add the course preview video here */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold">₹{course?.price}</span>
                    <span className="text-muted-foreground line-through">
                    ₹{course?.price + 100}
                    </span>
                    <Badge>50% Off</Badge>
                  </div>
                </div>
                <Button onClick={() => router.push(`/payment?courseId=${courseId}`)} className="w-full mb-4">Buy Now</Button>
                <div className="space-y-4">
                  <h3 className="font-semibold">This Course Included</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-4 h-4 rounded-full bg-primary/20" />
                      Money Back Guarantee
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-4 h-4 rounded-full bg-primary/20" />
                      Access to all services
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-4 h-4 rounded-full bg-primary/20" />
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
