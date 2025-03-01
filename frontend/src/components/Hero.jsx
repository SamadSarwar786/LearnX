import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="w-full bg-slate-50">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-indigo-900">
              Learning that lasts
            </h1>
            <p className="text-gray-600 text-lg">
              Invest in yourself. Courses as low as ₹449. From
              critical skills to technical topics, Learn at your own pace with LearnX.
            </p>
            <Button onClick={() => router.push("/courses")}>Start learning now</Button>
          </div>
          <div className="relative">
            {/* <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-01-13%2015-51-41-VlHzZsETIyqOkQWZwXKaUtph4rSpWH.png"
              alt="Laptop showing a video conference screen"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
