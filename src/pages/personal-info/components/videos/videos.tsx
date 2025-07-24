import {
  Video,
  Play,
  ExternalLink,
  Eye,
  Download,
  Clock,
  User,
  Award,
  Briefcase,
  Plus,
} from "lucide-react";
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type CertificateFormValues = {
  videoLink: string;
};

export const VideoDetails = () => {
  const { t } = useTranslation(["video", "translation"]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
  } = useForm<CertificateFormValues>();

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
  } = useForm<CertificateFormValues>();

  const onAddSubmit = (data: CertificateFormValues) => {
    console.log("Add Data:", data);
  };

  const onEditSubmit = (data: CertificateFormValues) => {
    console.log("Edit Data:", data);
  };

  const videoInformation = {
    interviewVideo: {
      type: "YouTube Link",
      url: "https://youtube.com/watch?v=abc123interview",
      title: "Professional Interview Video",
      duration: "15:30",
      uploadDate: "25/05/2023",
      description:
        "Comprehensive interview showcasing communication skills and professional background",
    },
    skillsVerificationVideo: {
      type: "Uploaded Video",
      url: "skills_demo_video.mp4",
      title: "Technical Skills Demonstration",
      duration: "12:45",
      uploadDate: "18/06/2023",
      description:
        "Live coding demonstration and technical problem-solving showcase",
    },
    experienceVideo: {
      type: "YouTube Link",
      url: "https://youtube.com/watch?v=xyz789experience",
      title: "Work Experience Portfolio",
      duration: "20:15",
      uploadDate: "10/07/2023",
      description:
        "Detailed walkthrough of previous projects and professional achievements",
    },
  };

  const getVideoTypeColor = (type: string) => {
    switch (type) {
      case "YouTube Link":
        return "bg-red-50 text-red-700 border-red-200";
      case "Uploaded Video":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getVideoIcon = (type: string) => {
    switch (type) {
      case "YouTube Link":
        return <ExternalLink className="h-4 w-4" />;
      case "Uploaded Video":
        return <Video className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const totalVideos = Object.keys(videoInformation).length;
  const totalDuration = Object.values(videoInformation).reduce((acc, video) => {
    const [minutes, seconds] = video.duration.split(":").map(Number);
    return acc + minutes + seconds / 60;
  }, 0);

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  <Video className="h-5 w-5 text-blue-600" />
                  {t("video.title")}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">{t("video.subtitle")}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-1" /> 
                    {t("translation:common.add")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("video.title")}</DialogTitle>
                  </DialogHeader>

                  <form
                    onSubmit={handleAddSubmit(onAddSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="videoLink">{t("video.link")}</Label>
                      <Input
                        id="videoLink"
                        placeholder="https://www.youtube.com/watch?v=..."
                        type="url"
                        {...addRegister("videoLink", {
                          required: "Video link is required",
                          pattern: {
                            value:
                              /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=.+$/,
                            message: "Enter a valid YouTube URL",
                          },
                        })}
                        className={addErrors.videoLink ? "border-red-500" : ""}
                      />
                      {addErrors.videoLink && (
                        <p className="text-red-500">
                          {addErrors.videoLink.message}
                        </p>
                      )}
                    </div>

                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-blue-700 w-25 hover:bg-blue-600"
                      >
                        {t("translation:common.add")}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Video Summary Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">{t("video.stats.totalVideos")}</span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {totalVideos}
                </p>
              </div>

              <div className="rounded-lg border bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">{t("video.stats.totalDuration")}</span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {Math.round(totalDuration)}min
                </p>
              </div>

              <div className="rounded-lg border bg-purple-50 p-4">
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">{t("video.stats.latestUpload")}</span>
                </div>
                <p className="text-lg font-bold text-purple-900 mt-1">
                  10/07/2023
                </p>
              </div>
            </div>

            <Separator />

            {/* Video Portfolio */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                {t("video.showcase")}
              </h3>

              <div className="grid gap-6 lg:grid-cols-1">
                {/* Interview Video */}
                <Card className="border-l-4 border-l-green-500">
                  <div className="relative">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Video Header */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Interview Video
                            </h4>
                            <Badge
                              variant="outline"
                              className={getVideoTypeColor(
                                videoInformation.interviewVideo.type
                              )}
                            >
                              {getVideoIcon(
                                videoInformation.interviewVideo.type
                              )}
                              {videoInformation.interviewVideo.type}
                            </Badge>
                          </div>
                        </div>

                        {/* Video Thumbnail/Preview */}
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">
                              Video Preview
                            </p>
                            <p className="text-xs text-gray-400">
                              {videoInformation.interviewVideo.duration}
                            </p>
                          </div>
                        </div>

                        {/* Video Details */}
                        <div className="space-y-2">
                          <h5 className="font-medium text-gray-900">
                            {videoInformation.interviewVideo.title}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {videoInformation.interviewVideo.description}
                          </p>

                          <div className="flex justify-between text-xs text-gray-500">
                            <span>
                              {t("video.duration")}:{" "}
                              {videoInformation.interviewVideo.duration}
                            </span>
                            <span>
                              {t("video.uploaded")}:{" "}
                              {videoInformation.interviewVideo.uploadDate}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Play className="h-4 w-4 mr-2" />
                            {t("video.play")}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <div className="absolute top-0 right-2">
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
                                  <span className="ml-2">{t("translation:common.edit")}</span>
                                </DropdownMenuItem>
                              </DialogTrigger>

                              <DialogContent className="sm:max-w-[500px] p-6">
                                <DialogHeader>
                                  <DialogTitle>
                                    {t("translation:common.edit")} {t("video.title")}
                                  </DialogTitle>
                                </DialogHeader>

                                <form
                                  onSubmit={handleEditSubmit(onEditSubmit)}
                                  className="grid gap-4"
                                >
                                  <div className="grid gap-2">
                                    <Label htmlFor="videoLink">
                                      {t("video.link")}
                                    </Label>
                                    <Input
                                      id="videoLink"
                                      placeholder="https://www.youtube.com/watch?v=..."
                                      type="url"
                                      {...editRegister("videoLink", {
                                        required: t("video.link") + " " + t("translation:common.isRequired"),
                                        pattern: {
                                          value:
                                            /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=.+$/,
                                          message: "Enter a valid YouTube URL",
                                        },
                                      })}
                                      className={
                                        editErrors.videoLink
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                    {editErrors.videoLink && (
                                      <p className="text-red-500">
                                        {editErrors.videoLink.message}
                                      </p>
                                    )}
                                  </div>

                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      className="bg-blue-700 w-25 hover:bg-blue-600"
                                    >
                                      <Plus className="h-4 w-4 mr-1" /> {t("translation:common.edit")}
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
                  </div>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <div className="relative">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Video Header */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Award className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Skills Verification Video
                            </h4>
                            <Badge
                              variant="outline"
                              className={getVideoTypeColor(
                                videoInformation.skillsVerificationVideo.type
                              )}
                            >
                              {getVideoIcon(
                                videoInformation.skillsVerificationVideo.type
                              )}
                              {videoInformation.skillsVerificationVideo.type}
                            </Badge>
                          </div>
                        </div>

                        {/* Video Thumbnail/Preview */}
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">
                              Video Preview
                            </p>
                            <p className="text-xs text-gray-400">
                              {
                                videoInformation.skillsVerificationVideo
                                  .duration
                              }
                            </p>
                          </div>
                        </div>

                        {/* Video Details */}
                        <div className="space-y-2">
                          <h5 className="font-medium text-gray-900">
                            {videoInformation.skillsVerificationVideo.title}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {
                              videoInformation.skillsVerificationVideo
                                .description
                            }
                          </p>

                          <div className="flex justify-between text-xs text-gray-500">
                            <span>
                              {t("video.duration")}:{" "}
                              {
                                videoInformation.skillsVerificationVideo
                                  .duration
                              }
                            </span>
                            <span>
                              {t("video.uploaded")}:{" "}
                              {
                                videoInformation.skillsVerificationVideo
                                  .uploadDate
                              }
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Play className="h-4 w-4 mr-2" />
                            {t("video.play")}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <div className="absolute top-0 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <PiDotsThreeOutlineVerticalFill />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="mr-4">
                          <DropdownMenuGroup>
                            {/* Edit */}
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
                                    {t("translation:common.edit")} {t("video.title")}
                                  </DialogTitle>
                                </DialogHeader>

                                <form
                                  onSubmit={handleEditSubmit(onAddSubmit)}
                                  className="grid gap-4"
                                >
                                  <div className="grid gap-2">
                                    <Label htmlFor="videoLink">
                                      {t("video.link")}
                                    </Label>
                                    <Input
                                      id="videoLink"
                                      placeholder="https://example.com/video.mp4"
                                      type="url"
                                      {...editRegister("videoLink", {
                                        required: t("video.link") + " " + t("translation:common.isRequired"),
                                        pattern: {
                                          value:
                                            /^(https?:\/\/)(www\.)?((youtube\.com\/watch\?v=.+)|(vimeo\.com\/.+)|([^\s]+\.mp4))$/,
                                          message:
                                            "Enter a valid video URL (YouTube, Vimeo, mp4)",
                                        },
                                      })}
                                      className={`w-full border ${
                                        addErrors.videoLink
                                          ? "border-red-500"
                                          : "border-gray-300"
                                      } rounded px-3 py-2`}
                                    />
                                    {addErrors.videoLink && (
                                      <p className="text-red-500">
                                        {addErrors.videoLink.message}
                                      </p>
                                    )}
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      className="bg-blue-700 w-25 hover:bg-blue-600"
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      {t("translation:common.add")}
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
                                  <span className="ml-2">
                                    {t("translation:common.delete")}
                                  </span>
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
                  </div>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <div className="relative">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <Briefcase className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Experience Video
                            </h4>
                            <Badge
                              variant="outline"
                              className={getVideoTypeColor(
                                videoInformation.experienceVideo.type
                              )}
                            >
                              {getVideoIcon(
                                videoInformation.experienceVideo.type
                              )}
                              {videoInformation.experienceVideo.type}
                            </Badge>
                          </div>
                        </div>

                        {/* Video Thumbnail/Preview */}
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">
                              Video Preview
                            </p>
                            <p className="text-xs text-gray-400">
                              {videoInformation.experienceVideo.duration}
                            </p>
                          </div>
                        </div>

                        {/* Video Details */}
                        <div className="space-y-2">
                          <h5 className="font-medium text-gray-900">
                            {videoInformation.experienceVideo.title}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {videoInformation.experienceVideo.description}
                          </p>

                          <div className="flex justify-between text-xs text-gray-500">
                            <span>
                              {t("video.duration")}:{" "}
                              {videoInformation.experienceVideo.duration}
                            </span>
                            <span>
                              {t("video.uploaded")}:{" "}
                              {videoInformation.experienceVideo.uploadDate}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Play className="h-4 w-4 mr-2" />
                            {t("video.play")}
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <div className="absolute top-0 right-2">
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
                                  <span className="ml-2">{t("translation:common.edit")}</span>
                                </DropdownMenuItem>
                              </DialogTrigger>

                              <DialogContent className="sm:max-w-[500px] p-6">
                                <DialogHeader>
                                  <DialogTitle>
                                    {t("translation:common.edit") + " " + t("video.title")}
                                  </DialogTitle>
                                </DialogHeader>

                                <form
                                  onSubmit={handleEditSubmit(onEditSubmit)}
                                  className="grid gap-4"
                                >
                                  <div className="grid gap-2">
                                    <Label htmlFor="videoLink">
                                      {t("video.link")}
                                    </Label>
                                    <Input
                                      id="videoLink"
                                      placeholder="https://example.com/video.mp4"
                                      type="url"
                                      {...editRegister("videoLink", {
                                        required: (t("video.link") + " " + t("translation:common.isRequired")),
                                        pattern: {
                                          value:
                                            /^(https?:\/\/)(www\.)?((youtube\.com\/watch\?v=.+)|(vimeo\.com\/.+)|([^\s]+\.mp4))$/,
                                          message:
                                            "Enter a valid video URL (YouTube, Vimeo, mp4)",
                                        },
                                      })}
                                      className={`w-full border ${
                                        editErrors.videoLink
                                          ? "border-red-500"
                                          : "border-gray-300"
                                      } rounded px-3 py-2`}
                                    />
                                    {editErrors.videoLink && (
                                      <p className="text-red-500">
                                        {editErrors.videoLink.message}
                                      </p>
                                    )}
                                  </div>

                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      className="bg-blue-700 w-25 hover:bg-blue-600"
                                    >
                                      <Plus className="h-4 w-4 mr-1" /> {t("translation:common.add")}
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
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
