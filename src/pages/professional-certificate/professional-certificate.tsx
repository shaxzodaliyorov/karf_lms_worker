import {
  Award,
  Building,
  Calendar,
  FileText,
  Download,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const ProfessionalCertificatePage = () => {
  const professionalCertificates = [
    {
      id: 1,
      certificateType: "Project Management Professional (PMP)",
      issuingInstitution: "Project Management Institute",
      issueDate: "15/06/2023",
      status: "Active",
      documents: [{ name: "PMP_Certificate.pdf", size: "1.8 MB", type: "pdf" }],
    },
    {
      id: 2,
      certificateType: "Microsoft Azure Fundamentals",
      issuingInstitution: "Microsoft Corporation",
      issueDate: "22/03/2023",
      status: "Active",
      documents: [
        {
          name: "Azure_Fundamentals_Certificate.pdf",
          size: "1.2 MB",
          type: "pdf",
        },
      ],
    },
    {
      id: 3,
      certificateType: "Certified Scrum Master",
      issuingInstitution: "Scrum Alliance",
      issueDate: "10/01/2023",
      status: "Active",
      documents: [
        { name: "Scrum_Master_Certificate.pdf", size: "2.1 MB", type: "pdf" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "expired":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "expired":
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const totalCertificates = professionalCertificates.length;
  const activeCertificates = professionalCertificates.filter(
    (cert) => cert.status === "Active"
  ).length;
  const totalDocuments = professionalCertificates.reduce(
    (acc, cert) => acc + cert.documents.length,
    0
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Award className="h-5 w-5 text-blue-600" />
              Professional Certificate
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Professional certifications and credentials
            </p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Certificate Summary Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Total Certificates
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {totalCertificates}
                </p>
              </div>

              <div className="rounded-lg border bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Active Certificates
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {activeCertificates}
                </p>
              </div>

              <div className="rounded-lg border bg-purple-50 p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">
                    Documents
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-1">
                  {totalDocuments}
                </p>
              </div>
            </div>

            <Separator />

            {/* Certificates List */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Certificate Details
              </h3>

              {professionalCertificates.map((certificate) => (
                <div key={certificate.id} className="relative">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Timeline dot */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 flex-shrink-0">
                          <Award className="h-6 w-6 text-blue-600" />
                        </div>

                        {/* Certificate details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {certificate.certificateType}
                            </h4>
                            <Badge
                              variant="outline"
                              className={getStatusColor(certificate.status)}
                            >
                              {getStatusIcon(certificate.status)}
                              {certificate.status}
                            </Badge>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Issuing Institution
                              </p>
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-blue-500" />
                                <p className="text-sm text-gray-900 font-medium">
                                  {certificate.issuingInstitution}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">
                                Issue Date
                              </p>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-green-500" />
                                <p className="text-sm text-gray-900">
                                  {certificate.issueDate}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Documents Section */}
                          {certificate.documents.length > 0 && (
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-gray-700">
                                Certificate Documents
                              </p>
                              <div className="grid gap-2">
                                {certificate.documents.map((doc, docIndex) => (
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
    </div>
  );
};
