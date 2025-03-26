import { createEnv } from "@t3-oss/env-core";
import { vercel } from "@t3-oss/env-core/presets-zod";
import { string } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: string().url(),
    POLAR_WEBHOOK_SECRET: string(),
    POLAR_ACCESS_TOKEN: string(),
    POLAR_ORGANIZATION_ID: string(),
    GOOGLE_CLIENT_ID: string(),
    GOOGLE_CLIENT_SECRET: string(),
  },
  extends: [vercel()],
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
