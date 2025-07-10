import {
  Globe,
  MapPin,
  Clock,
  Target,
  FileText,
  Download,
  Eye,
  Calendar,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const ForeignExperience = () => {
  const foreignExperiences = [
    {
      id: 1,
      visitedCountry: "United States",
      duration: "6 months",
      purpose: "Work",
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
      purpose: "Study",
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
      purpose: "Tourism",
      startDate: "10/05/2022",
      endDate: "24/05/2022",
      documents: [
        { name: "Tourist_Visa_Japan.pdf", size: "1.2 MB", type: "pdf" },
      ],
      description: "Cultural exploration and sightseeing tour",
    },
  ];

  const getPurposeColor = (purpose: string) => {
    switch (purpose.toLowerCase()) {
      case "work":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "study":
        return "bg-green-50 text-green-700 border-green-200";
      case "tourism":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "business":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPurposeIcon = (purpose: string) => {
    switch (purpose.toLowerCase()) {
      case "work":
        return "💼";
      case "study":
        return "📚";
      case "tourism":
        return "🏖️";
      case "business":
        return "🤝";
      default:
        return "🌍";
    }
  };

  const totalCountries = foreignExperiences.length;
  const totalDuration = foreignExperiences.reduce((acc, exp) => {
    // Simple duration calculation - in a real app you'd parse the duration properly
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
        <CardHeader className="border-b bg-white">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Globe className="h-5 w-5 text-blue-600" />
            Foreign Experience
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            International travel and experience history
          </p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Experience Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-blue-50 p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Countries Visited
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
                  Total Duration
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
                  Main Purpose
                </span>
              </div>
              <p className="text-lg font-bold text-purple-900 mt-1">Work</p>
            </div>

            <div className="rounded-lg border bg-orange-50 p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  Documents
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

          {/* Experience Timeline */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              International Experience Timeline
            </h3>

            {foreignExperiences.map((experience) => (
              <div key={experience.id} className="relative">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Timeline dot */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
                        <span className="text-lg">
                          {getPurposeIcon(experience.purpose)}
                        </span>
                      </div>

                      {/* Experience details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            {experience.visitedCountry}
                          </h4>
                          <Badge
                            variant="outline"
                            className={getPurposeColor(experience.purpose)}
                          >
                            {experience.purpose}
                          </Badge>
                        </div>

                        {experience.description && (
                          <p className="text-sm text-gray-600 italic">
                            {experience.description}
                          </p>
                        )}

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                              Duration
                            </p>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-green-500" />
                              <p className="text-sm text-gray-900 font-medium">
                                {experience.duration}
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
                                {experience.startDate}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                              End Date
                            </p>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-purple-500" />
                              <p className="text-sm text-gray-900">
                                {experience.endDate}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Documents Section */}
                        {experience.documents.length > 0 && (
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-700">
                              Supporting Documents
                            </p>
                            <div className="grid gap-2 md:grid-cols-2">
                              {experience.documents.map((doc, docIndex) => (
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
