import { Card, CardContent } from "@/components/ui/card";

export function CategoryCard({ title, icon: Icon, description }) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer">
      <CardContent className="pt-6">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}