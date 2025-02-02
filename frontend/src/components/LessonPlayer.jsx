'use client';

export default function LessonPlayer({ lesson }) {
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        className="w-full h-full"
        controls
        src={lesson.videoUrl}
        poster="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}