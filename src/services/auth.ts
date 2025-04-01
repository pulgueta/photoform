import { cache } from "react";

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { api } from "@/lib/auth";
import { prisma } from "@/utils/prisma";

const getCurrentSession = cache(async () => {
  const webRequest = getWebRequest();

  const session = await api.getSession({
    // biome-ignore lint/style/noNonNullAssertion: Better Auth has this as undefined
    headers: webRequest?.headers!,
  });

  return session;
});

export const getUser = createServerFn().handler(async () => {
  const session = await getCurrentSession();

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id,
      email: session?.user.email,
    },
    omit: {
      password: true,
    },
    cacheStrategy: {
      ttl: 60,
    },
  });

  return user;
});

export type User = Awaited<ReturnType<typeof getUser>>;
