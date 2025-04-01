import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { DashboardSidebar } from "@/components/layout/sidebar/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserSubscriptionStatus } from "@/services/user";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  loader: async ({ context: { user }, abortController: { signal } }) => {
    const subscription = await getUserSubscriptionStatus({
      data: {
        userId: user?.id,
      },
      signal,
    });

    return {
      role: user?.role,
      subscription,
    };
  },
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function DashboardLayout() {
  const { role, subscription } = Route.useLoaderData();

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} subscription={subscription} />

      <SidebarInset className="bg-secondary p-4 text-secondary-foreground">
        <SidebarTrigger />

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
