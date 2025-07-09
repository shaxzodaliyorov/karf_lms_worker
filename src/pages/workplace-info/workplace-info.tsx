import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  Target,
  User,
  FileText,
  Download,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const WorkplaceInformationPage = () => {
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
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Workplace Information
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Professional work experience and employment history
            </p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Workplace Summary Stats */}
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
                                <Calendar className="h-4 w-4 text-orange-500" />
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
                                <Calendar className="h-4 w-4 text-red-500" />
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
