import Dashboard from "@/layout/dashboard/dashboard";
import {
  CollegePage,
  EmergencyContactPage,
  ForeignExperiencePage,
  LanguageProficiencyPage,
  PersonalInfoPage,
  ProfessionalCertificatePage,
  SettingsPage,
  SignInPage,
  WorkplaceInformationPage,
} from "@/pages";
import { VideoDetailsPage } from "@/pages/videos";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

export const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/sign-in" replace />,
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="sign-in" replace />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "select-role",
        element: <h1>SelectRolePage</h1>,
      },
      {
        path: "register-company",
        element: <h1>RegisterCompanyPage</h1>,
      },
    ],
  },
  {
    path: "/worker",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Dashboard>
            <h1>Dashboard</h1>
          </Dashboard>
        ),
      },
      {
        path: "personal-info",
        element: (
          <Dashboard>
            <PersonalInfoPage />
          </Dashboard>
        ),
      },

      {
        path: "emergency-contact",
        element: (
          <Dashboard>
            <EmergencyContactPage />
          </Dashboard>
        ),
      },
      {
        path: "college",
        element: (
          <Dashboard>
            <CollegePage />
          </Dashboard>
        ),
      },
      {
        path: "foreign-experience",
        element: (
          <Dashboard>
            <ForeignExperiencePage />
          </Dashboard>
        ),
      },
      {
        path: "language-proficiency",
        element: (
          <Dashboard>
            <LanguageProficiencyPage />
          </Dashboard>
        ),
      },
      {
        path: "professional-certificate",
        element: (
          <Dashboard>
            <ProfessionalCertificatePage />
          </Dashboard>
        ),
      },
      {
        path: "workplace-info",
        element: (
          <Dashboard>
            <WorkplaceInformationPage />
          </Dashboard>
        ),
      },
      {
        path: "videos",
        element: (
          <Dashboard>
            <VideoDetailsPage />
          </Dashboard>
        ),
      },
      {
        path: "settings",
        element: (
          <Dashboard>
            <SettingsPage />
          </Dashboard>
        ),
      },
    ],
  },
]);
