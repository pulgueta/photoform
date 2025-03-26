import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

const Card: FC<ComponentProps<"article">> = ({ className, ...props }) => (
  <article
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-xs",
      className,
    )}
    {...props}
  />
);

const CardHeader: FC<ComponentProps<"header">> = ({ className, ...props }) => (
  <header
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);

const CardTitle: FC<ComponentProps<"h3">> = ({ className, ...props }) => (
  <h3
    className={cn(
      "font-semibold text-2xl leading-none tracking-tight",
      className,
    )}
    {...props}
  />
);

const CardDescription: FC<ComponentProps<"p">> = ({ className, ...props }) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props} />
);

const CardContent: FC<ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter: FC<ComponentProps<"footer">> = ({ className, ...props }) => (
  <footer className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
