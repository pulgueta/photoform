import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/layout/navbar";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
