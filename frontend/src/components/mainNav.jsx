'use client';

import { cn } from "@/lib/utils";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useSelector } from 'react-redux';

export function MainNav({ className, ...props }) {
  const pathname = usePathname();
  const user = useSelector((state) => state.user.user);

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
       <span className="text-lg font-bold">learnX</span>
      <Link
        href="/"
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          'text-primary': pathname === '/', 
        })}
      >
        Home
      </Link>
      {user && user.role === "INSTRUCTOR" ? (
        <Link
          href="/dashboard/instructor"
          className={cn("text-sm font-medium transition-colors hover:text-primary", {
            'text-primary': pathname === '/dashboard/instructor', 
          })}
        >
          Courses
        </Link>
      ) : (
        <Link
          href="/courses"
          className={cn("text-sm font-medium transition-colors hover:text-primary", {
            'text-primary': pathname === '/courses', 
          })}
        >
          Courses
        </Link>
      )}
    </nav>
  );
}