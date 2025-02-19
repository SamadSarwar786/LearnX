"use client";

import { usePathname } from "next/navigation";
import { BookOpen, Video, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const studentNav = [
  {
    title: "My Courses",
    href: "/dashboard",
    icon: BookOpen
  },
];

const instructorNav = [
  {
    title: "My Courses",
    href: "/dashboard/instructor",
    icon: BookOpen
  },
  {
    title: "Content",
    href: "/dashboard/instructor/content",
    icon: Video
  },
  {
    title: "Settings",
    href: "/dashboard/instructor/settings",
    icon: Settings
  }
];

export default function DashboardLayout({
  children,
}) {
  const pathname = usePathname();
  const isInstructor = pathname.includes("/instructor");
  const navigation = isInstructor ? instructorNav : studentNav;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-card border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-semibold">
                {isInstructor ? "Instructor Portal" : "Learning Dashboard"}
              </h1>
            </div>
            <div className="mt-8 flex flex-col flex-1">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.title}
                    </Link>
                  );
                })}
                <button
                  className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground mt-4"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}