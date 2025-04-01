import { env } from "@/utils/env.server";

export const app_name = "phormat";

export const app_url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${env.VERCEL_URL}`;
