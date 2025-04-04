import type { FC } from "react";

import type { User } from "@prisma/client";
import { Link, redirect } from "@tanstack/react-router";
import { LogInIcon, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

interface NavbarProps {
  user: Omit<User, "password"> | null;
}

export const Navbar: FC<NavbarProps> = ({ user }) => {
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          throw redirect({
            to: "/login",
            replace: true,
          });
        },
      },
    });
  };
  return (
    <nav className="-translate-x-1/2 fixed top-4 left-1/2 z-20 flex h-11 w-[90%] transform items-center justify-between rounded-xl border border-neutral-200/20 bg-neutral-900/60 px-4 shadow-sm backdrop-blur-md md:h-12 md:w-[60%] lg:w-[50%]">
      <Link
        to="/"
        className="font-extrabold text-2xl text-primary-foreground tracking-tighter"
      >
        Phormat
      </Link>
      <div className="flex items-center space-x-2">
        {user ? (
          <>
            <Button asChild size="sm" variant="brand">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleSignOut}>
              <LogOutIcon />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              asChild
              variant="link"
              size="sm"
              className="text-primary-foreground"
            >
              <Link to="/pricing">Pricing</Link>
            </Button>
            <Button asChild variant="brand" size="sm">
              <Link to="/login">
                <LogInIcon />
                Log in
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
