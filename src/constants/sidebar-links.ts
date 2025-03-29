import type { Role } from "@prisma/client";

type SidebarLink = {
  title: string;
  href: string;
};

export const sidebarLinks: Record<Role, Array<SidebarLink>> = {
  PHOTOGRAPHER: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Photos",
      href: "/dashboard/photos",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ],
  ADMIN: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Photographers",
      href: "/dashboard/photographers",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ],
  USER: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Photos",
      href: "/dashboard/photos",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ],
} as const;
