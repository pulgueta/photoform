import type { FC } from "react";

import type { SubscriptionStatus } from "@prisma/client";
import { Link } from "@tanstack/react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarLinks } from "@/constants/sidebar-links";
import { useSession } from "@/lib/auth-client";
import type { User } from "@/services/user";
import { ProfileSkeleton } from "../skeleton/auth.skeleton";
import { AuthProfile } from "./auth-profile";

interface DashboardSidebarProps {
  user: User | undefined;
  subscription: SubscriptionStatus | undefined;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  user,
  subscription,
}) => {
  const { isPending } = useSession();

  const links = sidebarLinks[user?.role ?? "PHOTOGRAPHER"];

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="rounded-t-lg">
        <Link
          to="/dashboard"
          className="text-center font-bold text-xl tracking-tight"
        >
          Your Dashboard
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.href} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {isPending ? (
          <ProfileSkeleton />
        ) : (
          user && <AuthProfile user={user} subscription={subscription} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
