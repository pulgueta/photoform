import { cache } from "react";

import { getWebRequest } from "@tanstack/react-start/server";

import { api } from "@/lib/auth";

export const getCurrentSession = cache(async () => {
  const webRequest = getWebRequest();

  const session = await api.getSession({
    // biome-ignore lint/style/noNonNullAssertion: Better Auth has this as undefined
    headers: webRequest?.headers!,
  });

  return session;
});
