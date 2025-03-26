import { useTransition } from "react";

import { Link } from "@tanstack/react-router";
import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { AuthSkeleton } from "./skeleton/auth.skeleton";

export const Navbar = () => {
  const [pending, startTransition] = useTransition();

  const { data, isPending } = useSession();

  const handleLogout = () => {
    startTransition(() => {
      signOut();
    });
  };

  return (
    <nav className="-translate-x-1/2 fixed top-4 left-1/2 flex h-14 w-[90%] transform items-center justify-between rounded-lg border border-white/20 bg-white/10 px-4 shadow-lg backdrop-blur-md md:w-[60%] lg:w-[50%]">
      <Link
        to="/"
        className="font-extrabold text-2xl text-brand-foreground tracking-tighter drop-shadow-sm"
      >
        Photoform
      </Link>
      <div className="flex items-center space-x-2">
        {isPending ? (
          <AuthSkeleton />
        ) : !data?.user ? (
          <>
            <Button asChild size="sm" variant="brand">
              <Link to="/">Dashboard</Link>
            </Button>
            <Button
              variant="destructive"
              size="icon"
              disabled={pending}
              onClick={handleLogout}
            >
              {pending ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                <>
                  <LogOutIcon />
                  <span className="sr-only">Logout</span>
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="brand" size="sm">
              <Link to="/login">
                <LogInIcon />
                Login
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Register</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
