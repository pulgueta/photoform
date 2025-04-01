import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { DashboardSidebar } from "@/components/layout/sidebar/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FormBuilderProvider } from "@/context/form-builder-context";
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
      user,
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
  const { user, subscription } = Route.useLoaderData();

  return (
    <SidebarProvider>
      <DashboardSidebar user={user} subscription={subscription} />

      <SidebarInset className="bg-secondary p-4 text-secondary-foreground">
        <SidebarTrigger />

        <FormBuilderProvider>
          <Outlet />
        </FormBuilderProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
