import Dashboard from "@/layout/dashboard/dashboard";
import { PersonalInfoPage, SignInPage } from "@/pages";
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
    ],
  },
]);
