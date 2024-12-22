import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

function LessonCard({ title, image, time }) {
  return (
    <Card>
      <CardContent className="p-4 flex gap-4">
        <img src={image} alt={title} className="w-24 h-16 object-cover rounded" />
        <div className="flex-1">
          <h3 className="font-medium mb-1 line-clamp-1">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {time}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WelcomeSection() {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Welcome back, ready for your next lesson?</h2>
        <Button variant="ghost" size="sm">View History</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LessonCard 
          title="AWS Certified Solutions Architect"
          image="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9"
          time="2h 15m left"
        />
        <LessonCard
          title="Docker Fundamentals"
          image="https://images.unsplash.com/photo-1667372397509-bdb4f0b5dd76"
          time="45m left"
        />
        <LessonCard
          title="React Advanced Patterns"
          image="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
          time="1h 30m left"
        />
      </div>
    </div>
  );
}