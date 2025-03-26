import { env } from "@/utils/env";
import { passkeyClient } from "better-auth/client/plugins";
import { oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: env.URL,
  plugins: [
    passkeyClient(),
    oneTapClient({
      clientId: "",
      context: "signin",
    }),
  ],
});

export const { useSession, signIn, signOut, signUp, passkey } = authClient;
