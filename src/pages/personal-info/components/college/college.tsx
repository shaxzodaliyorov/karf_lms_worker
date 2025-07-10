"use client";

import {
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  CalendarCheck,
  MapPin,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const College = () => {
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
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            Education History
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Complete academic background and qualifications
          </p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Education Summary Stats */}
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

          {/* Education Timeline */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Academic Journey
            </h3>

            {educationHistory.map((education) => (
              <div key={education.id} className="relative">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Timeline dot */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>

                      {/* Education details */}
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
                              <Calendar className="h-4 w-4 text-orange-500" />
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
                              <Calendar className="h-4 w-4 text-blue-500" />
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
