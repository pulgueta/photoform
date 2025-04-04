import type { FC } from "react";
import { useTransition } from "react";

import type { SubscriptionStatus } from "@prisma/client";
import { Link, redirect } from "@tanstack/react-router";
import type { User } from "better-auth";
import { LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Paragraph, paragraphVariants } from "@/components/ui/typography";
import { signOut } from "@/lib/auth-client";

interface AuthProfileProps {
  user: User | undefined;
  subscription: SubscriptionStatus | undefined;
}

export const AuthProfile: FC<AuthProfileProps> = ({ user, subscription }) => {
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      signOut({
        fetchOptions: {
          onSuccess: () => {
            throw redirect({
              to: "/login",
              replace: true,
            });
          },
        },
      });
    });
  };

  const initials = user?.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);

  const currentPlan: Record<SubscriptionStatus, string> = {
    FREE: "Free",
    ACTIVE: "Active",
    CANCELLED: "Cancelled",
    PENDING: "Pending",
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center space-x-4 rounded-lg bg-tertiary p-2 text-tertiary-foreground shadow-xs transition-colors hover:bg-primary/20">
          <Avatar>
            <AvatarImage
              src={user?.image ?? ""}
              alt={`Profile picture of ${user?.name}`}
            />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            <Badge>Pro</Badge>
          </Avatar>
          <div>
            <Paragraph className="pointer-events-none" variant="sub1">
              {user?.name}
            </Paragraph>
            <Paragraph className="pointer-events-none" muted variant="xs">
              {user?.email}
            </Paragraph>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Paragraph>Current plan:</Paragraph>
          <Paragraph variant="xs">
            {currentPlan[subscription ?? "PENDING"]}
          </Paragraph>
        </div>

        <Link to="/dashboard" className={paragraphVariants()}>
          Account settings
        </Link>

        <Separator className="my-2 bg-background/20" />

        <Button variant="destructive" fullWidth onClick={handleLogout}>
          {pending ? (
            "Logging out..."
          ) : (
            <>
              <LogOutIcon />
              Logout
            </>
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
