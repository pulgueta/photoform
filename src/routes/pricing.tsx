import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { queryKeys } from "@/constants/query-keys";
import { getPrices } from "@/services/pricing";

export const Route = createFileRoute("/pricing")({
  component: RouteComponent,
  loader: async () => await getPrices(),
});

function RouteComponent() {
  const initialPrices = Route.useLoaderData();

  const { data: prices, isLoading } = useQuery({
    queryKey: [queryKeys.prices],
    queryFn: async () => initialPrices,
    initialData: initialPrices,
  });

  console.dir(prices, { depth: Number.POSITIVE_INFINITY });

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        prices.map((price) => (
          <Card key={price.id}>
            <CardHeader>
              <CardTitle>{price.name}</CardTitle>
              <CardDescription>{price.description}</CardDescription>
            </CardHeader>
          </Card>
        ))
      )}
    </div>
  );
}
