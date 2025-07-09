import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../side-bar";
import { DashboardHeader } from "../dashboard-header/dashboard-header";

type UserRole = "Admin" | "Company" | "Agency" | "Worker";

const mockUsers: Record<UserRole, { name: string; email: string }> = {
  Admin: { name: "John Admin", email: "admin@company.com" },
  Company: { name: "Sarah Manager", email: "sarah@company.com" },
  Agency: { name: "Mike Agent", email: "mike@agency.com" },
  Worker: { name: "Lisa Worker", email: "lisa@company.com" },
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = React.useState<UserRole>("Admin");
  const [activeUrl, setActiveUrl] = React.useState(
    `/${currentRole.toLowerCase()}/dashboard`
  );

  React.useEffect(() => {
    setActiveUrl(`/${currentRole.toLowerCase()}/dashboard`);
  }, [currentRole]);

  const currentUser = mockUsers[currentRole];

  return (
    <SidebarProvider>
      <AppSidebar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeUrl={activeUrl}
      />
      <SidebarInset>
        <DashboardHeader
          userName={currentUser.name}
          userEmail={currentUser.email}
          userRole={currentRole}
        />
        <main className="p-10 pt-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
