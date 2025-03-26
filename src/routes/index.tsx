import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main>
      <header className="landing-gradient flex min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center gap-8 p-4">
        <h1 className="scroll-m-20 text-balance text-center font-bold text-3xl text-primary-foreground leading-7 tracking-tighter md:text-4xl lg:text-6xl">
          Elevate your photoshoots with AI insights
        </h1>
        <Button variant="brand" className="mx-auto w-full max-w-64">
          Launch your first form now!
        </Button>
      </header>
    </main>
  );
}
