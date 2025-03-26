import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { api } from "@/lib/auth";

export const getUser = createServerFn().handler(async () => {
  const webRequest = getWebRequest();
  const session = await api.getSession({
    // biome-ignore lint/style/noNonNullAssertion: Better Auth has this as undefined
    headers: webRequest?.headers!,
  });

  return session?.user ?? null;
});

export type User = Awaited<ReturnType<typeof getUser>>;
