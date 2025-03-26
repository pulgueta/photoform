import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";

import { api } from "@/lib/auth";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const webRequest = getWebRequest();

  const session = await api.getSession({
    // biome-ignore lint/style/noNonNullAssertion: Better Auth has this as undefined
    headers: webRequest?.headers!,
    query: {
      disableCookieCache: true,
    },
  });

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
