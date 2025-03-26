import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

const Skeleton: FC<ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    aria-hidden
    className={cn("animate-pulse rounded-md bg-muted", className)}
    {...props}
  />
);

export { Skeleton };
