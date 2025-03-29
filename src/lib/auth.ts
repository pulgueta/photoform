import { polar } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oneTap } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";

import { baseUrl, env } from "@/utils/env";
import { betterAuthProducts, polar as polarClient } from "@/utils/polar";
import { prisma } from "@/utils/prisma";

const auth = betterAuth({
  baseURL: baseUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
        products: await betterAuthProducts(),
        successUrl: "/success?checkout_id={CHECKOUT_ID}",
      },
      webhooks: {
        secret: env.POLAR_WEBHOOK_SECRET,
      },
    }),
  ],
});

export const { handler, api } = auth;
