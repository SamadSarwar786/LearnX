import LockOverlay from "./LockOverlay";
import { useGetUrlForGetLessonQuery } from "@/services/api";

export default function LessonPlayer({ lesson, lessonId, courseId }) {

  const lessonUrl = useGetUrlForGetLessonQuery({ lessonId });

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        src={lessonUrl?.data?.url}
        className="w-full h-full"
        // Disable controls if lesson is not free
        controls={lesson.isFree}
      />
      {!lesson.isFree && <LockOverlay courseId={courseId} />}
    </div>
  );
}