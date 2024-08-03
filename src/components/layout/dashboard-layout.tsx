"use client";


import { Separator } from "@/components/ui/separator";
import { cn } from "@/core/lib/utils";
import { Icons } from "@/assets/icon/icons";

import Link from "next/link";
import { ReactNode, useState } from "react";
import SignOutButton from "../auth/signout-button";
import { TooltipProvider } from "../ui/tooltip";

import UserAvatar from "./avatar-box";
import { ModeToggle } from "./modeToggle";
import { Nav } from "./nav";
import { routes } from "@/resource/routes/routes";
import { language } from "@/resource/language/language";
import { ROLE } from "@prisma/client";


const DashboardLayoutStyles = {
  RESIZABLE_PANEL_GROUP: "h-screen border items-stretch",
  RESIZABLE_PANEL1:
    "h-screen w-full relative min-w-[36px] transition-all duration-300 ease-in-out",
  ICONS: "h-6 w-6 mr-2",
  ICON_DIV: "flex flex-row w-full",
  ICON_SPAN: "text-xl font-bold",
  AVATAR_DIV:
    "h-auto max-w-14 absolute bottom-5 p-2  w-full hidden md:flex flex-col gap-2 justify-start items-center",
  RESIZABLE_PANEL2: "h-screen overflow-y-auto",
};



const DashboardLayout = ({
  children,
  count,
  role,
}: {
  children: ReactNode;
  count: { user: number , message: number };
  role: ROLE;
  
}) => {
  const defaultLayout = [20, 80];
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userRoute = [
    {
      title: language.HOME,
      label: `0`,
      icon: Icons.HOME,
      link: routes.DASHBOARD_LAYOUT.HOME,
    },
  
    {
      title: language.CALENDAR,
      label: '0',
      icon: Icons.CALENDAR,
      link: routes.DASHBOARD_LAYOUT.CALENDAR,
    },
    {
      title: language.MESSAGES,
      label: count?.message?.toString(),
      icon: Icons.MESSAGECIRCLEQUESTION,
      link: routes.DASHBOARD_LAYOUT.MESSAGES,
    },
  ];
  
  const adminRoute = [
    {
      title: language.DASHBOARD,
      label: `0`,
      icon: Icons.LAYOUTDASHBOARD,
      link: routes.DASHBOARD_LAYOUT.DASHBOARD,
    },
  
    {
      title: language.USERS,
      label: count?.user?.toString(),
      icon: Icons.USERS,
      link: routes.DASHBOARD_LAYOUT.USERS,
    },
    {
      title: language.MESSAGES,
      label: `0`,
      icon: Icons.MESSAGECIRCLEQUESTION,
      link: routes.DASHBOARD_LAYOUT.MESSAGES,
    },
    {
      title: language.CALENDAR,
      label: '0',
      icon: Icons.CALENDAR,
      link: routes.DASHBOARD_LAYOUT.CALENDAR,
    },
  ];
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex pt-16 md:pt-0 flex-col-reverse md:flex-row h-screen">
        <div
          className={cn(isCollapsed && DashboardLayoutStyles.RESIZABLE_PANEL1)}
        >
          <div
            className={cn(
              "hidden h-[52px] md:flex items-start  justify-start",
              isCollapsed ? "h-[52px] p-4" : "p-4"
            )}
          >
            <Link href={"/"}>
              <div className={DashboardLayoutStyles.ICON_DIV}>
                <span
                  className={cn(
                    DashboardLayoutStyles.ICON_SPAN,
                    isCollapsed && "hidden"
                  )}
                >
                  {language.FITNESS_EVOLUTION}
                </span>
              </div>
            </Link>
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={role === ROLE.ADMIN ? adminRoute : userRoute}
          />
          <div className={DashboardLayoutStyles.AVATAR_DIV}>
            <UserAvatar src={""} name={""} email={""} />
            <ModeToggle />
            <SignOutButton />
          </div>

          <div className="h-20 md:hidden w-full flex flex-row justify-between items-center fixed top-0 p-2">
            <Link href={"/"} className="p-2">
              <div className={DashboardLayoutStyles.ICON_DIV}>
                <span
                  className={cn(
                    DashboardLayoutStyles.ICON_SPAN,
                    isCollapsed && "hidden"
                  )}
                >
                  {language.FITNESS_EVOLUTION}
                </span>
              </div>
            </Link>
            <div className="flex flex-row items-center gap-2">
              <UserAvatar src={""} name={""} email={""} />
              <ModeToggle />
              <SignOutButton />
            </div>
          </div>
        </div>
        <div className={DashboardLayoutStyles.RESIZABLE_PANEL2}>{children}</div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardLayout;
