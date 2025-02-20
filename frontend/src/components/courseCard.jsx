import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutGrid, Clock } from "lucide-react";

export function CourseCard({ title, category, thumbnailUrl, price, instructorName, duration, description }) {
  const originalPrice = price + 20;

  return (
    <Card className="overflow-hidden bg-white rounded-3xl">
      <div className="aspect-[4/3] relative">
        {thumbnailUrl && <img 
          src={thumbnailUrl} 
          alt={title} 
          className="object-cover w-full h-full"
        />}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <LayoutGrid className="h-4 w-4" />
            {category && <span>{category.name}</span>}
          </div>
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          )}
        </div>
          
        <h3 className="text-xl font-semibold mb-3 text-slate-800 line-clamp-1 overflow-hidden">{title}</h3>
        <p className="text-muted-foreground mb-6 line-clamp-2 overflow-hidden">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {instructorName && (
              <>
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-white">{instructorName[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{instructorName}</span>
              </>
            )}           
          </div>
          <div className="text-right">
            <span className="text-muted-foreground line-through mr-2">${originalPrice}</span>
            <span className="text-2xl font-bold text-purple-500">${price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}