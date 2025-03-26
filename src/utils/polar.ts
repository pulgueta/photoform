import { Polar } from "@polar-sh/sdk";

import { env } from "./env";

interface BetterAuthPolarProduct {
  productId: string;
  slug: string;
}

export const polar = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: process.env.NODE_ENV === "development" ? "sandbox" : "production",
});

export async function photoformPolarProducts(): Promise<
  BetterAuthPolarProduct[]
> {
  const photophorm = await polar.products.list({
    isRecurring: true,
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
