"use client";

import {
  Award,
  Building,
  FileText,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Plus,
  CalendarIcon,
} from "lucide-react";
import { CiCalendar } from "react-icons/ci";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import MultiFileUpload from "@/components/file-upload/file-upload";
type FormValues = {
  language: string;
  issueInstitution: string;
  issueDate: Date | undefined;
  proficiencyLevel: string;
  file: File[];
};

export const ProfessionalCertificate = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);

  const {
    control: addControl,
    // register: addRegister,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
  } = useForm<FormValues>({
    defaultValues: {
      file: [],
      issueInstitution: "",
      issueDate: undefined,
      language: "",
      proficiencyLevel: "",
    },
  });

  const {
    control: editControl,

    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
  } = useForm<FormValues>({
    defaultValues: {
      language: "",
      issueDate: undefined,
      proficiencyLevel: "",
      file: [],
      issueInstitution: "",
    },
  });

  const onAddSubmit = (data: FormValues) => {
    console.log("Add Data:", data);
  };

  const onEditSubmit = (data: FormValues) => {
    console.log("Edit Data:", data);
  };
  const professionalCertificates = [
    {
      id: 1,
      certificateType: "Project Management Professional (PMP)",
      issuingInstitution: "Project Management Institute",
      issueDate: "15/06/2023",
      status: "Active",
      documents: [{ name: "PMP_Certificate.pdf", size: "1.8 MB", type: "pdf" }],
    },
    {
      id: 2,
      certificateType: "Microsoft Azure Fundamentals",
      issuingInstitution: "Microsoft Corporation",
      issueDate: "22/03/2023",
      status: "Active",
      documents: [
        {
          name: "Azure_Fundamentals_Certificate.pdf",
          size: "1.2 MB",
          type: "pdf",
        },
      ],
    },
    {
      id: 3,
      certificateType: "Certified Scrum Master",
      issuingInstitution: "Scrum Alliance",
      issueDate: "10/01/2023",
      status: "Active",
      documents: [
        { name: "Scrum_Master_Certificate.pdf", size: "2.1 MB", type: "pdf" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "expired":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "expired":
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const totalCertificates = professionalCertificates.length;
  const activeCertificates = professionalCertificates.filter(
    (cert) => cert.status === "Active"
  ).length;
  const totalDocuments = professionalCertificates.reduce(
    (acc, cert) => acc + cert.documents.length,
    0
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  <Award className="h-5 w-5 text-blue-600" />
                  Professional Certificate
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Professional certifications and credentials
                </p>
              </div>

              {/* Modal Trigger */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Professional Certificate</DialogTitle>
                  </DialogHeader>

                  <form
                    onSubmit={handleAddSubmit(onAddSubmit)}
                    className=" grid gap-2 py-4 max-h-[80vh] overflow-y-auto "
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <div className="space-y-2">
                      <Label>Language</Label>

                      <Controller
                        name="language"
                        control={addControl}
                        rules={{ required: "Language is required!" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                addErrors.language
                                  ? "border-red-500 focus:ring-red-500"
                                  : ""
                              }`}
                            >
                              <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="bachelor">UZ </SelectItem>
                                <SelectItem value="master">Eng </SelectItem>
                                <SelectItem value="phd">Ru</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {addErrors.language && (
                        <p className="text-red-500">
                          {addErrors.language.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Issuing Institution</Label>

                      <Controller
                        name="issueInstitution"
                        control={addControl}
                        rules={{ required: "Issuing Institution is required!" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                addErrors.issueInstitution
                                  ? "border-red-500 focus:ring-red-500"
                                  : ""
                              }`}
                            >
                              <SelectValue placeholder="Select Issuing Institution" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="bachelor">
                                  Graduated{" "}
                                </SelectItem>
                                <SelectItem value="master">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="phd">PhD</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {addErrors.issueInstitution && (
                        <p className="text-red-500">
                          {addErrors.issueInstitution.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="dateOfBirth" className="px-1">
                        Issue Date
                      </Label>

                      <Controller
                        name="issueDate"
                        control={addControl}
                        rules={{ required: "Start date is required" }}
                        render={({ field }) => (
                          <Popover
                            open={startDateOpen}
                            onOpenChange={setStartDateOpen}
                          >
                            <PopoverTrigger asChild className="h-[40px]">
                              <Button
                                variant="outline"
                                id="dateOfBirth"
                                className={`w-full justify-between font-normal ${
                                  addErrors.issueDate ? "border-red-500" : ""
                                }`}
                              >
                                {field.value instanceof Date
                                  ? field.value.toLocaleDateString()
                                  : "Select date"}
                                <CalendarIcon
                                  color="gray"
                                  className="w-4 h-4 ml-2"
                                />{" "}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setStartDateOpen(false);
                                }}
                                captionLayout="dropdown"
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />

                      {addErrors.issueDate && (
                        <span className="text-red-500 text-sm px-1">
                          {addErrors.issueDate.message}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Controller
                        name="file"
                        control={addControl}
                        rules={{ required: "Please upload at least one file" }}
                        render={({ field, fieldState }) => (
                          <MultiFileUpload
                            maxSizeMB={10}
                            onFileSelect={(files) => field.onChange(files)}
                            error={fieldState.error?.message}
                          />
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-blue-700 w-25 hover:bg-blue-600"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* Certificate Summary Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Total Certificates
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {totalCertificates}
                </p>
              </div>

              <div className="rounded-lg border bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Active Certificates
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {activeCertificates}
                </p>
              </div>

              <div className="rounded-lg border bg-purple-50 p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">
                    Documents
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-1">
                  {totalDocuments}
                </p>
              </div>
            </div>

            <Separator />

            {/* Certificates List */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Certificate Details
              </h3>

              {professionalCertificates.map((certificate) => (
                <div key={certificate.id} className="relative">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Timeline dot */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
                          <Award className="h-6 w-6 text-blue-600" />
                        </div>

                        {/* Certificate details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {certificate.certificateType}
                            </h4>
                            <Badge
                              variant="outline"
                              className={getStatusColor(certificate.status)}
                            >
                              {getStatusIcon(certificate.status)}
                              {certificate.status}
                            </Badge>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Issuing Institution
                              </p>
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-blue-500" />
                                <p className="text-sm text-gray-900 font-medium">
                                  {certificate.issuingInstitution}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Issue Date
                              </p>
                              <div className="flex items-center gap-2">
                                <CiCalendar className="h-4 w-4 text-green-500" />
                                <p className="text-sm text-gray-900">
                                  {certificate.issueDate}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Documents Section */}
                          {certificate.documents.length > 0 && (
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-gray-700">
                                Certificate Documents
                              </p>
                              <div className="grid gap-2">
                                {certificate.documents.map((doc, docIndex) => (
                                  <div
                                    key={docIndex}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                                  >
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-red-500" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          {doc.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {doc.size}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                      >
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <PiDotsThreeOutlineVerticalFill />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="mr-4">
                            <DropdownMenuGroup>
                              <Dialog
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                              >
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <TbEdit size={16} />
                                    <span className="ml-2">Edit</span>
                                  </DropdownMenuItem>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-[500px] p-6">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Edit Professional Certificate
                                    </DialogTitle>
                                  </DialogHeader>

                                  <form
                                    onSubmit={handleEditSubmit(onEditSubmit)}
                                    className=" grid gap-2 py-4 max-h-[80vh] overflow-y-auto "
                                    style={{
                                      scrollbarWidth: "none",
                                      msOverflowStyle: "none",
                                    }}
                                  >
                                    <div className="space-y-2">
                                      <Label>Language</Label>

                                      <Controller
                                        name="language"
                                        control={editControl}
                                        rules={{
                                          required: "Language is required!",
                                        }}
                                        render={({ field }) => (
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <SelectTrigger
                                              className={`w-full ${
                                                editErrors.language
                                                  ? "border-red-500 focus:ring-red-500"
                                                  : ""
                                              }`}
                                            >
                                              <SelectValue placeholder="Select Language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectGroup>
                                                <SelectItem value="bachelor">
                                                  UZ{" "}
                                                </SelectItem>
                                                <SelectItem value="master">
                                                  Eng{" "}
                                                </SelectItem>
                                                <SelectItem value="phd">
                                                  Ru
                                                </SelectItem>
                                              </SelectGroup>
                                            </SelectContent>
                                          </Select>
                                        )}
                                      />
                                      {editErrors.language && (
                                        <p className="text-red-500">
                                          {editErrors.language.message}
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Issuing Institution</Label>

                                      <Controller
                                        name="issueInstitution"
                                        control={editControl}
                                        rules={{
                                          required:
                                            "Issuing Institution is required!",
                                        }}
                                        render={({ field }) => (
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <SelectTrigger
                                              className={`w-full ${
                                                editErrors.issueInstitution
                                                  ? "border-red-500 focus:ring-red-500"
                                                  : ""
                                              }`}
                                            >
                                              <SelectValue placeholder="Select Issuing Institution" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectGroup>
                                                <SelectItem value="bachelor">
                                                  Graduated{" "}
                                                </SelectItem>
                                                <SelectItem value="master">
                                                  In Progress
                                                </SelectItem>
                                                <SelectItem value="phd">
                                                  PhD
                                                </SelectItem>
                                              </SelectGroup>
                                            </SelectContent>
                                          </Select>
                                        )}
                                      />
                                      {editErrors.issueInstitution && (
                                        <p className="text-red-500">
                                          {editErrors.issueInstitution.message}
                                        </p>
                                      )}
                                    </div>

                                    <div className="grid gap-3">
                                      <Label
                                        htmlFor="dateOfBirth"
                                        className="px-1"
                                      >
                                        Issue Date
                                      </Label>

                                      <Controller
                                        name="issueDate"
                                        control={addControl}
                                        rules={{
                                          required: "Start date is required",
                                        }}
                                        render={({ field }) => (
                                          <Popover
                                            open={startDateOpen}
                                            onOpenChange={setStartDateOpen}
                                          >
                                            <PopoverTrigger
                                              asChild
                                              className="h-[40px] py-2"
                                            >
                                              <Button
                                                variant="outline"
                                                id="dateOfBirth"
                                                className={`w-full justify-between font-normal ${
                                                  editErrors.issueDate
                                                    ? "border-red-500"
                                                    : ""
                                                }`}
                                              >
                                                {field.value instanceof Date
                                                  ? field.value.toLocaleDateString()
                                                  : "Select date"}
                                                <CalendarIcon
                                                  color="gray"
                                                  className="w-4 h-4 ml-2"
                                                />{" "}
                                              </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                              className="w-auto overflow-hidden p-0"
                                              align="start"
                                            >
                                              <Calendar
                                                mode="single"
                                                selected={
                                                  field.value || undefined
                                                }
                                                onSelect={(date) => {
                                                  field.onChange(date);
                                                  setStartDateOpen(false);
                                                }}
                                                captionLayout="dropdown"
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        )}
                                      />

                                      {editErrors.issueDate && (
                                        <span className="text-red-500 text-sm px-1">
                                          {editErrors.issueDate.message}
                                        </span>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Controller
                                        name="file"
                                        control={editControl}
                                        rules={{
                                          required:
                                            "Please upload at least one file",
                                        }}
                                        render={({ field, fieldState }) => (
                                          <MultiFileUpload
                                            maxSizeMB={10}
                                            onFileSelect={(files) =>
                                              field.onChange(files)
                                            }
                                            error={fieldState.error?.message}
                                          />
                                        )}
                                      />
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        type="submit"
                                        className="bg-blue-700 w-25 hover:bg-blue-600"
                                      >
                                        <Plus className="h-4 w-4 mr-1" /> Add
                                      </Button>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <RiDeleteBinLine size={16} />
                                    <span className="ml-2">Delete</span>
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure you want to delete?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. The contact
                                      will be permanently deleted.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="h-10">
                                      <div className="flex items-center gap-2">
                                        <MdOutlineCancel size={16} /> No
                                      </div>
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700 h-10">
                                      <div className="flex items-center gap-2">
                                        <AiOutlineCheck size={16} /> Yes, Delete
                                      </div>
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
