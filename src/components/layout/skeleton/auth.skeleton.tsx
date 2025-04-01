import { Skeleton } from "@/components/ui/skeleton";

export const AuthSkeleton = () => (
  <>
    <Skeleton className="h-7 w-24 bg-brand-foreground" />
    <Skeleton className="h-7 w-24 bg-brand-foreground" />
  </>
);

export const ProfileSkeleton = () => (
  <div className="flex items-center space-x-4 p-2">
    <Skeleton className="size-8 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-2 w-32" />
    </div>
  </div>
);
