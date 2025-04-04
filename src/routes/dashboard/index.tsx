import { Suspense } from "react";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { FormsGrid } from "@/components/forms-grid";
import { FormsSkeleton } from "@/components/layout/skeleton/forms-skeleton";

import { Heading, Paragraph } from "@/components/ui/typography";
import { queryKeys } from "@/constants/query-keys";
import { getPhotographerFormsFn } from "@/services/form";

const formsQueryOptions = () =>
  queryOptions({
    queryKey: [queryKeys.forms],
    queryFn: ({ signal }) => getPhotographerFormsFn({ signal }),
  });

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(formsQueryOptions());
  },
  beforeLoad: ({ context: { user } }) => {
    if (!user) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  const { data: forms } = useSuspenseQuery(formsQueryOptions());

  return (
    <section>
      <header className="border-b pb-2">
        <Heading as="h2">Your forms</Heading>
        <Paragraph muted>
          Here you can see all the forms you have created and create new ones.
        </Paragraph>
      </header>
      <Suspense fallback={<FormsSkeleton />}>
        <FormsGrid forms={forms} />
      </Suspense>
    </section>
  );
}
