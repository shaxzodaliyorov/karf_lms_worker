import Dashboard from "@/layout/dashboard/dashboard";
import {
  AddWorkerPage,
  AllWorkersPage,
  AutoPartsManufacturingPage,
  ItDeveloperPage,
  MechanicalEngineerPage,
  SheetMetalPaintingMaintenancePage,
  SignInPage,
} from "@/pages";
import { CivilEngineeringExpertPage } from "@/pages/civil-engineering-expert/civil-engineering-expert";
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
    path: "/agent",
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
        path: "all",
        element: (
          <Dashboard>
            <AllWorkersPage />
          </Dashboard>
        ),
      },
      {
        path: "sheet-metal-painting-maintenance",
        element: (
          <Dashboard>
            <SheetMetalPaintingMaintenancePage />
          </Dashboard>
        ),
      },
      {
        path: "auto-parts-manufacturing",
        element: (
          <Dashboard>
            <AutoPartsManufacturingPage />
          </Dashboard>
        ),
      },
      {
        path: "civil-engineering-expert",
        element: (
          <Dashboard>
            <CivilEngineeringExpertPage />
          </Dashboard>
        ),
      },
      {
        path: "mechanical-engineer",
        element: (
          <Dashboard>
            <MechanicalEngineerPage />
          </Dashboard>
        ),
      },
      {
        path: "it-developer",
        element: (
          <Dashboard>
            <ItDeveloperPage />
          </Dashboard>
        ),
      },
      {
        path: "add-worker",
        element: (
          <Dashboard>
            <AddWorkerPage />
          </Dashboard>
        ),
      },
    ],
  },
]);
