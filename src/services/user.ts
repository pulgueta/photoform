import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

import { authMiddleware } from "@/middlewares/auth";
import { userIdSchema } from "@/schemas/user";
import { prisma } from "@/utils/prisma";
import { getCurrentSession } from "./auth";

export const getUserSubscriptionStatus = createServerFn()
  .middleware([authMiddleware])
  .validator(zodValidator(userIdSchema))
  .handler(async ({ context: { user } }) => {
    const userSubscriptionStatus = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
      },
      cacheStrategy: {
        ttl: 60,
      },
    });

    return userSubscriptionStatus?.status;
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
