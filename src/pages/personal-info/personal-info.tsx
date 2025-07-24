import {
  User,
  GraduationCap,
  Globe,
  Languages,
  Award,
  Briefcase,
  Video,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useTranslation } from "react-i18next";

export const PersonalInfoPage = () => {
  const { t } = useTranslation('profile');

  const TAB_ITEMS = [
    {
      value: "emergency-contact",
      title: t('sections.emergencyContact'),
      icon: <User className="h-4 w-4" />,
    },
    {
      value: "college",
      title: t('sections.college'),
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      value: "foreign-experience",
      title: t('sections.foreignExperience'),
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "language-proficiency",
      title: t('sections.languageProficiency'),
      icon: <Languages className="h-4 w-4" />,
    },
    {
      value: "professional-certificate",
      title: t('sections.professionalCertificate'),
      icon: <Award className="h-4 w-4" />,
    },
    {
      value: "workplace-info",
      title: t('sections.workplaceInfo'),
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      value: "video",
      title: t('sections.video'),
      icon: <Video className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen">
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
                  {t('sections.profile')}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {t('messages.completeProfile')}
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
};
