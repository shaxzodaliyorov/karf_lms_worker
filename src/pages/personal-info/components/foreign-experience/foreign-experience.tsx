"use client";

import {
  Globe,
  MapPin,
  Clock,
  Target,
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Controller, useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import MultiFileUpload from "@/components/file-upload/file-upload";
import { useTranslation } from "react-i18next";

type FormValues = {
  country: string;
  purpose: string;
  major: string;
  description: string;
  location: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  gpa: string;
  profileImage: FileList;
  file: File[];
};

export const ForeignExperience = () => {
  const { t } = useTranslation(["foreign", "translation"]);

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
    },
  });

  const {
    control: editControl,
    register: editRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
  } = useForm<FormValues>({
    defaultValues: {
      country: "",
      purpose: "",
      major: "",
      description: "",
      location: "",
      startDate: undefined,
      endDate: undefined,
      gpa: "",
    },
  });

  const [disableDescription, setDisableDescription] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisableDescription(e.target.checked);
  };

  const onAddSubmit = (data: FormValues) => {
    console.log("Add Data:", data);
  };

  const onEditSubmit = (data: FormValues) => {
    console.log("Edit Data:", data);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const foreignExperiences = [
    {
      id: 1,
      visitedCountry: "United States",
      duration: "6 months",
      purpose: t("purposes.work"),
      startDate: "01/01/2023",
      endDate: "30/06/2023",
      documents: [
        { name: "Work_Visa_USA.pdf", size: "2.3 MB", type: "pdf" },
        { name: "Employment_Letter.pdf", size: "1.1 MB", type: "pdf" },
      ],
      description: "Software development internship at tech company",
    },
    {
      id: 2,
      visitedCountry: "Germany",
      duration: "3 months",
      purpose: t("purposes.study"),
      startDate: "15/09/2022",
      endDate: "15/12/2022",
      documents: [
        { name: "Student_Visa_Germany.pdf", size: "1.8 MB", type: "pdf" },
        { name: "University_Acceptance.pdf", size: "0.9 MB", type: "pdf" },
      ],
      description: "Exchange program at Technical University of Munich",
    },
    {
      id: 3,
      visitedCountry: "Japan",
      duration: "2 weeks",
      purpose: t("purposes.tourism"),
      startDate: "10/05/2022",
      endDate: "24/05/2022",
      documents: [
        { name: "Tourist_Visa_Japan.pdf", size: "1.2 MB", type: "pdf" },
      ],
      description: "Cultural exploration and sightseeing tour",
    },
  ];

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case t("purposes.work"):
        return "bg-blue-50 text-blue-700 border-blue-200";
      case t("purposes.study"):
        return "bg-green-50 text-green-700 border-green-200";
      case t("purposes.tourism"):
        return "bg-purple-50 text-purple-700 border-purple-200";
      case t("purposes.business"):
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPurposeIcon = (purpose: string) => {
    switch (purpose) {
      case t("purposes.work"):
        return "💼";
      case t("purposes.study"):
        return "📚";
      case t("purposes.tourism"):
        return "🏖️";
      case t("purposes.business"):
        return "🤝";
      default:
        return "🌍";
    }
  };

  const totalCountries = foreignExperiences.length;
  const totalDuration = foreignExperiences.reduce((acc, exp) => {
    const months = exp.duration.includes("month")
      ? Number.parseInt(exp.duration)
      : 0;
    const weeks = exp.duration.includes("week")
      ? Number.parseInt(exp.duration) / 4
      : 0;
    return acc + months + weeks;
  }, 0);

  return (
    <div className="w-full">
      <Card className="shadow-lg">


        {/*     ******************     CARD HEADER       ******************     */}
        <CardHeader className="border-b bg-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Globe className="h-5 w-5 text-blue-600" />
              {t("foreign.title")}
            </CardTitle>

            {/*     ******************     ADD MODAL       ******************     */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus />
                  {t("translation:common.add")}
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-lg overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t("translation:common.add") + " " + t("foreign.title")}</DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={handleAddSubmit(onAddSubmit)}
                  className="grid gap-2 py-4 max-h-[80vh]"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <div className="space-y-2">
                    <Label>{t("foreign.visitedCountry")}</Label>
                    <Input
                      {...addRegister("country", {
                        required: t("foreign.country") + " " + t("translation:common.isRequired"),
                      })}
                      placeholder={t("translation:common.enter") + " " + t("foreign.visitedCountry")}
                      className={`w-full border ${
                        addErrors.country ? "border-red-500 " : ""
                      }`}
                    />
                    {addErrors.country && (
                      <p className="text-red-500">
                        {addErrors.country.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>{t("foreign.purposeMain")}</Label>

                    <Controller
                      name="purpose"
                      control={addControl}
                      rules={{ required: t("foreign.purposeMain") + " " + t("translation:common.isRequired") }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              addErrors.purpose
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder={t("translation:common.select") + " " + t("foreign.purposeMain")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="work">{t("purposes.work")}</SelectItem>
                              <SelectItem value="business">{t("purposes.business")}</SelectItem>
                              <SelectItem value="tourism">{t("purposes.tourism")}</SelectItem>
                              <SelectItem value="study">{t("purposes.study")}</SelectItem>
                              <SelectItem value="other">{t("purposes.other")}</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {addErrors.purpose && (
                      <p className="text-red-500">{addErrors.purpose.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>{t("foreign.subTitle")}</Label>
                    <Input
                      {...addRegister("description", {
                        required: t("foreign.description") + " " + t("translation:common.isRequired"),
                      })}
                      placeholder={t("translation:common.enter") + " " + t("foreign.description")}
                      className={`w-full border ${
                        addErrors.description ? "border-red-500 " : ""
                      }`}
                    />
                    {addErrors.description && (
                      <p className="text-red-500">{addErrors.description.message}</p>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="dateOfBirth" className="px-1">
                      {t("translation:common.startDate")}
                    </Label>

                    <Controller
                      name="startDate"
                      control={addControl}
                      rules={{ required: t("translation:common.startDate") + " " + t("translation:common.isRequired") }}
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
                                : t("translation:common.select") + " " + t("translation:common.startDate")}
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
                      <span className="text-red-500 text-sm px-1">{addErrors.startDate.message}</span>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="graduationDate" className="px-1">
                      {t("translation:common.endDate")}
                    </Label>

                    <Controller
                      name="endDate"
                      control={addControl}
                      rules={{
                        required: t("translation:common.endDate") + " " + t("translation:common.isRequired"),
                      }}
                      render={({ field }) => (
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="graduationDate"
                              className={`w-full justify-between font-normal ${
                                addErrors.endDate ? "border-red-500" : ""
                              }`}
                            >
                              {field.value instanceof Date
                                ? field.value.toLocaleDateString()
                                : t("translation:common.select") + " " + t("translation:common.endDate")}
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

                    {addErrors.endDate && (
                      <span className="text-red-500 text-sm px-1">{addErrors.endDate.message}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      className={`${
                        disableDescription ? "text-gray-400 cursor-default" : ""
                      }`}
                    >
                      {t("foreign.subTitle")}
                    </Label>
                    <Input
                      {...addRegister("description", {
                        required: t("foreign.description") + " " + t("translation:common.isRequired"),
                      })}
                      placeholder={t("translation:common.enter") + " " + t("foreign.description")}
                      disabled={disableDescription}
                      className={`w-full border ${
                        addErrors.description ? "border-red-500 " : ""
                      }`}
                    />
                    {addErrors.description && (
                      <p className="text-red-500">{addErrors.description.message}</p>
                    )}

                    <div className="flex items-center  gap-2 mt-2">
                      <input
                        type="checkbox"
                        id="disableDescription"
                        checked={disableDescription}
                        onChange={handleCheckboxChange}
                        className="accent-blue-600 h-4 w-4"
                      />
       
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Controller
                      name="file"
                      control={addControl}
                      rules={{
                        required: t("foreign.docPlace") + " " + t("translation:common.isRequired"),
                      }}
                      render={({ field, fieldState }) => (
                        <MultiFileUpload
                          maxSizeMB={10}
                          onFileSelect={(files) => field.onChange(files)}
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>

                  <DialogFooter className="py-4">
                    <Button type="submit" className="bg-blue-700 w-25 hover:bg-blue-600">
                      <Plus className="h-4 w-4 mr-1" /> 
                      {t("translation:common.add")}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {t("foreign.subTitle")}
          </p>
        </CardHeader>

        {/*     ******************     STATS CONTENT       ******************     */}
        <CardContent className="space-y-6 p-6">
          {/* Experience Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-blue-50 p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  {t("foreign.visitedCountry")}
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {totalCountries}
              </p>
            </div>

            <div className="rounded-lg border bg-green-50 p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {t("foreign.duration")}
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {Math.round(totalDuration)}mo
              </p>
            </div>

            <div className="rounded-lg border bg-purple-50 p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">
                  {t("foreign.purpose")}
                </span>
              </div>
              <p className="text-lg font-bold text-purple-900 mt-1">{t("purposes.work")}</p>
            </div>

            <div className="rounded-lg border bg-orange-50 p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  {t("foreign.documents")}
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-900 mt-1">
                {foreignExperiences.reduce(
                  (acc, exp) => acc + exp.documents.length,
                  0
                )}
              </p>
            </div>
          </div>

          <Separator />

          {/*     ******************     TIMELINE CONTENT       ******************     */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              {t("timeline.title")}
            </h3>


            {/*     ******************     EXPERIENCES       ******************     */}
            {foreignExperiences.map((experience) => (
              <div key={experience.id} className="relative">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="s space-y-8 p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
                        <span className="text-lg">
                          {getPurposeIcon(experience.purpose)}
                        </span>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            {experience.visitedCountry}
                          </h4>
                          <Badge variant="outline" className={getPurposeColor(experience.purpose)}>{experience.purpose}</Badge>
                        </div>

                        {experience.description && <p className="text-sm text-gray-600 italic">{experience.description}</p>}

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">{t("foreign.duration")}</p>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-green-500" />
                              <p className="text-sm text-gray-900 font-medium">{experience.duration}</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">{t("translation:common.startDate")}</p>
                            <div className="flex items-center gap-2">
                              <CiCalendar className="h-4 w-4 text-blue-500" />
                              <p className="text-sm text-gray-900">{experience.startDate}</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">{t("translation:common.endDate")}</p>
                            <div className="flex items-center gap-2">
                              <CiCalendar className="h-4 w-4 text-purple-500" />
                              <p className="text-sm text-gray-900">{experience.endDate}</p>
                            </div>
                          </div>
                        </div>

                        {experience.documents.length > 0 && (
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-700">{t("foreign.documents")}</p>
                            <div className="grid gap-2 md:grid-cols-2">
                              {experience.documents.map((doc, docIndex) => (
                                <div key={docIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-red-500" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                      <p className="text-xs text-gray-500">{doc.size}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Download className="h-4 w-4" /></Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      {/*       ***************     Dropdown Menu      ***************       */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <PiDotsThreeOutlineVerticalFill />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="mr-4">
                          <DropdownMenuGroup>
                            
                            
                            {/* ***************     Edit Dialog       ***************       */}
                            
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <TbEdit size={16} />
                                  <span className="ml-2">{t("translation:common.edit")}</span>
                                </DropdownMenuItem>
                              </DialogTrigger>

                              <DialogContent className="sm:max-w-[500px] p-6 overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>
                                     {t("translation:common.edit") + " " + t("foreign.title")}
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
                                    <Label>{t("foreign.country")}</Label>
                                    <Input
                                      {...editRegister("country", {
                                        required: t("foreign.country") + " " + t("translation:common.isRequired"),
                                      })}
                                      placeholder={t("translation:common.enter") + " " + t("foreign.country")}
                                      className={`w-full border ${editErrors.country ? "border-red-500 " : ""}`}
                                    />
                                    {editErrors.country && (
                                      <p className="text-red-500">{editErrors.country.message}</p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label>{t("foreign.purpose")}</Label>

                                    <Controller
                                      name="purpose"
                                      control={editControl}
                                      rules={{
                                        required: t("foreign.purpose") + " " + t("translation:common.isRequired"),
                                      }}
                                      render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                          <SelectTrigger className={`w-full ${editErrors.purpose ? "border-red-500 focus:ring-red-500" : ""}`}>
                                          <SelectValue placeholder={t("translation:common.select") + " " + t("foreign.purpose")} />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="work">{t("purposes.work")}</SelectItem>
                                              <SelectItem value="study">{t("purposes.study")}</SelectItem>
                                              <SelectItem value="tourism">{t("purposes.tourism")}</SelectItem>
                                              <SelectItem value="business">{t("purposes.business")}</SelectItem>
                                              <SelectItem value="other">{t("purposes.other")}</SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      )}
                                    />
                                    {editErrors.purpose && (
                                      <p className="text-red-500">{editErrors.purpose.message}</p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label>{t("foreign.description")}</Label>
                                    <Input
                                      {...editRegister("description", {
                                        required: t("foreign.description") + " " + t("translation:common.isRequired"),
                                      })}
                                      placeholder={t("translation:common.enter") + " " + t("foreign.description")}
                                      className={`w-full border ${editErrors.description ? "border-red-500 " : ""}`}
                                    />
                                    {editErrors.description && (
                                      <p className="text-red-500">{editErrors.description.message}</p>
                                    )}
                                  </div>

                                  <div className="grid gap-3">
                                    <Label htmlFor="startDate" className="px-1">{t("translation:common.startDate")}</Label>

                                    <Controller
                                      name="startDate"
                                      control={editControl}
                                      rules={{
                                        required: t("translation:common.startDate") + " " + t("translation:common.isRequired"),
                                      }}
                                      render={({ field }) => (
                                        <Popover
                                          open={startDateOpen}
                                          onOpenChange={setStartDateOpen}
                                        >
                                          <PopoverTrigger asChild>
                                            <Button
                                              variant="outline"
                                              id="startDate"
                                              className={`w-full justify-between font-normal ${editErrors.startDate ? "border-red-500" : ""}`}
                                            >
                                              {field.value instanceof Date ? field.value.toLocaleDateString() 
                                              : t("translation:common.select") + " " + t("translation:common.startDate")}
                                              
                                              <CalendarIcon color="gray" className="w-4 h-4 ml-2" />
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
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

                                    {editErrors.startDate && (
                                      <span className="text-red-500 text-sm px-1">{editErrors.startDate.message}</span>
                                    )}
                                  </div>

                                  <div className="grid gap-3">
                                    <Label htmlFor="graduationDate" className="px-1">{t("translation:common.endDate")}</Label>

                                    <Controller
                                      name="endDate"
                                      control={editControl}
                                      rules={{
                                        required: t("translation:common.endDate") + " " + t("translation:common.isRequired"),
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
                                              className={`w-full justify-between font-normal ${editErrors.endDate ? "border-red-500" : ""}`}
                                            >
                                              {field.value instanceof Date ? field.value.toLocaleDateString() 
                                              : t("translation:common.select") + " " + t("translation:common.endDate")}
                                              <CalendarIcon color="gray" className="w-4 h-4 ml-2" />
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
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

                                    {editErrors.endDate && (
                                      <span className="text-red-500 text-sm px-1">{editErrors.endDate.message}</span>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label>{t("foreign.description")}</Label>
                                    <Input
                                      {...editRegister("description", {
                                        required: t("foreign.description") + " " + t("translation:common.isRequired"),
                                      })}
                                      placeholder="Brief description"
                                      className={`w-full border ${editErrors.description ? "border-red-500 " : ""}`}
                                    />
                                    {editErrors.description && (
                                      <p className="text-red-500">{editErrors.description.message}</p>
                                    )}
                                  </div>

                                  <Controller
                                    name="file"
                                    control={editControl}
                                    rules={{required:t("foreign.docPlace") + " " + t("translation:common.isRequired")}}
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

                                  <DialogFooter className="py-4">
                                    <Button type="submit" className="bg-blue-700 w-26 hover:bg-blue-600">
                                      <Plus className="h-4 w-4 mr-1" /> {t("translation:common.edit")}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>

                            {/* ***************     Delete Dialog      ***************       */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <RiDeleteBinLine size={16} />
                                  <span className="ml-2">{t("translation:common.delete")}</span>
                                </DropdownMenuItem>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{t("translation:common.alertTitle")}</AlertDialogTitle>
                                  <AlertDialogDescription>{t("translation:common.alertDescription")}</AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel className="h-10">
                                    <div className="flex items-center gap-2">
                                      <MdOutlineCancel size={16} /> {t("translation:common.no")}
                                    </div>
                                  </AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600 hover:bg-red-700 h-10">
                                    <div className="flex items-center gap-2">
                                      <AiOutlineCheck size={16} /> {t("translation:common.yes") + ", " + t("translation:common.delete")}
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
