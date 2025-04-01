import { createEnv } from "@t3-oss/env-core";
import { string } from "zod";

export const clientEnv = createEnv({
  client: {
    VITE_BASE_URL: string().url(),
    VITE_GOOGLE_CLIENT_ID: string(),
  },
  clientPrefix: "VITE_",
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
