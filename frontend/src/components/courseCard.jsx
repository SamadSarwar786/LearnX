import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutGrid, Clock } from "lucide-react";

export function CourseCard({ title, image, price, instructor, duration, description }) {
  const originalPrice = price + 20; // Example: original price is $20 more

  return (
    <Card className="overflow-hidden bg-white rounded-3xl">
      <div className="aspect-[4/3] relative">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <LayoutGrid className="h-4 w-4" />
            <span>Design</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-slate-800">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={instructor.avatar} />
              <AvatarFallback>{instructor.name[0]}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{instructor.name}</span>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground line-through mr-2">${originalPrice}</span>
            <span className="text-2xl font-bold text-teal-500">${price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}