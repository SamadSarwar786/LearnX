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
  
  export function CategorySection() {
    const categories = [
      {
        title: "Design",
        description: "Learn the fundamentals of design and theory to create stunning visuals",
        icon: Brush
      },
      {
        title: "Development",
        description: "Master programming languages and build modern applications",
        icon: Code2
      },
      {
        title: "Development",
        description: "Create robust backend systems and scalable architectures",
        icon: Code2
      },
      {
        title: "Business",
        description: "Understand business strategies and management principles",
        icon: Building2
      },
      {
        title: "Marketing",
        description: "Learn digital marketing strategies and growth techniques",
        icon: Megaphone
      },
      {
        title: "Photography",
        description: "Master the art of photography and photo editing",
        icon: Camera
      },
      {
        title: "Acting",
        description: "Develop your acting skills and stage presence",
        icon: Drama
      },
      {
        title: "Business",
        description: "Advanced business concepts and leadership skills",
        icon: BarChart3
      }
    ];
  
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Choice favourite course from top category
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </section>
    );
  }