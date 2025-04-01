import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  loader: async ({ context: { user } }) => {
    return {
      role: user?.role,
    };
  },
  beforeLoad: async ({ context }) => {
    // if (!context.user) {
    //   throw redirect({
    //     to: "/login",
    //   });
    // }
  },
});

function DashboardLayout() {
  const { role } = Route.useLoaderData();

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />

      <SidebarInset className="bg-secondary p-4 text-secondary-foreground">
        <SidebarTrigger />

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
