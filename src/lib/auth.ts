import { polar } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oneTap } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";

import { clientEnv } from "@/utils/env.client";
import { env } from "@/utils/env.server";
import {
  betterAuthProducts,
  photoformPolarProducts,
  polar as polarClient,
} from "@/utils/polar";
import { prisma } from "@/utils/prisma";

const baseURL =
  env.NODE_ENV === "development" ? clientEnv.VITE_BASE_URL : env.URL;

const auth = betterAuth({
  baseURL: baseURL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const products = await photoformPolarProducts();
          const productId = products.find(
            (product) =>
              !product.isRecurring && product.prices[0].amountType === "free",
          )?.id;

          await prisma.subscription.create({
            data: {
              user: {
                connect: {
                  id: user.id,
                },
              },
              polarProductId: productId ?? "",
              status: "FREE",
            },
          });
        },
      },
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    passkey(),
    oneTap(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      checkout: {
        enabled: true,
        products: betterAuthProducts().then,
        successUrl: "/success?checkout_id={CHECKOUT_ID}",
      },
      webhooks: {
        secret: env.POLAR_WEBHOOK_SECRET,
      },
    }),
  ],
});

export const { handler, api } = auth;
