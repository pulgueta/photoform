import type { FC } from "react";

import type { Role } from "@prisma/client";
import { Link } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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

interface DashboardSidebarProps {
  role: Role | undefined;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ role }) => {
  const { data: sessionData } = useSession();

  const links = sidebarLinks[role ?? "PHOTOGRAPHER"];

  return (
    <Sidebar variant="floating" className="w-full max-w-3xs">
      <SidebarHeader>
        <Link to="/dashboard" className="font-bold text-xl tracking-tight">
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
      {sessionData?.user && (
        <SidebarFooter>
          <Button variant="destructive">
            <LogOutIcon size={16} />
            Salir
          </Button>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
};
