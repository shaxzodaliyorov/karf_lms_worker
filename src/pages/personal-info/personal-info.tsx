import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Ruler,
  Weight,
  Heart,
  Users,
  Footprints,
  GraduationCap,
  Globe,
  Languages,
  Award,
  Briefcase,
  Video,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  College,
  EmergencyContact,
  ForeignExperience,
  LanguageProficiency,
  ProfessionalCertificate,
  VideoDetails,
  WorkplaceInformation,
} from "./components";

const TAB_ITEMS = [
  {
    value: "emergency-contact",
    title: "Emergency Contact",
    icon: <User className="h-4 w-4" />,
  },
  {
    value: "college",
    title: "College",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    value: "foreign-experience",
    title: "Foreign Experience",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    value: "language-proficiency",
    title: "Language Proficiency",
    icon: <Languages className="h-4 w-4" />,
  },
  {
    value: "professional-certificate",
    title: "Professional Certificate",
    icon: <Award className="h-4 w-4" />,
  },
  {
    value: "workplace-info",
    title: "Workplace Information",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    value: "video",
    title: "Video",
    icon: <Video className="h-4 w-4" />,
  },
];

export const PersonalInfoPage = () => {
  const personalInfo = {
    name: "John",
    familyName: "Doe",
    dateOfBirth: "15/03/1990",
    country: "Uzbekistan",
    address: "123 Main Street, Tashkent, Uzbekistan",
    email: "john.doe@example.com",
    phone: "+998 90 123 45 67",
    alternativePhone: "+998 91 987 65 43",
    height: "175 cm",
    weight: "70 kg",
    religion: "Islam",
    maritalStatus: "Married",
    shoeSize: "42",
    bloodGroup: "A+",
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="w-full">
        <Tabs
          defaultValue="emergency-contact"
          orientation="vertical"
          className="flex-row"
        >
          {/* Vertical Tab List */}
          <div className="w-80 flex-shrink-0">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Profile Sections
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Complete all sections to enhance your profile
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <TabsList className="flex flex-col h-auto w-full bg-transparent p-2 space-y-1">
                  {TAB_ITEMS.map((item) => (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className="w-full justify-start gap-3 px-4 py-3 rounded-lg text-left data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 w-full">
                        {item.icon}
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardContent>
            </Card>
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            {/* Emergency Contact */}
            <TabsContent value="emergency-contact" className="mt-0">
              <EmergencyContact />
            </TabsContent>

            {/* College */}
            <TabsContent value="college" className="mt-0">
              <College />
            </TabsContent>

            {/* Foreign Experience */}
            <TabsContent value="foreign-experience" className="mt-0">
              <ForeignExperience />
            </TabsContent>

            {/* Language Proficiency */}
            <TabsContent value="language-proficiency" className="mt-0">
              <LanguageProficiency />
            </TabsContent>

            {/* Professional Certificate */}
            <TabsContent value="professional-certificate" className="mt-0">
              <ProfessionalCertificate />
            </TabsContent>

            {/* Workplace Information */}
            <TabsContent value="workplace-info" className="mt-0">
              <WorkplaceInformation />
            </TabsContent>

            {/* Video */}
            <TabsContent value="video" className="mt-0">
              <VideoDetails />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Basic Information
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base text-gray-900">{personalInfo.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Family Name
                  </p>
                  <p className="text-base text-gray-900">
                    {personalInfo.familyName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900">
                      {personalInfo.dateOfBirth}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Location</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Country</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900">
                      {personalInfo.country}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-base text-gray-900">
                    {personalInfo.address}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Contact Information
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-blue-600 hover:text-blue-800">
                      <a href={`mailto:${personalInfo.email}`}>
                        {personalInfo.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900">
                      {personalInfo.phone}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Alternative Phone
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900">
                      {personalInfo.alternativePhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Physical Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Physical Information
              </h3>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Height</p>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900">
                      {personalInfo.height}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Weight</p>
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900">
                      {personalInfo.weight}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Religion</p>
                  <p className="text-base text-gray-900">
                    {personalInfo.religion}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Marital Status
                  </p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <Badge variant="secondary" className="text-sm">
                      {personalInfo.maritalStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Additional Information
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Shoe Size</p>
                  <div className="flex items-center gap-2">
                    <Footprints className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900">
                      {personalInfo.shoeSize}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Blood Group
                  </p>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <Badge
                      variant="outline"
                      className="text-sm font-medium text-red-600 border-red-200"
                    >
                      {personalInfo.bloodGroup}
                    </Badge>
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
