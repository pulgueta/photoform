import { Suspense, lazy } from "react";

import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

const SparklesCore = lazy(() =>
  import("@/components/particles").then((mod) => ({
    default: mod.SparklesCore,
  })),
);

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main>
      <header className="landing-gradient flex min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center gap-4 p-4">
        <h1 className="z-20 scroll-m-20 text-balance text-center font-bold text-3xl text-primary-foreground tracking-tighter md:text-5xl lg:text-6xl">
          Elevate your photoshoots with AI recommendations
        </h1>
        <Suspense>
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="pointer-events-auto absolute z-10 size-full"
            particleColor="#FFFFFF"
          />
        </Suspense>
        <p className="z-20 text-pretty text-center">
          Create AI portraits and get tips and recommendations for your next
          photoshoots with your clients.
        </p>
        <Button
          variant="brand"
          className="z-20 mx-auto w-full max-w-max"
          asChild
        >
          <Link to="/dashboard">Launch your first form now!</Link>
        </Button>
      </header>
    </main>
  );
}
