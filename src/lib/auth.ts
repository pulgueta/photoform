import { polar } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oneTap } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";

import { app_url } from "@/constants/keys";
import { env } from "@/utils/env.server";
import {
  betterAuthProducts,
  photoformPolarProducts,
  polar as polarClient,
} from "@/utils/polar";
import { prisma } from "@/utils/prisma";

const auth = betterAuth({
  baseURL: app_url,
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
              polarProductId: productId ?? "",
              userId: user.id,
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
  session: {
    expiresIn: 86400,
    updateAge: 3600,
    cookieCache: {
      enabled: true,
      maxAge: 300,
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
