import { cn } from "@/lib/utils";
import Link from 'next/link'

export function MainNav({ className, ...props }) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/courses"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Courses
      </Link>
      <Link
        href="/career"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Career
      </Link>
      <Link
        href="/blog"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Blog
      </Link>
      <Link
        href="/about"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        About us
      </Link>
    </nav>
  );
}