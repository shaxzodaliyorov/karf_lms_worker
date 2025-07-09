/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, User, Lock, Mail } from "lucide-react";

// Profile form schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
});

// Password form schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Please enter your current password"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export const SettingsPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (_data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //   toast({
      //     title: "Profile updated",
      //     description: "Your information has been successfully updated.",
      //   });
    } catch (error: any) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to update your information.",
      //     variant: "destructive",
      //   });
    }
  };

  const onPasswordSubmit = async (_data: PasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      passwordForm.reset();
      //   toast({
      //     title: "Password updated",
      //     description: "Your password has been successfully updated.",
      //   });
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to update your password.",
      //     variant: "destructive",
      //   });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and profile information
          </p>
        </div>

        <Separator />

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your name and email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Controller
                    name="name"
                    control={profileForm.control}
                    render={({ field, fieldState }) => (
                      <div>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id="name"
                            placeholder="Enter your name"
                            className={`pl-10 ${
                              fieldState.error
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                            }`}
                          />
                        </div>
                        {fieldState.error && (
                          <p className="text-sm text-destructive mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="email"
                    control={profileForm.control}
                    render={({ field, fieldState }) => (
                      <div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            className={`pl-10 ${
                              fieldState.error
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                            }`}
                          />
                        </div>
                        {fieldState.error && (
                          <p className="text-sm text-destructive mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={profileForm.formState.isSubmitting}
                className="w-full md:w-auto"
              >
                {profileForm.formState.isSubmitting
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Controller
                  name="currentPassword"
                  control={passwordForm.control}
                  render={({ field, fieldState }) => (
                    <div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          className={`pl-10 pr-10 ${
                            fieldState.error
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {fieldState.error && (
                        <p className="text-sm text-destructive mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Controller
                    name="newPassword"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter your new password"
                            className={`pl-10 pr-10 ${
                              fieldState.error
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                            }`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {fieldState.error && (
                          <p className="text-sm text-destructive mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Controller
                    name="confirmPassword"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            className={`pl-10 pr-10 ${
                              fieldState.error
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                            }`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {fieldState.error && (
                          <p className="text-sm text-destructive mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">
                  Password requirements:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• At least 8 characters</li>
                  <li>• Upper and lowercase letters</li>
                  <li>• At least one number</li>
                  <li>• Special characters recommended</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={passwordForm.formState.isSubmitting}
                className="w-full md:w-auto"
              >
                {passwordForm.formState.isSubmitting
                  ? "Updating..."
                  : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
