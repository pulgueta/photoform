import { Outlet, createFileRoute } from "@tanstack/react-router";
import { getCookie } from "@tanstack/react-start/server";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import {
  SIDEBAR_COOKIE_NAME,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUser } from "@/services/auth";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  loader: async () => {
    const sidebarCookie = getCookie(SIDEBAR_COOKIE_NAME);
    const user = await getUser();

    return {
      defaultOpen: sidebarCookie === "true",
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
  const { defaultOpen, role } = Route.useLoaderData();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar role={role} />

      <SidebarInset className="bg-secondary p-4 text-secondary-foreground">
        <SidebarTrigger />

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
