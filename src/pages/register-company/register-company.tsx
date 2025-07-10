/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, X, FileText, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    companyName: z.string().min(1, "Company name is required"),
    businessRegistrationNumber: z
      .string()
      .min(1, "Business registration number is required"),
    businessType: z.string().min(1, "Business type is required"),
    item: z.string().min(1, "Main product/service is required"),
    managementBusinessNumber: z
      .string()
      .min(1, "Management business number is required"),
    representativeName: z.string().min(1, "Representative name is required"),
    representativeMobile: z
      .string()
      .min(1, "Representative mobile number is required"),
    businessPhone: z.string().min(1, "Business phone number is required"),
    fax: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    photoRegistration: z
      .any()
      .refine((file) => file?.length > 0, "Photo registration is required"),
    businessRegistrationCertificate: z
      .any()
      .refine(
        (file) => file?.length > 0,
        "Business registration certificate is required"
      ),
    managementBusinessRegistrationCertificate: z
      .any()
      .refine(
        (file) => file?.length > 0,
        "Management business registration certificate is required"
      ),
    smallMediumBusinessConfirmation: z
      .any()
      .refine(
        (file) => file?.length > 0,
        "Small and medium-sized business confirmation certificate is required"
      ),
    localTaxPaymentCertificate: z
      .any()
      .refine(
        (file) => file?.length > 0,
        "Local tax payment certificate is required"
      ),
    nationalTaxPaymentCertificate: z
      .any()
      .refine(
        (file) => file?.length > 0,
        "National tax payment certificate is required"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

interface FileUploadProps {
  label: string;
  name: keyof FormData;
  form: any;
  required?: boolean;
}

function FileUpload({ label, name, form, required = true }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setError("");

    if (!selectedFile) {
      setFile(null);
      form.setValue(name, null);
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Please upload a PDF, JPG, or PNG file");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
    form.setValue(name, [selectedFile]);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    form.setValue(name, null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {!file ? (
        <div className="relative">
          <Input
            id={name}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <Label
            htmlFor={name}
            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
          >
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Click to upload file</p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
          </Label>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {file.type.startsWith("image/") ? (
                  <ImageIcon className="h-8 w-8 text-blue-500" />
                ) : (
                  <FileText className="h-8 w-8 text-red-500" />
                )}
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
      <p className="text-xs text-gray-500">Max 5 MB</p>
    </div>
  );
}

export const RegisterCompanyPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      businessRegistrationNumber: "",
      businessType: "",
      item: "",
      managementBusinessNumber: "",
      representativeName: "",
      representativeMobile: "",
      businessPhone: "",
      fax: "",
      address: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form data:", data);

    // toast({
    //   title: "Registration Successful!",
    //   description: "Your company registration has been submitted successfully.",
    // });

    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Register Your Company
              </h1>
              <p className="text-gray-600 mt-2">
                Complete the form below to register your company with all
                required documentation.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                        Account Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="company@example.com"
                                  type="email"
                                  autoFocus
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div></div>
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Minimum 6 characters"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Confirm your password"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                        Company Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your Company Ltd."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessRegistrationNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Business Registration Number *
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="123-45-67890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Type *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select business type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="corporation">
                                    Corporation
                                  </SelectItem>
                                  <SelectItem value="llc">
                                    Limited Liability Company
                                  </SelectItem>
                                  <SelectItem value="partnership">
                                    Partnership
                                  </SelectItem>
                                  <SelectItem value="sole-proprietorship">
                                    Sole Proprietorship
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="item"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Main Product/Service *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Software development, Manufacturing, etc."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="managementBusinessNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Management Business Number *
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="987-65-43210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Representative Information */}
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                        Representative Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="representativeName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Representative Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="representativeMobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Representative Mobile Phone *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  type="tel"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Phone Number *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 987-6543"
                                  type="tel"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="fax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>FAX</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 111-2222"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Address *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="123 Business Street, City, State, ZIP Code"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* File Uploads */}
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                        Required Documents
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FileUpload
                          label="Photo Registration"
                          name="photoRegistration"
                          form={form}
                        />
                        <FileUpload
                          label="Business Registration Certificate"
                          name="businessRegistrationCertificate"
                          form={form}
                        />
                        <FileUpload
                          label="Management Business Registration Certificate"
                          name="managementBusinessRegistrationCertificate"
                          form={form}
                        />
                        <FileUpload
                          label="Small and Medium-Sized Business Confirmation Certificate"
                          name="smallMediumBusinessConfirmation"
                          form={form}
                        />
                        <FileUpload
                          label="Local Tax Payment Certificate"
                          name="localTaxPaymentCertificate"
                          form={form}
                        />
                        <FileUpload
                          label="National Tax Payment Certificate"
                          name="nationalTaxPaymentCertificate"
                          form={form}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={!form.formState.isValid || isSubmitting}
                        className="w-full md:w-auto md:min-w-[200px]"
                        size="lg"
                      >
                        {isSubmitting ? "Registering..." : "Register Company"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
