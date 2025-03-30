import { createEnv } from "@t3-oss/env-core";
import { vercel } from "@t3-oss/env-core/presets-zod";
import { string, enum as zodEnum } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: string(),
    BETTER_AUTH_URL: string().url(),
    DATABASE_URL: string().url(),
    POLAR_WEBHOOK_SECRET: string(),
    POLAR_ACCESS_TOKEN: string(),
    POLAR_ORGANIZATION_ID: string(),
    GOOGLE_CLIENT_ID: string(),
    GOOGLE_CLIENT_SECRET: string(),
    NODE_ENV: zodEnum(["development", "production"]).default("development"),
  },
  extends: [vercel()],
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
