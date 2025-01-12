'use client';

import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export function MainNav({ className, ...props }) {
  const router = useRouter();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
       <span className="text-lg font-bold">learnX</span>
      <Link
        href="/"
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          'text-primary': router.pathname === '/', 
        })}
      >
        Home
      </Link>
      <Link
        href="/courses"
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          'text-primary': router.pathname === '/courses', 
        })}
      >
        Courses
      </Link>
    </nav>
  );
}