import { Polar } from "@polar-sh/sdk";
import { object, string } from "zod";

import { env } from "./env.server";

interface BetterAuthPolarProduct {
  productId: string;
  slug: string;
}

export const polar = new Polar({
  // Keep track to see if this causes any issues by trying to access server environment variables from the client
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});

export const polarSearchParams = object({
  checkout_id: string(),
});

export async function betterAuthProducts(): Promise<BetterAuthPolarProduct[]> {
  const photophorm = await polar.products.list({
    organizationId: env.POLAR_ORGANIZATION_ID,
  });

  return photophorm.result.items.map((product) => ({
    productId: product.id,
    slug: product.name.toLowerCase().replace(/ /g, "-"),
  }));
}

export async function getPhotoformPolarDiscounts() {
  const discounts = await polar.discounts.list({
    organizationId: env.POLAR_ORGANIZATION_ID,
  });

  return discounts.result.items;
}

export async function photoformPolarProducts() {
  const photophorm = await polar.products.list({
    organizationId: env.POLAR_ORGANIZATION_ID,
  });

  return photophorm.result.items;
}
