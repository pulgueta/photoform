import { LoginForm } from "@/components/login-form";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-brand-foreground p-4">
      <LoginForm />
    </div>
  );
}
