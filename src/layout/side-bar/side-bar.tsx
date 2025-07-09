import type * as React from "react";
import {
  Award,
  Briefcase,
  ChevronRight,
  Globe,
  GraduationCap,
  Languages,
  LogOut as LogOutIcon,
  User,
  Video,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type UserRole = "Admin" | "Company" | "Agency" | "Worker";

interface NavigationItem {
  title: string;
  url: string;
  icon: {
    outline: React.ReactNode;
    filled: React.ReactNode;
  };
  items?: {
    title: string;
    url: string;
    icon?: {
      outline: React.ReactNode;
      filled: React.ReactNode;
    };
  }[];
}

const navigationData: NavigationItem[] = [
  {
    title: "Personal Information",
    url: "/worker/personal-info",
    icon: {
      outline: <User size={16} />,
      filled: <User size={16} />,
    },
  },
  {
    title: "Emergency Contact",
    url: "/worker/emergency-contact",
    icon: {
      outline: <User />,
      filled: <User />,
    },
  },
  {
    title: "College",
    url: "/worker/college",
    icon: {
      outline: <GraduationCap size={16} />,
      filled: <GraduationCap size={16} />,
    },
  },
  {
    title: "Foreign Experience",
    url: "/worker/foreign-experience",
    icon: {
      outline: <Globe />,
      filled: <Globe />,
    },
  },
  {
    title: "Language Proficiency",
    url: "/worker/language-proficiency",
    icon: {
      outline: <Languages />,
      filled: <Languages />,
    },
  },
  {
    title: "Professional Certificate",
    url: "/worker/professional-certificate",
    icon: {
      outline: <Award />,
      filled: <Award />,
    },
  },
  {
    title: "Workplace Information",
    url: "/worker/workplace-info",
    icon: {
      outline: <Briefcase />,
      filled: <Briefcase />,
    },
  },
  {
    title: "video",
    url: "/worker/videos",
    icon: {
      outline: <Video />,
      filled: <Video />,
    },
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeUrl: string;
}

export function AppSidebar({ activeUrl, ...props }: AppSidebarProps) {
  const { pathname } = useLocation();
  const userName = "John Doe";
  const userEmail = "john.doe@example.com";
  const userAvatarUrl =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center py-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
            <img
              src={userAvatarUrl}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm font-semibold">{userName}</span>
          <span className="text-xs text-gray-500">{userEmail}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData?.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + "/");

                if (item.items) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.items.some(
                        (subItem) => activeUrl === subItem.url
                      )}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={isActive}
                          >
                            {isActive ? item.icon.filled : item.icon.outline}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <Tooltip key={subItem.title}>
                                <TooltipTrigger>
                                  <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={activeUrl === subItem.url}
                                      className="!data-[active=true]:bg-primary"
                                    >
                                      <Link to={subItem.url}>
                                        {subItem.icon &&
                                          (activeUrl === subItem.url
                                            ? subItem.icon.filled
                                            : subItem.icon.outline)}
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  <p>{subItem.title}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <Tooltip key={item.title}>
                    <TooltipTrigger>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          isActive={isActive}
                          className="data-[active=true]:bg-blue-600 data-[active=true]:text-white "
                        >
                          <Link to={item.url}>
                            {isActive ? item.icon.filled : item.icon.outline}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton variant={"default"} color="destructive">
              <LogOutIcon />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
