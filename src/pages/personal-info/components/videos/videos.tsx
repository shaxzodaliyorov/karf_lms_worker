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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const VideoDetails = () => {
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
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Video className="h-5 w-5 text-blue-600" />
              Video Portfolio
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Professional video showcase and demonstrations
            </p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Video Summary Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Total Videos
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {totalVideos}
                </p>
              </div>

              <div className="rounded-lg border bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Total Duration
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {Math.round(totalDuration)}min
                </p>
              </div>

              <div className="rounded-lg border bg-purple-50 p-4">
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">
                    Latest Upload
                  </span>
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
                Video Showcase
              </h3>

              <div className="grid gap-6 lg:grid-cols-1">
                {/* Interview Video */}
                <Card className="border-l-4 border-l-green-500">
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
                            {getVideoIcon(videoInformation.interviewVideo.type)}
                            {videoInformation.interviewVideo.type}
                          </Badge>
                        </div>
                      </div>

                      {/* Video Thumbnail/Preview */}
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Video Preview</p>
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
                            Duration: {videoInformation.interviewVideo.duration}
                          </span>
                          <span>
                            Uploaded:{" "}
                            {videoInformation.interviewVideo.uploadDate}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Play Video
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Verification Video */}
                <Card className="border-l-4 border-l-blue-500">
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
                          <p className="text-sm text-gray-500">Video Preview</p>
                          <p className="text-xs text-gray-400">
                            {videoInformation.skillsVerificationVideo.duration}
                          </p>
                        </div>
                      </div>

                      {/* Video Details */}
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">
                          {videoInformation.skillsVerificationVideo.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {videoInformation.skillsVerificationVideo.description}
                        </p>

                        <div className="flex justify-between text-xs text-gray-500">
                          <span>
                            Duration:{" "}
                            {videoInformation.skillsVerificationVideo.duration}
                          </span>
                          <span>
                            Uploaded:{" "}
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
                          Play Video
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Experience Video */}
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Video Header */}
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
                          <p className="text-sm text-gray-500">Video Preview</p>
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
                            Duration:{" "}
                            {videoInformation.experienceVideo.duration}
                          </span>
                          <span>
                            Uploaded:{" "}
                            {videoInformation.experienceVideo.uploadDate}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Play Video
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
