import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Error404Page = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-background px-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <h2 className="text-6xl font-bold tracking-tight">404</h2>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
            Sorry, the page you visited does not exist.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button size="lg" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
