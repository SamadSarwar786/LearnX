'use client'
import { useSelector } from 'react-redux';
import { MainNav } from "@/components/mainNav";
import { UserNav } from "@/components/userNav";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
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
              <Button onClick={() => router.push("/login")} >Login</Button>
              <Button onClick={() => router.push("/register")}>Register</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}