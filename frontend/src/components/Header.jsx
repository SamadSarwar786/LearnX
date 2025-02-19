'use client'
import Link from "next/link";
import { useSelector } from 'react-redux';
import { MainNav } from "@/components/mainNav";
import { UserNav } from "@/components/userNav";
import { Button } from "@/components/ui/button";

export function Header() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return (
        // Header
      <header className="border-b bg-white flex justify-center">
      <div className="container flex h-16 items-center px-4">
        <MainNav />
        <div className="ml-auto flex items-center space-x-2">
        {isAuthenticated ? (
            <UserNav />
          ) : (
            <>
               <Link href="/login">
                <Button className="text-sm font-medium transition-colors hover:text-primary">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="text-sm font-medium transition-colors hover:text-primary">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
    )
}