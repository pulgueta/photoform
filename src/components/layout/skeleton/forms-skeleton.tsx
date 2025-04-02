import { Skeleton } from "@/components/ui/skeleton";

export const FormsSkeleton = () => (
  <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 5 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: Doesn't matter in this case
      <Skeleton key={i} className="h-36 w-full" />
    ))}
  </div>
);
