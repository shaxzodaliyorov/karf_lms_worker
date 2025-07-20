"use client";

import {
  GraduationCap,
  School,
  BookOpen,
  CalendarCheck,
  MapPin,
  Plus,
  CalendarIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
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
import { TbEdit } from "react-icons/tb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
type FormValues = {
  diploma: string;
  major: string;
  duration: string;
  location: string;
  startDate: Date | undefined;
  graduationDate: Date | undefined;
  gpa: string;
  profileImage: FileList;
};

export const College = () => {
  // const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);

  const {
    control: addControl,
    register: addRegister,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
  } = useForm<FormValues>();

  const {
    control: editControl,
    register: editRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
  } = useForm<FormValues>({
    defaultValues: {
      diploma: "",
      major: "",
      duration: "",
      location: "",
      startDate: undefined,
      graduationDate: undefined,
      gpa: "",
    },
  });

  const onAddSubmit = (data: FormValues) => {
    console.log("Add Data:", data);
  };

  const onEditSubmit = (data: FormValues) => {
    console.log("Edit Data:", data);
  };

  const educationHistory = [
    {
      id: 1,
      collegeName: "Harvard University",
      major: "Computer Science",
      degree: "Bachelor's Degree",
      startDate: "01/09/2016",
      graduationDate: "15/06/2020",
      location: "Cambridge, MA, USA",
      status: "Graduated",
      gpa: "3.8/4.0",
    },
    {
      id: 2,
      collegeName: "Stanford University",
      major: "Artificial Intelligence",
      degree: "Master's Degree",
      startDate: "01/09/2020",
      graduationDate: "15/06/2022",
      location: "Stanford, CA, USA",
      status: "Graduated",
      gpa: "3.9/4.0",
    },
    {
      id: 3,
      collegeName: "MIT",
      major: "Machine Learning",
      degree: "PhD",
      startDate: "01/09/2022",
      graduationDate: "Expected 2026",
      location: "Cambridge, MA, USA",
      status: "In Progress",
      gpa: "4.0/4.0",
    },
  ];

  // Calculate duration
  const calculateDuration = (startDate: string, endDate: string) => {
    if (endDate.includes("Expected")) {
      return "In Progress";
    }

    const start = new Date(startDate.split("/").reverse().join("-"));
    const end = new Date(endDate.split("/").reverse().join("-"));
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();

    if (months < 0) {
      return `${years - 1} years, ${12 + months} months`;
    }
    return `${years} years, ${months} months`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Graduated":
        return "bg-green-50 text-green-700 border-green-200";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getDegreeColor = (degree: string) => {
    switch (degree) {
      case "Bachelor's Degree":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Master's Degree":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "PhD":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full">
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Education History
              </CardTitle>
              <p className="text-sm 4-gray-600 mt-1">
                Complete academic background and qualifications
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[93vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Academic Journey</DialogTitle>
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
                    <Label>Diploma</Label>

                    <Controller
                      name="diploma"
                      control={addControl}
                      rules={{ required: "Diploma is required!" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              addErrors.diploma
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Select Diploma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="bachelor">
                                Bachelor's Degree
                              </SelectItem>
                              <SelectItem value="master">
                                Master's Degree
                              </SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {addErrors.diploma && (
                      <p className="text-red-500">
                        {addErrors.diploma.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Major</Label>

                    <Controller
                      name="major"
                      control={addControl}
                      rules={{ required: "Major is required!" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              addErrors.major
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Select Major" />
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
                    {addErrors.major && (
                      <p className="text-red-500">{addErrors.major.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      {...addRegister("duration", {
                        required: "Duration is required",
                      })}
                      placeholder="Enter duration"
                      className={`w-full border ${
                        addErrors.duration ? "border-red-500 " : ""
                      }`}
                    />
                    {addErrors.duration && (
                      <p className="text-red-500">
                        {addErrors.duration.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>

                    <Controller
                      name="location"
                      control={addControl}
                      rules={{ required: "Location is required!" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              addErrors.location
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="bachelor">
                                Cambridge{" "}
                              </SelectItem>
                              <SelectItem value="master">MA</SelectItem>
                              <SelectItem value="phd">USA</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {addErrors.location && (
                      <p className="text-red-500">
                        {addErrors.location.message}
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
                              className={`w-full justify-between font-normal ${
                                addErrors.startDate ? "border-red-500" : ""
                              }`}
                            >
                              {field.value instanceof Date
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <CalendarIcon
                                color="gray"
                                className="w-4 h-4 ml-2"
                              />
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
                      Graduation Date
                    </Label>

                    <Controller
                      name="graduationDate"
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
                              className={`w-full justify-between font-normal ${
                                addErrors.graduationDate ? "border-red-500" : ""
                              }`}
                            >
                              {field.value instanceof Date
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <CalendarIcon
                                color="gray"
                                className="w-4 h-4 ml-2"
                              />
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
                                setOpen(false);
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />

                    {addErrors.graduationDate && (
                      <span className="text-red-500 text-sm px-1">
                        {addErrors.graduationDate.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>GPA</Label>

                    <Controller
                      name="gpa"
                      control={addControl}
                      rules={{ required: "GPA is required!" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              addErrors.gpa
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Select Location" />
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
                    {addErrors.gpa && (
                      <p className="text-red-500">{addErrors.gpa.message}</p>
                    )}
                  </div>

                  <DialogFooter className="py-4">
                    <Button
                      type="submit"
                      className="bg-blue-700 w-25 text-white hover:bg-blue-600"
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
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-blue-50 p-4">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Total Institutions
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {educationHistory.length}
              </p>
            </div>

            <div className="rounded-lg border bg-green-50 p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Completed
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {
                  educationHistory.filter((edu) => edu.status === "Graduated")
                    .length
                }
              </p>
            </div>

            <div className="rounded-lg border bg-orange-50 p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  In Progress
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-900 mt-1">
                {
                  educationHistory.filter((edu) => edu.status === "In Progress")
                    .length
                }
              </p>
            </div>
          </div>

          <Separator />

          <div className="">
            <h3 className="text-lg font-medium text-gray-900">
              Academic Journey
            </h3>
          </div>

          <div className="space-y-6">
            {educationHistory.map((education) => (
              <div key={education.id} className="relative">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6 flex justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {education.collegeName}
                          </h4>
                          <Badge
                            variant="outline"
                            className={getDegreeColor(education.degree)}
                          >
                            {education.degree}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getStatusColor(education.status)}
                          >
                            {education.status}
                          </Badge>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                              Major
                            </p>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-green-500" />
                              <p className="text-sm text-gray-900">
                                {education.major}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                              Duration
                            </p>
                            <div className="flex items-center gap-2">
                              {/* <Calendar className="h-4 w-4 text-orange-500" /> */}
                              <p className="text-sm text-gray-900">
                                {calculateDuration(
                                  education.startDate,
                                  education.graduationDate
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                              Location
                            </p>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-purple-500" />
                              <p className="text-sm text-gray-900">
                                {education.location}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                              Start Date
                            </p>
                            <div className="flex items-center gap-2">
                              {/* <Calendar className="h-4 w-4 text-blue-500" /> */}
                              <p className="text-sm text-gray-900">
                                {education.startDate}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                              {education.status === "In Progress"
                                ? "Expected Graduation"
                                : "Graduation Date"}
                            </p>
                            <div className="flex items-center gap-2">
                              <CalendarCheck className="h-4 w-4 text-green-500" />
                              <p className="text-sm text-gray-900">
                                {education.graduationDate}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                              GPA
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
                              <p className="text-sm text-gray-900 font-medium">
                                {education.gpa}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <PiDotsThreeOutlineVerticalFill />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="mr-4">
                          <DropdownMenuGroup>
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <TbEdit size={16} />
                                  <span className="ml-2">Edit</span>
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg max-h-[93vh]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Edit Academic Journey
                                  </DialogTitle>
                                </DialogHeader>

                                <form
                                  onSubmit={handleEditSubmit(onEditSubmit)}
                                  className="grid gap-2 py-4 max-h-[80vh] overflow-y-auto "
                                  style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                  }}
                                >
                                  <div className="space-y-2">
                                    <Label>Diploma</Label>

                                    <Controller
                                      name="diploma"
                                      control={editControl}
                                      rules={{
                                        required: "Diploma is required!",
                                      }}
                                      render={({ field }) => (
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <SelectTrigger
                                            className={`w-full ${
                                              editErrors.diploma
                                                ? "border-red-500 focus:ring-red-500"
                                                : ""
                                            }`}
                                          >
                                            <SelectValue placeholder="Select Diploma" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="bachelor">
                                                Bachelor's Degree
                                              </SelectItem>
                                              <SelectItem value="master">
                                                Master's Degree
                                              </SelectItem>
                                              <SelectItem value="phd">
                                                PhD
                                              </SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      )}
                                    />
                                    {editErrors.diploma && (
                                      <p className="text-red-500">
                                        {editErrors.diploma.message}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Major</Label>

                                    <Controller
                                      name="major"
                                      control={editControl}
                                      rules={{ required: "Major is required!" }}
                                      render={({ field }) => (
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <SelectTrigger
                                            className={`w-full ${
                                              addErrors.major
                                                ? "border-red-500 focus:ring-red-500"
                                                : ""
                                            }`}
                                          >
                                            <SelectValue placeholder="Select Major" />
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
                                    {editErrors.major && (
                                      <p className="text-red-500">
                                        {editErrors.major.message}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Duration</Label>
                                    <Input
                                      {...editRegister("duration", {
                                        required: "Duration is required",
                                      })}
                                      placeholder="Enter duration"
                                      className={`w-full border ${
                                        editErrors.duration
                                          ? "border-red-500 "
                                          : ""
                                      }`}
                                    />
                                    {editErrors.duration && (
                                      <p className="text-red-500">
                                        {editErrors.duration.message}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Location</Label>

                                    <Controller
                                      name="location"
                                      control={editControl}
                                      rules={{
                                        required: "Location is required!",
                                      }}
                                      render={({ field }) => (
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <SelectTrigger
                                            className={`w-full ${
                                              editErrors.location
                                                ? "border-red-500 focus:ring-red-500"
                                                : ""
                                            }`}
                                          >
                                            <SelectValue placeholder="Select Status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="bachelor">
                                                Cambridge{" "}
                                              </SelectItem>
                                              <SelectItem value="master">
                                                MA
                                              </SelectItem>
                                              <SelectItem value="phd">
                                                USA
                                              </SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      )}
                                    />
                                    {editErrors.location && (
                                      <p className="text-red-500">
                                        {editErrors.location.message}
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
                                          <PopoverTrigger asChild>
                                            <Button
                                              variant="outline"
                                              id="dateOfBirth"
                                              className={`w-full justify-between font-normal ${
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
                                              />
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
                                      Graduation Date
                                    </Label>

                                    <Controller
                                      name="graduationDate"
                                      control={editControl}
                                      rules={{
                                        required: "Graduation is required",
                                      }}
                                      render={({ field }) => (
                                        <Popover
                                          open={open}
                                          onOpenChange={setOpen}
                                        >
                                          <PopoverTrigger asChild>
                                            <Button
                                              variant="outline"
                                              id="graduationDate"
                                              className={`w-full justify-between font-normal ${
                                                editErrors.graduationDate
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
                                                setOpen(false);
                                              }}
                                              captionLayout="dropdown"
                                            />
                                          </PopoverContent>
                                        </Popover>
                                      )}
                                    />

                                    {editErrors.graduationDate && (
                                      <span className="text-red-500 text-sm px-1">
                                        {editErrors.graduationDate.message}
                                      </span>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label>GPA</Label>

                                    <Controller
                                      name="gpa"
                                      control={editControl}
                                      rules={{ required: "GPA is required!" }}
                                      render={({ field }) => (
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <SelectTrigger
                                            className={`w-full ${
                                              editErrors.gpa
                                                ? "border-red-500 focus:ring-red-500"
                                                : ""
                                            }`}
                                          >
                                            <SelectValue placeholder="Select Location" />
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
                                    {editErrors.gpa && (
                                      <p className="text-red-500">
                                        {editErrors.gpa.message}
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
        </CardContent>
      </Card>
    </div>
  );
};
