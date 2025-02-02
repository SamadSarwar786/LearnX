'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Lock, PlayCircle } from 'lucide-react';


export default function CourseSidebar({ course, currentLessonId }) {
  return (
    <div className="w-80 bg-card border-r flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="font-semibold text-xl text-card-foreground">{course.title}</h2>
        <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {course.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
            <Link
              key={lesson.id}
              href={`/courses/${course.id}/lessons/${lesson.id}`}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-colors',
                'hover:bg-accent',
                currentLessonId === lesson.id && 'bg-accent',
                'group'
              )}
            >
              {lesson.isFree ? (
                <PlayCircle className="w-5 h-5 text-primary" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-medium truncate',
                  currentLessonId === lesson.id ? 'text-primary' : 'text-foreground'
                )}>
                  {lesson.title}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {lesson.isFree ? 'Free Preview' : 'Premium'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}