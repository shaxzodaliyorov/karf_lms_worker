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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(["collage", "translation"]);
  // const { c} = useTranslation("trasnlation");

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
      major: t("major.cs"),
      degree: t("degree.bachelor"),
      startDate: "01/09/2016",
      graduationDate: "15/06/2020",
      location: "Cambridge, MA, USA",
      status: t("status.graduated"),
      gpa: "3.8/4.0",
    },
    {
      id: 2,
      collegeName: "Stanford University",
      major: t("major.ai"),
      degree: t("degree.master"),
      startDate: "01/09/2020",
      graduationDate: "15/06/2022",
      location: "Stanford, CA, USA",
      status: t("status.graduated"),
      gpa: "3.9/4.0",
    },
    {
      id: 3,
      collegeName: "MIT",
      major: t("major.ml"),
      degree: t("degree.phd"),
      startDate: "01/09/2022",
      graduationDate: "Expected 2026",
      location: "Cambridge, MA, USA",
      status: t("status.inProgress"),
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

  // Status Colors (Graduated, InProgress)
  const getStatusColor = (status: string) => {
    switch (status) {
      case t("status.graduated"):
        return "bg-green-50 text-green-700 border-green-200";
      case t("status.inProgress"):
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Badges Colors (Bachelor, Master, PhD)
  const getDegreeColor = (degree: string) => {
    switch (degree) {
      case t("degree.bachelor"):
        return "bg-orange-50 text-orange-700 border-orange-200";
      case t("degree.master"):
        return "bg-purple-50 text-purple-700 border-purple-200";
      case t("degree.phd"):
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full">
      <Card className="shadow-lg">
        {/*   **********    SECTION HEADER     ********** */}
        <CardHeader className="border-b bg-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                {t("education.title")}
              </CardTitle>
              <p className="text-sm 4-gray-600 mt-1">
                {t("education.description")}
              </p>
            </div>

            {/*   **********    ADD DIPLOMA / EDUCATION     ********** */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> {t("translation:common.add")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[93vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t("translation:common.add") + " " + t("journey.title")}</DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={handleAddSubmit(onAddSubmit)}
                  className=" grid gap-2 py-4 max-h-[80vh]  "
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {/* **********  DIPLOMA ********** */}
                  <div className="space-y-2">
                    <Label>{t("education.diploma")}</Label>

                    <Controller
                      name="diploma"
                      control={addControl}
                      rules={{
                        required:
                          t("education.diploma") + " " + t("translation:common.isRequired"),
                      }}
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
                            <SelectValue
                              placeholder={`${t("translation:common.select")} ${t(
                                "education.diploma"
                              )}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="bachelor">
                                {t("degree.bachelor")}
                              </SelectItem>
                              <SelectItem value="master">
                                {t("degree.master")}
                              </SelectItem>
                              <SelectItem value="phd">
                                {t("degree.phd")}
                              </SelectItem>
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
                    <Label>{t("education.major")}</Label>

                    <Controller
                      name="major"
                      control={addControl}
                      rules={{
                        required: t("education.major") + " " + t("translation:common.isRequired"),
                      }}
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
                            <SelectValue
                              placeholder={`${t("translation:common.select")} ${t(
                                "education.major"
                              )}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="cs">
                                {t("major.cs")}
                              </SelectItem>
                              <SelectItem value="ai">
                                {t("major.ai")}
                              </SelectItem>
                              <SelectItem value="ml">
                                {t("major.ml")}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {addErrors.major && (
                      <p className="text-red-500">{addErrors.major.message}</p>
                    )}
                  </div>

                  {/* **********  DURATION ********** */}
                  <div className="space-y-2">
                    <Label>{t("education.duration")}</Label>
                    <Input
                      {...addRegister("duration", {
                        required:
                          t("education.duration") + " " + t("translation:common.isRequired"),
                      })}
                      placeholder={`${t("translation:common.enter")} ${t(
                        "education.duration"
                      )}`}
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

                  {/* **********  LOCATION ********** */}

                  <div className="space-y-2">
                    <Label>{t("education.location")}</Label>

                    <Controller
                      name="location"
                      control={addControl}
                      rules={{
                        required:
                          t("education.location") + " " + t("translation:common.isRequired"),
                      }}
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
                            <SelectValue
                              placeholder={`${t("translation:common.select")} ${t(
                                "education.location"
                              )}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="cambridge">
                                Cambridge{" "}
                              </SelectItem>
                              <SelectItem value="ma">MA</SelectItem>
                              <SelectItem value="usa">USA</SelectItem>
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

                  {/* **********  START DATE ********** */}

                  <div className="grid gap-3">
                    <Label htmlFor="dateOfBirth" className="px-1">
                      {t("education.startDate")}
                    </Label>

                    <Controller
                      name="startDate"
                      control={addControl}
                      rules={{
                        required:
                          t("education.startDate") + " " + t("translation:common.isRequired"),
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
                                addErrors.startDate ? "border-red-500" : ""
                              }`}
                            >
                              {field.value instanceof Date
                                ? field.value.toLocaleDateString()
                                : `${t("translation:common.select")} ${t(
                                    "education.startDate"
                                  )}`}
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

                  {/* **********  GRADUATION DATE ********** */}

                  <div className="grid gap-3">
                    <Label htmlFor="graduationDate" className="px-1">
                      {t("education.endDate")}
                    </Label>

                    <Controller
                      name="graduationDate"
                      control={addControl}
                      rules={{
                        required:
                          t("education.endDate") + " " + t("translation:common.isRequired"),
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
                                : `${t("translation:common.select")} ${t(
                                    "education.endDate"
                                  )}`}
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

                  {/* **********  GPA ********** */}

                  <div className="space-y-2">
                    <Label>{t("education.gpa")}</Label>

                    <Controller
                      name="gpa"
                      control={addControl}
                      rules={{
                        required: t("education.gpa") + " " + t("translation:common.isRequired"),
                      }}
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
                            <SelectValue
                              placeholder={`${t("translation:common.select")} ${t(
                                "education.gpa"
                              )}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="4.0">4.0</SelectItem>
                              <SelectItem value="3.0">3.0</SelectItem>
                              <SelectItem value="2.0">2.0</SelectItem>
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
                      className="bg-blue-700 w-26 text-white hover:bg-blue-600"
                    >
                      <Plus className="h-4 w-4 mr-1" /> {t("translation:common.add")}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/*   **********    EDUCATION HISTORY     ********** */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-blue-50 p-4">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  {t("status.total")}
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
                  {t("status.completed")}
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {
                  educationHistory.filter(
                    (edu) => edu.status === t("status.graduated")
                  ).length
                }
              </p>
            </div>

            <div className="rounded-lg border bg-orange-50 p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  {t("status.inProgress")}
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-900 mt-1">
                {
                  educationHistory.filter(
                    (edu) => edu.status === t("status.inProgress")
                  ).length
                }
              </p>
            </div>
          </div>

          <Separator />

          {/*   **********    ACADEMIC JOURNEY     ********** */}
          <div className="">
            <h3 className="text-lg font-medium text-gray-900">
              {t("journey.title")}
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
                              {t("education.major")}
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
                              {t("education.duration")}
                            </p>
                            <div className="flex items-center gap-2">
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
                              {t("education.location")}
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
                              {t("education.startDate")}
                            </p>
                            <div className="flex items-center gap-2">
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
                              {t("education.gpa")}
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

                    {/*     ************     EDIT & DELETE  EDUCATION  ************     */}

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
                                  <TbEdit className="h-4 w-4 mr-1" /> {t("translation:common.edit")}
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg max-h-[93vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>
                                    {t("translation:common.edit") + " " + t("journey.title")}
                                  </DialogTitle>
                                </DialogHeader>

                                <form
                                  onSubmit={handleEditSubmit(onEditSubmit)}
                                  className=" grid gap-2 py-4 max-h-[80vh]  "
                                  style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                  }}
                                >
                                  {/* **********  DIPLOMA ********** */}
                                  <div className="space-y-2">
                                    <Label>{t("education.diploma")}</Label>

                                    <Controller
                                      name="diploma"
                                      control={editControl}
                                      rules={{
                                        required:
                                          t("education.diploma") +
                                          " " +
                                          t("isRequired"),
                                      }}
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
                                            <SelectValue
                                              placeholder={`${t(
                                                "translation:common.select"
                                              )} ${t("education.diploma")}`}
                                            />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="bachelor">
                                                {t("degree.bachelor")}
                                              </SelectItem>
                                              <SelectItem value="master">
                                                {t("degree.master")}
                                              </SelectItem>
                                              <SelectItem value="phd">
                                                {t("degree.phd")}
                                              </SelectItem>
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
                                    <Label>{t("education.major")}</Label>

                                    <Controller
                                      name="major"
                                      control={editControl}
                                      rules={{
                                        required:
                                          t("education.major") +
                                          " " +
                                          t("isRequired"),
                                      }}
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
                                            <SelectValue
                                              placeholder={`${t(
                                                "translation:common.select"
                                              )} ${t("education.major")}`}
                                            />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="cs">
                                                {t("major.cs")}
                                              </SelectItem>
                                              <SelectItem value="ai">
                                                {t("major.ai")}
                                              </SelectItem>
                                              <SelectItem value="ml">
                                                {t("major.ml")}
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

                                  {/* **********  DURATION ********** */}
                                  <div className="space-y-2">
                                    <Label>{t("education.duration")}</Label>
                                    <Input
                                      {...editRegister("duration", {
                                        required:
                                          t("education.duration") +
                                          " " +
                                          t("isRequired"),
                                      })}
                                      placeholder={`${t("translation:common.enter")} ${t(
                                        "education.duration"
                                      )}`}
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

                                  {/* **********  LOCATION ********** */}

                                  <div className="space-y-2">
                                    <Label>{t("education.location")}</Label>

                                    <Controller
                                      name="location"
                                      control={editControl}
                                      rules={{
                                        required:
                                          t("education.location") +
                                          " " +
                                          t("isRequired"),
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
                                            <SelectValue
                                              placeholder={`${t(
                                                "translation:common.select"
                                              )} ${t("education.location")}`}
                                            />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="cambridge">
                                                Cambridge{" "}
                                              </SelectItem>
                                              <SelectItem value="ma">
                                                MA
                                              </SelectItem>
                                              <SelectItem value="usa">
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

                                  {/* **********  START DATE ********** */}

                                  <div className="grid gap-3">
                                    <Label
                                      htmlFor="dateOfBirth"
                                      className="px-1"
                                    >
                                      {t("education.startDate")}
                                    </Label>

                                    <Controller
                                      name="startDate"
                                      control={editControl}
                                      rules={{
                                        required:
                                          t("education.startDate") +
                                          " " +
                                          t("isRequired"),
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
                                                : `${t("translation:common.select")} ${t(
                                                    "education.startDate"
                                                  )}`}
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

                                  {/* **********  GRADUATION DATE ********** */}

                                  <div className="grid gap-3">
                                    <Label
                                      htmlFor="graduationDate"
                                      className="px-1"
                                    >
                                      {t("education.endDate")}
                                    </Label>

                                    <Controller
                                      name="graduationDate"
                                      control={editControl}
                                      rules={{
                                        required:
                                          t("education.graduationDate") +
                                          " " +
                                          t("isRequired"),
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
                                                : `${t("translation:common.select")} ${t(
                                                    "education.endDate"
                                                  )}`}
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

                                  {/* **********  GPA ********** */}

                                  <div className="space-y-2">
                                    <Label>{t("education.gpa")}</Label>

                                    <Controller
                                      name="gpa"
                                      control={editControl}
                                      rules={{
                                        required:
                                          t("education.gpa") +
                                          " " +
                                          t("isRequired"),
                                      }}
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
                                            <SelectValue
                                              placeholder={`${t(
                                                "translation:common.select"
                                              )} ${t("education.gpa")}`}
                                            />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="4.0">
                                                4.0
                                              </SelectItem>
                                              <SelectItem value="3.0">
                                                3.0
                                              </SelectItem>
                                              <SelectItem value="2.0">
                                                2.0
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
                                      className="bg-blue-700 w-25 text-white hover:bg-blue-600"
                                    >
                                      <TbEdit className="h-4 w-4 mr-1" /> {t("translation:common.edit")}
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
                                  <span className="ml-2">{t("translation:common.delete")}</span>
                                </DropdownMenuItem>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    {t("translation:common.alertTitle")}
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {t("translation:common.alertDescription")}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel className="h-10">
                                    <div className="flex items-center gap-2">
                                      <MdOutlineCancel size={16} /> {t("translation:common.no")}
                                    </div>
                                  </AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600 hover:bg-red-700 h-10">
                                    <div className="flex items-center gap-2">
                                      <AiOutlineCheck size={16} /> {t("translation:common.yes")}, {t("translation:common.delete")}
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
