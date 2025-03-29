import { useTransition } from "react";

import { passkeyClient } from "better-auth/client/plugins";
import { oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_VERCEL_URL;

const authClient = createAuthClient({
  baseURL: baseUrl,
  plugins: [
    passkeyClient(),
    oneTapClient({
      clientId: "",
      context: "signin",
    }),
  ],
});

export const { useSession, signIn, signUp, passkey } = authClient;

export function signOut() {
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      authClient.signOut();
    });
  };

  return {
    pending,
    handleLogout,
  };
}
