import { useEffect } from "react";

import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm } from "@/components/login-form";
import { oneTap } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  useEffect(() => {
    oneTap();
  }, []);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-brand-foreground p-4">
      <LoginForm />
    </div>
  );
}
