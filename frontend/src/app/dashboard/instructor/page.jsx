import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, BookOpen, Upload, Users } from "lucide-react";
import Link from "next/link";

export default function InstructorDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h2>
        <p className="text-muted-foreground">Manage your courses and content</p>
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
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,841</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Revenue</CardTitle>
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
            <p className="text-xs text-muted-foreground">Total uploaded content</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
            <CardDescription>Your latest published courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((course) => (
              <div key={course} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-semibold">Course Title {course}</h4>
                  <p className="text-sm text-muted-foreground">238 enrolled • 4.8 rating</p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              View All Courses
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common instructor tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg">
              Create New Course
            </Button>
            <Button className="w-full" variant="outline" size="lg">
              Upload Course Content
            </Button>
            <Button className="w-full" variant="outline" size="lg">
              View Analytics
            </Button>
            <Button className="w-full" variant="outline" size="lg">
              Manage Students
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}