import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";

import { getCurrentSession } from "@/services/auth";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const webRequest = getWebRequest();

  const session = await getCurrentSession();

  if (!session) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  return next({
    context: {
      user: session.user,
    },
  });
});
