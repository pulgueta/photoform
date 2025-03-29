import type { ComponentProps, FC } from "react";

import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider: FC<ComponentProps<typeof Provider>> = ({
  delayDuration = 0,
  ...props
}) => (
  <Provider
    data-slot="tooltip-provider"
    delayDuration={delayDuration}
    {...props}
  />
);

const Tooltip: FC<ComponentProps<typeof Root>> = ({ ...props }) => (
  <TooltipProvider>
    <Root data-slot="tooltip" {...props} />
  </TooltipProvider>
);

const TooltipTrigger: FC<ComponentProps<typeof Trigger>> = ({ ...props }) => (
  <Trigger data-slot="tooltip-trigger" {...props} />
);

const TooltipContent: FC<ComponentProps<typeof Content>> = ({
  className,
  sideOffset = 0,
  children,
  ...props
}) => (
  <Portal>
    <Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out",
        className,
      )}
      {...props}
    >
      {children}
      <Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" />
    </Content>
  </Portal>
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
