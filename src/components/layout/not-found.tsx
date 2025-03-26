import type { FC, PropsWithChildren } from "react";

import { Link, useLocation } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const NotFound: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="space-y-2 p-2">
      <div className="text-gray-600 dark:text-gray-400">
        {children || (
          <p>
            <code>{location.pathname}</code> does not exist.
          </p>
        )}
      </div>

      <Button onClick={() => window.history.back()}>Go back</Button>
      <Button asChild>
        <Link to="/">Start Over</Link>
      </Button>
    </div>
  );
};
