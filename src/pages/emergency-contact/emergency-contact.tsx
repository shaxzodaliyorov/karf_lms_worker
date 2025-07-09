import { Phone, User, Calendar, Heart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const EmergencyContactPage = () => {
  const emergencyContact = {
    relationship: "Mother",
    phoneNumber: "+998 90 123 45 67",
    fullName: "Sarah Johnson",
    dateOfBirth: "25/08/1965",
  };
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Heart className="h-5 w-5 text-red-500" />
              Emergency Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Relationship
                </p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {emergencyContact.relationship}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Phone Number
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-500" />
                  <p className="text-base text-gray-900 font-medium">
                    <a
                      href={`tel:${emergencyContact.phoneNumber}`}
                      className="text-green-600 hover:text-green-800 hover:underline"
                    >
                      {emergencyContact.phoneNumber}
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <p className="text-base text-gray-900 font-medium">
                    {emergencyContact.fullName}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Date of Birth
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <p className="text-base text-gray-900">
                    {emergencyContact.dateOfBirth}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border-2 border-red-100 bg-red-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900">
                    Emergency Contact
                  </h3>
                  <p className="text-sm text-red-700">
                    In case of emergency, contact:
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-red-800">
                    Name:
                  </span>
                  <span className="text-sm text-red-900 font-semibold">
                    {emergencyContact.fullName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-red-800">
                    Relationship:
                  </span>
                  <span className="text-sm text-red-900">
                    {emergencyContact.relationship}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-red-800">
                    Phone:
                  </span>
                  <a
                    href={`tel:${emergencyContact.phoneNumber}`}
                    className="text-sm text-red-900 font-semibold hover:underline"
                  >
                    {emergencyContact.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
