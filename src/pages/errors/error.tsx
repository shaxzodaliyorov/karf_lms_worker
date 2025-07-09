/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

/**
 * A drop‑in replacement for the Ant Design `Result` error page
 * re‑implemented with **shadcn/ui** + Tailwind.
 */
export const ErrorPage = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.status && [400, 403, 404, 500, 503].includes(error.status)) {
      navigate(`/errors/${error.status}`, { replace: true });
    }
  }, [error, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Oops!</CardTitle>
          <CardDescription>
            Sorry, an unexpected error has occurred.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-base font-medium">
            The page you tried to open has the following error:
          </p>
          <p className="rounded-md bg-muted p-3 text-sm font-semibold">
            {error?.statusText || error?.message}
          </p>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button onClick={() => navigate("/")} className="gap-1">
            <ArrowLeft size={16} /> Back
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            className="gap-1"
          >
            <RefreshCw size={16} /> Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
