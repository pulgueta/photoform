import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { polarSearchParams } from "@/utils/polar";

export const Route = createFileRoute("/success")({
  component: RouteComponent,
  validateSearch: zodValidator(polarSearchParams),
});

function RouteComponent() {
  const { checkout_id } = Route.useSearch();

  return <div>Hello "/success"! {checkout_id}</div>;
}
