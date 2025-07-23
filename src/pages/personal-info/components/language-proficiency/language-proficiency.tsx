"use client";

import {
  Languages,
  MessageCircle,
  PenTool,
  FileText,
  Download,
  Eye,
  Award,
  Globe,
  Plus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiFileUpload from "@/components/file-upload/file-upload";
type FormValues = {
  language: string;
  proficiencyLevel: string;
  file: File[];
};

export const LanguageProficiency = () => {
  const { t } = useTranslation(["language", "translation"]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      language: "",
      proficiencyLevel: "",
      file: [],
    },
  });

  const onAddSubmit = (data: FormValues) => {
    console.log("Add Data:", data);
  };

  const onEditSubmit = (data: FormValues) => {
    console.log("Edit Data:", data);
  };
  const languageProficiencies = [
    {
      id: 1,
      language: "English",
      proficiencyLevel: "Advanced",
      speakingLevel: "Fluent",
      writingReadingLevel: "Native",
      overallScore: 95,
      certificates: [
        {
          name: "IELTS_Certificate.pdf",
          score: "8.5",
          date: "2023",
          size: "1.2 MB",
        },
        {
          name: "TOEFL_Results.pdf",
          score: "110",
          date: "2022",
          size: "0.8 MB",
        },
      ],
      nativeLanguage: false,
    },
    {
      id: 2,
      language: "Uzbek",
      proficiencyLevel: "Native",
      speakingLevel: "Native",
      writingReadingLevel: "Native",
      overallScore: 100,
      certificates: [],
      nativeLanguage: true,
    },
    {
      id: 3,
      language: "Russian",
      proficiencyLevel: "Intermediate",
      speakingLevel: "Intermediate",
      writingReadingLevel: "Intermediate",
      overallScore: 75,
      certificates: [
        {
          name: "Russian_Language_Certificate.pdf",
          score: "B2",
          date: "2021",
          size: "1.5 MB",
        },
      ],
      nativeLanguage: false,
    },
    {
      id: 4,
      language: "German",
      proficiencyLevel: "Beginner",
      speakingLevel: "Basic",
      writingReadingLevel: "Basic",
      overallScore: 40,
      certificates: [
        {
          name: "Goethe_A1_Certificate.pdf",
          score: "A1",
          date: "2023",
          size: "0.9 MB",
        },
      ],
      nativeLanguage: false,
    },
  ];

  const getProficiencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "native":
        return "bg-green-50 text-green-700 border-green-200";
      case "advanced":
      case "fluent":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "intermediate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "beginner":
      case "basic":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getProficiencyProgress = (level: string) => {
    switch (level.toLowerCase()) {
      case "native":
        return 100;
      case "advanced":
      case "fluent":
        return 85;
      case "intermediate":
        return 65;
      case "beginner":
      case "basic":
        return 35;
      default:
        return 0;
    }
  };

  const getLanguageFlag = (language: string) => {
    const flags: { [key: string]: string } = {
      english: "🇺🇸",
      uzbek: "🇺🇿",
      russian: "🇷🇺",
      german: "🇩🇪",
      spanish: "🇪🇸",
      french: "🇫🇷",
      chinese: "🇨🇳",
      japanese: "🇯🇵",
    };
    return flags[language.toLowerCase()] || "🌍";
  };

  const totalLanguages = languageProficiencies.length;
  const nativeLanguages = languageProficiencies.filter(
    (lang) => lang.nativeLanguage
  ).length;
  const certificatesCount = languageProficiencies.reduce(
    (acc, lang) => acc + lang.certificates.length,
    0
  );
  const averageProficiency = Math.round(
    languageProficiencies.reduce((acc, lang) => acc + lang.overallScore, 0) /
      totalLanguages
  );

  return (
    <div className="min-h-screen ">
      <div className="mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  <Languages className="h-5 w-5 text-blue-600" />
                  {t("language.title")}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {t("language.subtitle")}
                </p>
              </div>

              {/*     ******** Add Dialog ******** */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-1" /> {t("translation:common.add")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("language.title")}</DialogTitle>
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
                      <Label>{t("language.language")}</Label>

                      <Controller
                        name="language"
                        control={addControl}
                        rules={{ required: t("language.language") + " " + t("translation:common.isRequired") }}
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
                              <SelectValue placeholder={t("translation:common.select") + " " + t("language.language")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="uz">UZ </SelectItem>
                                <SelectItem value="en">Eng </SelectItem>
                                <SelectItem value="ru">Ru</SelectItem>
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
                      <Label>{t("language.proficiencyLevel")}</Label>
                      <Input
                        {...addRegister("proficiencyLevel", {
                          required: t("language.proficiencyLevel") + " " + t("translation:common.isRequired"),
                        })}
                        placeholder={t("language.title")}
                        className={`w-full border ${
                          addErrors.proficiencyLevel ? "border-red-500 " : ""
                        }`}
                      />
                      {addErrors.proficiencyLevel && (
                        <p className="text-red-500">
                          {addErrors.proficiencyLevel.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Controller
                        name="file"
                        control={addControl}
                        rules={{ required: t("language.file") + " " + t("translation:common.isRequired") }}
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
                        className="bg-blue-700 w-26 hover:bg-blue-600"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {t("translation:common.add")}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* Language Summary Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    {t("language.stats.totalLanguages")}
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-1">{totalLanguages}</p>
              </div>

              <div className="rounded-lg border bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {t("language.stats.nativeLanguages")}
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-1">{nativeLanguages}</p>
              </div>

              <div className="rounded-lg border bg-purple-50 p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">
                    {t("language.stats.certificates")}
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-1">{certificatesCount}</p>
              </div>

              <div className="rounded-lg border bg-orange-50 p-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    {t("language.stats.avgProficiency")}
                  </span>
                </div>
                <p className="text-2xl font-bold text-orange-900 mt-1">{averageProficiency}%</p>
              </div>
            </div>

            <Separator />

            {/* Language Proficiency List */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                {t("language.overview")}
              </h3>

              <div className="grid gap-6 md:grid-cols-1">
                {languageProficiencies.map((language) => (
                  <Card
                    key={language.id}
                    className="border-l-4 border-l-blue-500"
                  >
                    <CardContent className="p-6 relative">
                      <div>
                        <div className="space-y-4 ">
                          {/* Language Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">
                                {getLanguageFlag(language.language)}
                              </span>
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {language.language}
                                </h4>
                                {language.nativeLanguage && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200"
                                  >
                                    Native Language
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-600">
                                {language.overallScore}%
                              </p>
                              <p className="text-xs text-gray-500">{t("language.overallScore")}</p>
                            </div>
                          </div>

                          {/* Proficiency Levels */}
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                  <MessageCircle className="h-3 w-3" />
                                  {t("language.proficiencyLevels.speaking")}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={getProficiencyColor(
                                    language.speakingLevel
                                  )}
                                >
                                  {language.speakingLevel}
                                </Badge>
                              </div>
                              <Progress
                                value={getProficiencyProgress(
                                  language.speakingLevel
                                )}
                                className="h-2"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                  <PenTool className="h-3 w-3" />
                                  {t("language.proficiencyLevels.writingReading")}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={getProficiencyColor(
                                    language.writingReadingLevel
                                  )}
                                >
                                  {language.writingReadingLevel}
                                </Badge>
                              </div>
                              <Progress
                                value={getProficiencyProgress(
                                  language.writingReadingLevel
                                )}
                                className="h-2"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                  <Languages className="h-3 w-3" />
                                  {t("language.proficiencyLevels.overallProficiency")}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={getProficiencyColor(
                                    language.proficiencyLevel
                                  )}
                                >
                                  {language.proficiencyLevel}
                                </Badge>
                              </div>
                              <Progress
                                value={getProficiencyProgress(
                                  language.proficiencyLevel
                                )}
                                className="h-2"
                              />
                            </div>
                          </div>

                          {language.certificates.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                {t("language.stats.certificates")}
                              </p>
                              <div className="space-y-2">
                                {language.certificates.map(
                                  (cert, certIndex) => (
                                    <div
                                      key={certIndex}
                                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border"
                                    >
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-blue-500" />
                                        <div>
                                          <p className="text-sm font-medium text-gray-900">
                                            {cert.name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            Score: {cert.score} • {cert.date} •{" "}
                                            {cert.size}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex gap-1">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 w-7 p-0"
                                        >
                                          <Eye className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 w-7 p-0"
                                        >
                                          <Download className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="absolute top-[-15px] right-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <PiDotsThreeOutlineVerticalFill />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="mr-4">
                              <DropdownMenuGroup>
                                {/* Edit Dialog */}
                                <Dialog
                                  open={isDialogOpen}
                                  onOpenChange={setIsDialogOpen}
                                >
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <TbEdit size={16} />
                                      <span className="ml-2">{t("translation:common.edit")}</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>

                                  <DialogContent className="sm:max-w-[500px] p-6">
                                    <DialogHeader>
                                      <DialogTitle>
                                        {t("language.title")}
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
                                        <Label>{t("language.language")}</Label>

                                        <Controller
                                          name="language"
                                          control={editControl}
                                          rules={{
                                            required: t("language.language") + " " + t("translation:common.isRequired"),
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
                                                <SelectValue placeholder={t("translation:common.select")} />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectGroup>
                                                  <SelectItem value="uz">UZ</SelectItem>
                                                  <SelectItem value="eng">Eng</SelectItem>
                                                  <SelectItem value="ru">Ru</SelectItem>
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
                                        <Label>{t("language.proficiencyLevel")}</Label>
                                        <Input
                                          {...editRegister("proficiencyLevel", {
                                            required: t("language.proficiencyLevel") + " " + t("translation:common.isRequired"),
                                          })}
                                          placeholder="e.g. Intermediate"
                                          className={`w-full border ${
                                            editErrors.proficiencyLevel
                                              ? "border-red-500 "
                                              : ""
                                          }`}
                                        />
                                        {editErrors.proficiencyLevel && (
                                          <p className="text-red-500">
                                            {
                                              editErrors.proficiencyLevel
                                                .message
                                            }
                                          </p>
                                        )}
                                      </div>

                                      <div className="space-y-2">
                                        <Controller
                                          name="file"
                                          control={editControl}
                                          rules={{
                                            required:  t("language.file") + " " + t("translation:common.isRequired") ,
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
                                          className="bg-blue-700 w-26 hover:bg-blue-600"
                                        >
                                          <Plus className="h-4 w-4 mr-1" /> {t("translation:common.add")}
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  </DialogContent>
                                </Dialog>

                                {/* Delete Dialog */}
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
                                      <AlertDialogTitle>{t("translation:common.alertTitle")}</AlertDialogTitle>
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
                                          <AiOutlineCheck size={16} /> {t("translation:common.yes")},
                                        {t("translation:common.delete")}
                                        </div>
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
