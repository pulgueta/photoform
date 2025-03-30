import { createFileRoute } from "@tanstack/react-router";

import { FormsGrid } from "@/components/forms-grid";
import { Heading, Paragraph } from "@/components/ui/typography";
import type { Form } from "@prisma/client";
// import { getPhotographerForms } from "@/services/form";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  // loader: async ({ context: { user } }) => {
  //   // biome-ignore lint/style/noNonNullAssertion: Needed
  //   const forms = getPhotographerForms(user?.id!);

  //   return {
  //     forms,
  //   };
  // },
});

const MOCK_FORMS: Form[] = [
  {
    id: "1",
    uuid: crypto.randomUUID(),
    name: "Wedding Package 2024",
    slug: "wedding-package-2024",
    userId: "1",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 5 + 5),
    ),
    updatedAt: new Date(),
    isAnswered: false,
    fields: [
      {
        id: "1",
        uuid: crypto.randomUUID(),
        name: "Name",
        type: "text",
        required: true,
        formId: "1",
      },
      {
        id: "1",
        uuid: crypto.randomUUID(),
        name: "Name",
        type: "text",
        required: true,
        formId: "1",
      },
      {
        id: "1",
        uuid: crypto.randomUUID(),
        name: "Name",
        type: "text",
        required: true,
        formId: "1",
      },
      {
        id: "1",
        uuid: crypto.randomUUID(),
        name: "Name",
        type: "text",
        required: true,
        formId: "1",
      },
    ],
    responses: [],
  },
  {
    id: "2",
    uuid: crypto.randomUUID(),
    name: "Portrait Session",
    slug: "portrait-session",
    userId: "1",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 5 + 5),
    ),
    isAnswered: true,
    updatedAt: new Date(),
    fields: [
      {
        id: "1",
        uuid: crypto.randomUUID(),
        name: "Name",
        type: "text",
        required: true,
        formId: "1",
      },
    ],
    responses: [],
  },
  {
    id: "3",
    uuid: crypto.randomUUID(),
    name: "Family Photo Package",
    slug: "family-photo-package",
    userId: "1",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 5 + 5),
    ),
    updatedAt: new Date(),
    fields: [
      {
        id: "1",
        uuid: crypto.randomUUID(),
        name: "Name",
        type: "text",
        required: true,
        formId: "1",
      },
    ],
    isAnswered: false,
    responses: [],
  },
];

function RouteComponent() {
  // const { forms: formsPromise } = Route.useLoaderData();

  return (
    <section>
      <header className="border-b pb-2">
        <Heading as="h2">Your forms</Heading>
        <Paragraph muted>
          Here you can see all the forms you have created and create new ones.
        </Paragraph>
      </header>
      {/* <Await promise={formsPromise}>
        {(forms) => <FormsGrid forms={forms} />}
      </Await> */}
      <FormsGrid forms={MOCK_FORMS} />
    </section>
  );
}
