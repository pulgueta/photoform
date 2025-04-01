import { Await, createFileRoute } from "@tanstack/react-router";

import { FormsGrid } from "@/components/forms-grid";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getPhotographerFormsFn } from "@/services/form";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  loader: async ({ abortController: { signal } }) => {
    const forms = getPhotographerFormsFn({ signal });

    return {
      forms,
    };
  },
});

function RouteComponent() {
  const { forms: formsPromise } = Route.useLoaderData();

  return (
    <section>
      <header className="border-b pb-2">
        <Heading as="h2">Your forms</Heading>
        <Paragraph muted>
          Here you can see all the forms you have created and create new ones.
        </Paragraph>
      </header>
      <Await promise={formsPromise}>
        {(forms) => <FormsGrid forms={forms} />}
      </Await>
    </section>
  );
}
