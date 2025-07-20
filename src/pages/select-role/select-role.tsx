import { Button } from "@/common";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Building2, Check, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const roleSchema = z.object({
  role: z.enum(["company", "agency", "worker"], {
    required_error: "Please select an account type to continue",
  }),
});

type RoleFormData = z.infer<typeof roleSchema>;

type RoleOption = {
  value: "company" | "agency" | "worker";
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
};

const roleOptions: RoleOption[] = [
  {
    value: "company",
    title: "Company",
    subtitle: "Manage your organization",
    icon: Building2,
  },
  {
    value: "agency",
    title: "Agency",
    subtitle: "Handle multiple clients",
    icon: Users,
  },
  {
    value: "worker",
    title: "Worker",
    subtitle: "Find and track jobs",
    icon: Briefcase,
  },
];

export const SelectRolePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: undefined,
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;
  const navigate = useNavigate();
  const selectedRole = watch("role");

  const onSubmit = async (data: RoleFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      console.log("Selected role:", data.role);
      setIsSubmitted(true);

      setTimeout(() => {
        console.log("Redirecting to registration form...");
        navigate("/auth/register-company");
      }, 2000);
    } catch (error) {
      console.error("Role selection error:", error);
    }
  };

  const handleRoleSelect = (role: "company" | "agency" | "worker") => {
    setValue("role", role, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f7f8fc] to-[#e6ecff] p-4">
      <div className="w-full max-w-4xl mx-auto">
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Select account type</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Tell us who you are to continue.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {roleOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedRole === option.value;

                    return (
                      <Card
                        key={option.value}
                        className={cn(
                          "rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer",
                          isSelected && "ring-2 ring-primary"
                        )}
                        onClick={() => handleRoleSelect(option.value)}
                      >
                        <CardHeader className="text-center pb-2">
                          <div className="mx-auto w-14 h-14 bg-muted rounded-full flex items-center justify-center p-3 mb-4">
                            <Icon className="w-8 h-8 text-foreground" />
                          </div>

                          <h3 className="text-lg font-semibold">
                            {option.title}
                          </h3>
                        </CardHeader>

                        <CardContent className="text-center pt-0">
                          <p className="text-sm text-muted-foreground">
                            {option.subtitle}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {errors.role && (
                  <div className="text-center">
                    <FormMessage>{errors.role.message}</FormMessage>
                  </div>
                )}

                <div className="flex justify-center">
                  <Button className="w-[80%]" type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <div
            className="flex flex-col items-center space-y-6 py-12 animate-in fade-in duration-500"
            aria-live="polite"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Great choice!</h2>
              <p className="text-sm text-muted-foreground">
                Redirecting to registration…
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
