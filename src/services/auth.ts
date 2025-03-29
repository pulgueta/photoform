import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { api } from "@/lib/auth";
import { prisma } from "@/utils/prisma";

export const getUser = createServerFn().handler(async () => {
  const webRequest = getWebRequest();

  const session = await api.getSession({
    // biome-ignore lint/style/noNonNullAssertion: Better Auth has this as undefined
    headers: webRequest?.headers!,
  });

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
      id: session?.user.id,
    },
    cacheStrategy: {
      ttl: 60,
    },
  });

  return user;
});

export type User = Awaited<ReturnType<typeof getUser>>;
