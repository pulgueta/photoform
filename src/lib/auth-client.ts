import { passkeyClient } from "better-auth/client/plugins";
import { oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { clientEnv } from "@/utils/env.client";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : clientEnv.VITE_BASE_URL;

const authClient = createAuthClient({
  baseURL: baseUrl,
  plugins: [
    passkeyClient(),
    oneTapClient({
      clientId: clientEnv.VITE_GOOGLE_CLIENT_ID,
    }),
  ],
});

export const { useSession, oneTap, signIn, signUp, signOut, passkey } =
  authClient;
