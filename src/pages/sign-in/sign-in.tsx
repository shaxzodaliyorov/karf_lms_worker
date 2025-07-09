/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/common";
import { TextField } from "@/common/text-field/text-field";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (_data: SignInFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSubmitted(true);

      setTimeout(() => {
        navigate("/worker/personal-info");
      }, 2000);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f7f8fc] to-[#e6ecff] p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="p-6 pb-4">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-semibold tracking-wide text-center">
              Welcome to KARIF
            </h1>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2">
          {!isSubmitted ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      control={form.control}
                      placeholder="you@example.com"
                      label="Email address"
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <TextField
                      control={form.control}
                      placeholder="••••••••"
                      label="Password"
                      type="password"
                      {...field}
                    />
                  )}
                />

                <Button type="submit" className="w-full" loading={isSubmitting}>
                  Sign in
                </Button>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/select-role" className="text-primary">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          ) : (
            <div
              className="flex flex-col items-center space-y-4 py-8 animate-in fade-in duration-500"
              aria-live="polite"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Signed in successfully — redirecting…
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {!isSubmitted && (
          <CardFooter className="p-6 pt-0">
            <div className="w-full text-center">
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </CardFooter>
        )}
      </Card>

      <footer className="mt-8">
        <p className="text-xs text-muted-foreground">
          © 2025 KARIF. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
