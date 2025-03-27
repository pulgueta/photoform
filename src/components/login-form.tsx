import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "@/lib/auth-client";

export const LoginForm = () => {
  const googleLogin = async () => {
    const res = await signIn.social({
      provider: "google",
    });
  };

  const passkeyLogin = async () => {
    await signIn.passkey();
  };

  return (
    <Card className="w-full md:max-w-md">
      <CardHeader>
        <CardTitle className="text-balance text-center">
          Log in to unleash the power of AI photoshoots
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button fullWidth onClick={googleLogin}>
          Continue with Google
        </Button>
        <Button fullWidth onClick={passkeyLogin}>
          Continue with Passkey
        </Button>
      </CardContent>
    </Card>
  );
};
