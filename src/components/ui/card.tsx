import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";
import { Heading, Paragraph } from "./typography";

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

const CardTitle: FC<ComponentProps<typeof Heading>> = ({
  className,
  ...props
}) => <Heading as="h4" className={cn(className)} {...props} />;

const CardDescription: FC<ComponentProps<typeof Paragraph>> = ({
  className,
  ...props
}) => <Paragraph muted className={cn(className)} {...props} />;

const CardContent: FC<ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter: FC<ComponentProps<"footer">> = ({ className, ...props }) => (
  <footer
    className={cn("flex w-full items-center p-6 pt-0", className)}
    {...props}
  />
);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
