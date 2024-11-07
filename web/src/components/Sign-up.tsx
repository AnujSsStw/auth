import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function SignUp({
  setIsLogin,
}: {
  setIsLogin: (login: boolean) => void;
}) {
  const [agreed, setAgreed] = useState<any>(false);
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get the form data
    const form = e.target as HTMLFormElement;
    const data = new FormData(e.target as HTMLFormElement);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirm-password") as string;
    console.log(name, email, password, confirmPassword, data);

    return;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Call the signup function
    const { data: userData, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: undefined,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setLoading(false);
        },
      }
    );

    console.log(userData, error);
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-lg text-muted-foreground">
            Sign up to get started
          </p>
        </div>
        <Card className="p-6">
          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={setAgreed}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    terms of service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    privacy policy
                  </a>
                </label>
              </div>
              <Button className="w-full" type="submit" disabled={!agreed}>
                Sign Up
              </Button>
            </div>
          </form>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(true);
            }}
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </a>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
