import { createServerFn } from "@tanstack/react-start";

import { photoformPolarProducts } from "@/utils/polar";

export const getPrices = createServerFn().handler(async () => {
  const prices = await photoformPolarProducts();

  return prices;
});
