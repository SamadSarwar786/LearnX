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

export function CategorySection() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  if (isLoading || isError) return <></>;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">
        Choice favourite course from top category
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories && categories.map((category) => {
          if (!categoryToIcon[category.name]) return null;
          return (
            <CategoryCard 
              key={category.id}
              {...category} 
              icon={categoryToIcon[category.name]} 
            />
          );
        })}
      </div>
    </section>
  );
}