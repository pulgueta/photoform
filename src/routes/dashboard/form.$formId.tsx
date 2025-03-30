import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/form/$formId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { formId } = Route.useParams();

  return (
    <div>
      Hello "/dashboard/form/$formId"! <br /> formId: {formId}
    </div>
  );
}
