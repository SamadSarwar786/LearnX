"use client"
import {
  Brush,
  Code2,
  Clapperboard,
  BarChart3,
  Megaphone,
  Camera,
  Drama,
  Building2
} from "lucide-react";
import { CategoryCard } from "./categoryCard";
import { useGetCategoriesQuery } from "@/services/api";
const categoryToIcon = {
  Design: Brush,
  Development: Code2,
  "Mobile Development": Code2,
  Business: Building2,
  Marketing: Megaphone,
  Photography: Camera,
  Acting: Drama,
  Leadership: BarChart3
}
// const categories = [
//   {
//     name: "Design",
//     description: "Learn the fundamentals of design and theory to create stunning visuals",
//     icon: Brush
//   },
//   {
//     name: "Mobile Development",
//     description: "Master programming languages and build modern applications",
//     icon: Code2
//   },
//   {
//     name: "Development",
//     description: "Create robust backend systems and scalable architectures",
//     icon: Code2
//   },
//   {
//     name: "Business",
//     description: "Understand business strategies and management principles",
//     icon: Building2
//   },
//   {
//     name: "Marketing",
//     description: "Learn digital marketing strategies and growth techniques",
//     icon: Megaphone
//   },
//   {
//     name: "Photography",
//     description: "Master the art of photography and photo editing",
//     icon: Camera
//   },
//   {
//     name: "Acting",
//     description: "Develop your acting skills and stage presence",
//     icon: Drama
//   },
//   {
//     name: "Leadership",
//     description: "Advanced business concepts and leadership skills",
//     icon: BarChart3
//   }
// ];
export function CategorySection() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  if (isLoading || isError) return <></>;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">
        Choice favourite course from top category
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories && categories.map((category, index) => {
          if (!categoryToIcon[category.name]) return <></>;
          return <CategoryCard key={index} {...category} icon={categoryToIcon[category.name]} />
        }
        )}
      </div>
    </section>
  );
}