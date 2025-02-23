import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LockOverlay({ courseId }) {
  const router = useRouter();

  return (
    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
      <Lock className="w-12 h-12 mb-4" />
      <h3 className="text-xl font-semibold mb-2">This Lesson is Locked</h3>
      <p className="text-sm mb-4">Purchase this course to access all lessons</p>
      <Button 
        onClick={() => router.push(`/courses/${courseId}/purchase`)}
        variant="secondary"
      >
        Purchase Course
      </Button>
    </div>
  );
}