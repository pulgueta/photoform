import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { DefaultCatchBoundary } from "@/components/layout/error-boundary";
import { Navbar } from "@/components/layout/navbar";
import { NotFound } from "@/components/layout/not-found";
import { queryKeys } from "@/constants/query-keys";
import type { User } from "@/services/auth";
import { getUser } from "@/services/auth";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";

interface RouteContext {
  queryClient: QueryClient;
  user: User;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: [queryKeys.user],
      queryFn: ({ signal }) => getUser({ signal }),
    });

    return { user };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description:
          "TanStack Start is a type-safe, client-first, full-stack React framework. ",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-manrope">
        <Navbar />

        {children}

        {process.env.NODE_ENV === "development" && (
          <TanStackRouterDevtools position="bottom-right" />
        )}

        <Scripts />
      </body>
    </html>
  );
}
