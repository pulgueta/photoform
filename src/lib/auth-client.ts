import { env } from "@/utils/env";
import { passkeyClient } from "better-auth/client/plugins";
import { oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const localUrl = "http://localhost:3000";

const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "development"
      ? localUrl
      : `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`,
  plugins: [
    passkeyClient(),
    oneTapClient({
      clientId: "",
      context: "signin",
    }),
  ],
});

export const { useSession, signIn, signOut, signUp, passkey } = authClient;
