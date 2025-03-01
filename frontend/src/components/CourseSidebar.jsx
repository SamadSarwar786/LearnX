import { Lock } from "lucide-react";
import Link from "next/link";

export default function CourseSidebar({ courseId, lessons }) {
  return (
    <div className="w-64 border-r bg-card p-4">
      <div className="space-y-1">
        {lessons && lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/courses/${courseId}/lessons/${lesson.id}`}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-accent"
          >
            <span className="text-sm truncate">{lesson.title}</span>
            {!lesson.isFree && (
              <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
