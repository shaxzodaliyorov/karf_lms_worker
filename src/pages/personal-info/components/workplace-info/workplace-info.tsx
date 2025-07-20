import {
  Briefcase,
  Building,
  Clock,
  Target,
  User,
  FileText,
  Download,
  Eye,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useState } from "react";
import { TbEdit } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  position: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  field: string;
  workingPeriod: string;
  proficiencyLevel: string;
  file: File[];
};

export const WorkplaceInformation = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const {
    control: addControl,
    register: addRegister,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
  } = useForm<FormValues>({
    defaultValues: {
      file: [],
      position: "",
      field: "",
      startDate: undefined,
      endDate: undefined,
      workingPeriod: "",
      language: "",
      proficiencyLevel: "",
    },
  });

  const {
    control: editControl,
    register: editRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
  } = useForm<FormValues>({
    defaultValues: {
      language: "",
      field: "",
      startDate: undefined,
      endDate: undefined,
      proficiencyLevel: "",
      workingPeriod: "",
      file: [],
      position: "",
    },
  });

  const onAddSubmit = (data: FormValues) => {
    console.log("Add Data:", data);
  };

  const onEditSubmit = (data: FormValues) => {
    console.log("Edit Data:", data);
  };
  const workplaceInformation = [
    {
      id: 1,
      companyName: "Tech Solutions Inc.",
      startDate: "15/01/2022",
      workingPeriodYears: "2.5",
      field: "Information Technology",
      position: "Senior Software Developer",
      documents: [
        {
          name: "Employment_Letter_TechSolutions.pdf",
          size: "1.4 MB",
          type: "pdf",
        },
        {
          name: "Work_Experience_Certificate.pdf",
          size: "0.9 MB",
          type: "pdf",
        },
      ],
    },
    {
      id: 2,
      companyName: "Digital Marketing Agency",
      startDate: "10/06/2019",
      workingPeriodYears: "2.8",
      field: "Digital Marketing",
      position: "Marketing Manager",
      documents: [
        {
          name: "Marketing_Experience_Letter.pdf",
          size: "1.1 MB",
          type: "pdf",
        },
      ],
    },
    {
      id: 3,
      companyName: "StartUp Innovations",
      startDate: "05/03/2017",
      workingPeriodYears: "2.2",
      field: "Product Development",
      position: "Product Manager",
      documents: [
        {
          name: "Product_Manager_Certificate.pdf",
          size: "1.6 MB",
          type: "pdf",
        },
        { name: "Project_Portfolio.pdf", size: "3.2 MB", type: "pdf" },
      ],
    },
  ];

  const totalWorkplaces = workplaceInformation.length;
  const totalExperience = workplaceInformation.reduce(
    (acc, work) => acc + Number.parseFloat(work.workingPeriodYears),
    0
  );
  const totalDocuments = workplaceInformation.reduce(
    (acc, work) => acc + work.documents.length,
    0
  );
  const uniqueFields = [
    ...new Set(workplaceInformation.map((work) => work.field)),
  ].length;

  // Calculate end date based on start date and working period
  const calculateEndDate = (startDate: string, workingPeriod: string) => {
    const start = new Date(startDate.split("/").reverse().join("-"));
    const years = Number.parseFloat(workingPeriod);
    const end = new Date(start);
    end.setFullYear(start.getFullYear() + Math.floor(years));
    end.setMonth(start.getMonth() + Math.round((years % 1) * 12));
    return end.toLocaleDateString("en-GB");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto ">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Workplace Information
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Professional work experience and employment history
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Work Experience Timeline</DialogTitle>
                  </DialogHeader>

                  <form
                    onSubmit={handleAddSubmit(onAddSubmit)}
                    className=" grid gap-2 py-4 max-h-[80vh]  "
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <div className="space-y-2">
                      <Label>Position</Label>

                      <Controller
                        name="position"
                        control={addControl}
                        rules={{ required: "Position is required!" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                addErrors.position
                                  ? "border-red-500 focus:ring-red-500"
                                  : ""
                              }`}
                            >
                              <SelectValue placeholder="Select Position" />
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
                      {addErrors.position && (
                        <p className="text-red-500">
                          {addErrors.position.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Working Period</Label>

                      <Controller
                        name="workingPeriod"
                        control={addControl}
                        rules={{ required: "Working Peroid is required!" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                addErrors.workingPeriod
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
                      {addErrors.workingPeriod && (
                        <p className="text-red-500">
                          {addErrors.workingPeriod.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Field</Label>

                      <Controller
                        name="field"
                        control={addControl}
                        rules={{ required: "Field is required!" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                addErrors.field
                                  ? "border-red-500 focus:ring-red-500"
                                  : ""
                              }`}
                            >
                              <SelectValue placeholder="Select Field" />
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
                      {addErrors.field && (
                        <p className="text-red-500">
                          {addErrors.field.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="dateOfBirth" className="px-1">
                        Start Date
                      </Label>

                      <Controller
                        name="startDate"
                        control={addControl}
                        rules={{ required: "Start date is required" }}
                        render={({ field }) => (
                          <Popover
                            open={startDateOpen}
                            onOpenChange={setStartDateOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="dateOfBirth"
                                className={`w-full h-10 justify-between font-normal ${
                                  addErrors.startDate ? "border-red-500" : ""
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

                      {addErrors.startDate && (
                        <span className="text-red-500 text-sm px-1">
                          {addErrors.startDate.message}
                        </span>
                      )}
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="graduationDate" className="px-1">
                        End Date
                      </Label>

                      <Controller
                        name="endDate"
                        control={addControl}
                        rules={{
                          required: "Graduation is required",
                        }}
                        render={({ field }) => (
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="graduationDate"
                                className={`w-full h-10 justify-between font-normal ${
                                  addErrors.endDate ? "border-red-500" : ""
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
                                className=""
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setOpen(false);
                                }}
                                captionLayout="dropdown"
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />

                      {addErrors.endDate && (
                        <span className="text-red-500 text-sm px-1">
                          {addErrors.endDate.message}
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
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Input
                        {...addRegister("language", {
                          required: "Language is required",
                        })}
                        placeholder="e.g. Spanish "
                        className={`w-full border ${
                          addErrors.language ? "border-red-500 " : ""
                        }`}
                      />
                      {addErrors.language && (
                        <p className="text-red-500">
                          {addErrors.language.message}
                        </p>
                      )}
                    </div>
                    <DialogFooter className="py-4">
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
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Total Workplaces
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {totalWorkplaces}
                </p>
              </div>

              <div className="rounded-lg border bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Total Experience
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {totalExperience.toFixed(1)}y
                </p>
              </div>

              <div className="rounded-lg border bg-purple-50 p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">
                    Fields
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-1">
                  {uniqueFields}
                </p>
              </div>

              <div className="rounded-lg border bg-orange-50 p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    Documents
                  </span>
                </div>
                <p className="text-2xl font-bold text-orange-900 mt-1">
                  {totalDocuments}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Work Experience Timeline
              </h3>

              {workplaceInformation.map((workplace) => (
                <div key={workplace.id} className="relative">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Timeline dot */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
                          <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>

                        {/* Workplace details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {workplace.companyName}
                            </h4>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {workplace.workingPeriodYears} years
                            </Badge>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Position
                              </p>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-500" />
                                <p className="text-sm text-gray-900 font-medium">
                                  {workplace.position}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Field
                              </p>
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-green-500" />
                                <p className="text-sm text-gray-900">
                                  {workplace.field}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Working Period
                              </p>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-purple-500" />
                                <p className="text-sm text-gray-900">
                                  {workplace.workingPeriodYears} years
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Start Date
                              </p>
                              <div className="flex items-center gap-2">
                                <CiCalendar className="h-4 w-4 text-orange-500" />
                                <p className="text-sm text-gray-900">
                                  {workplace.startDate}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                End Date
                              </p>
                              <div className="flex items-center gap-2">
                                <CiCalendar className="h-4 w-4 text-red-500" />
                                <p className="text-sm text-gray-900">
                                  {calculateEndDate(
                                    workplace.startDate,
                                    workplace.workingPeriodYears
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Company
                              </p>
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-indigo-500" />
                                <p className="text-sm text-gray-900">
                                  {workplace.companyName}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Documents Section */}
                          {workplace.documents.length > 0 && (
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-gray-700">
                                Employment Documents
                              </p>
                              <div className="grid gap-2 md:grid-cols-2">
                                {workplace.documents.map((doc, docIndex) => (
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

                                <DialogContent className="sm:max-w-[500px] p-6 overflow-y-auto ">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Edit Foreign Experience
                                    </DialogTitle>
                                  </DialogHeader>

                                  <form
                                    onSubmit={handleEditSubmit(onEditSubmit)}
                                    className=" grid gap-2 py-4 max-h-[80vh] "
                                    style={{
                                      scrollbarWidth: "none",
                                      msOverflowStyle: "none",
                                    }}
                                  >
                                    <div className="space-y-2">
                                      <Label>Position</Label>

                                      <Controller
                                        name="position"
                                        control={editControl}
                                        rules={{
                                          required: "Position is required!",
                                        }}
                                        render={({ field }) => (
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <SelectTrigger
                                              className={`w-full ${
                                                editErrors.position
                                                  ? "border-red-500 focus:ring-red-500"
                                                  : ""
                                              }`}
                                            >
                                              <SelectValue placeholder="Select Position" />
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
                                      {editErrors.position && (
                                        <p className="text-red-500">
                                          {editErrors.position.message}
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Working Period</Label>

                                      <Controller
                                        name="workingPeriod"
                                        control={editControl}
                                        rules={{
                                          required:
                                            "Working Peroid is required!",
                                        }}
                                        render={({ field }) => (
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <SelectTrigger
                                              className={`w-full ${
                                                editErrors.workingPeriod
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
                                      {editErrors.workingPeriod && (
                                        <p className="text-red-500">
                                          {editErrors.workingPeriod.message}
                                        </p>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      <Label>Field</Label>

                                      <Controller
                                        name="field"
                                        control={editControl}
                                        rules={{
                                          required: "Field is required!",
                                        }}
                                        render={({ field }) => (
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <SelectTrigger
                                              className={`w-full ${
                                                editErrors.field
                                                  ? "border-red-500 focus:ring-red-500"
                                                  : ""
                                              }`}
                                            >
                                              <SelectValue placeholder="Select Field" />
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
                                      {editErrors.field && (
                                        <p className="text-red-500">
                                          {editErrors.field.message}
                                        </p>
                                      )}
                                    </div>

                                    <div className="grid gap-3">
                                      <Label
                                        htmlFor="dateOfBirth"
                                        className="px-1"
                                      >
                                        Start Date
                                      </Label>

                                      <Controller
                                        name="startDate"
                                        control={editControl}
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
                                              className="h-[40px]"
                                            >
                                              <Button
                                                variant="outline"
                                                id="dateOfBirth"
                                                className={`w-full h-10 justify-between font-normal ${
                                                  editErrors.startDate
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

                                      {editErrors.startDate && (
                                        <span className="text-red-500 text-sm px-1">
                                          {editErrors.startDate.message}
                                        </span>
                                      )}
                                    </div>

                                    <div className="grid gap-3">
                                      <Label
                                        htmlFor="graduationDate"
                                        className="px-1"
                                      >
                                        End Date
                                      </Label>

                                      <Controller
                                        name="endDate"
                                        control={editControl}
                                        rules={{
                                          required: "Graduation is required",
                                        }}
                                        render={({ field }) => (
                                          <Popover
                                            open={open}
                                            onOpenChange={setOpen}
                                          >
                                            <PopoverTrigger
                                              asChild
                                              className="h-[40px]"
                                            >
                                              <Button
                                                variant="outline"
                                                id="graduationDate"
                                                className={`w-full h-10 justify-between font-normal ${
                                                  editErrors.endDate
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
                                                className=""
                                                mode="single"
                                                selected={
                                                  field.value || undefined
                                                }
                                                onSelect={(date) => {
                                                  field.onChange(date);
                                                  setOpen(false);
                                                }}
                                                captionLayout="dropdown"
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        )}
                                      />

                                      {editErrors.endDate && (
                                        <span className="text-red-500 text-sm px-1">
                                          {editErrors.endDate.message}
                                        </span>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      <Controller
                                        name="file"
                                        control={addControl}
                                        rules={{
                                          required:
                                            "At least one file is required",
                                        }}
                                        render={({ field }) => (
                                          <div className="grid gap-2">
                                            <MultiFileUpload
                                              maxSizeMB={10}
                                              onFileSelect={(files: File[]) =>
                                                field.onChange(files)
                                              }
                                            />
                                            {addErrors.file && (
                                              <p className="text-red-500">
                                                {addErrors.file.message}
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Language</Label>
                                      <Input
                                        {...editRegister("language", {
                                          required: "Language is required",
                                        })}
                                        placeholder="e.g. Spanish "
                                        className={`w-full border ${
                                          editErrors.language
                                            ? "border-red-500 "
                                            : ""
                                        }`}
                                      />
                                      {editErrors.language && (
                                        <p className="text-red-500">
                                          {editErrors.language.message}
                                        </p>
                                      )}
                                    </div>
                                    <DialogFooter className="py-4">
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

            {/* Career Summary */}
            <div className="rounded-lg border-2 border-blue-100 bg-blue-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    Career Summary
                  </h3>
                  <p className="text-sm text-blue-700">
                    Professional work experience overview
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">
                      Total Experience:
                    </span>
                    <span className="text-sm text-blue-900 font-semibold">
                      {totalExperience.toFixed(1)} years
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">
                      Companies Worked:
                    </span>
                    <span className="text-sm text-blue-900">
                      {totalWorkplaces}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">
                      Industry Fields:
                    </span>
                    <span className="text-sm text-blue-900">
                      {uniqueFields}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">
                      Current Position:
                    </span>
                    <span className="text-sm text-blue-900">
                      {workplaceInformation[0]?.position}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">
                      Latest Company:
                    </span>
                    <span className="text-sm text-blue-900">
                      {workplaceInformation[0]?.companyName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">
                      Documents:
                    </span>
                    <span className="text-sm text-blue-900">
                      {totalDocuments} files
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
