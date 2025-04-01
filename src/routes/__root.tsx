import { Suspense, lazy } from "react";

import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { DefaultCatchBoundary } from "@/components/layout/error-boundary";
import { NotFound } from "@/components/layout/not-found";
import { queryKeys } from "@/constants/query-keys";
import type { User } from "@/services/auth";
import { getUser } from "@/services/auth";
import appCss from "@/styles/app.css?url";
import { env } from "@/utils/env.server";
import { seo } from "@/utils/seo";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "development"
    ? lazy(() =>
        import("@tanstack/react-router-devtools").then((mod) => ({
          default: mod.TanStackRouterDevtools,
        })),
      )
    : () => null;

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
        title: "Phormat - Elevate your photoshoots with AI recommendations",
        description:
          "Create AI portraits and get tips and recommendations for your next photoshoots with your clients.",
        keywords: "AI, photoshoots, recommendations, portraits",
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
  const url =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : env.URL;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <meta
          httpEquiv="Content-Security-Policy"
          content={`script-src 'self' 'unsafe-inline' ${url} https://accounts.google.com; script-src-elem 'self' 'unsafe-inline' ${url} https://accounts.google.com;`}
        />
      </head>
      <body className="font-manrope">
        {children}

        <Suspense>
          <TanStackRouterDevtools position="bottom-right" />
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
