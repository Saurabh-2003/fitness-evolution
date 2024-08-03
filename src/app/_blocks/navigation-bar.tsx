"use client";

import { Button } from "@/components/ui/button";
import { ROLE } from "@prisma/client";
import {
  CalendarIcon,
  HomeIcon,
  LayoutDashboard,
  MessageSquareTextIcon,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: ROLE[];
};

const navItems: NavItem[] = [
  { href: "/home", label: "Home", icon: HomeIcon, roles: ["USER", "TRAINER"] },
  {
    href: "/home",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN"],
  },
  { href: "/account", label: "account", icon: User2, roles: ["ADMIN"] },
  {
    href: "/schedules",
    label: "Schedules",
    icon: CalendarIcon,
    roles: ["USER", "ADMIN", "TRAINER"],
  },
  {
    href: "/messages",
    label: "Messages",
    icon: MessageSquareTextIcon,
    roles: ["USER", "ADMIN", "TRAINER"],
  },
  {
    href: "/account",
    label: "Account",
    icon: User2,
    roles: ["USER", "TRAINER"],
  },

  // You can add more items and roles here
];

type NavigationBarProps = {
  userRole: ROLE; // Current user's role
};

const NavigationBar: React.FC<NavigationBarProps> = ({ userRole }) => {
  const pathname = usePathname();

  return (
    <nav className="flex md:gap-5 items-center justify-between md:justify-center backdrop-blur rounded-3xl p-2 w-full h-16 ">
      {navItems
        .filter((item) => item.roles.includes(userRole)) // Filter items based on user role
        .map((item) => (
          <Link
            key={item.href}
            className="flex flex-col items-center"
            href={item.href}
          >
            <Button
              className="flex flex-col items-center  h-12 w-12 rounded-full "
              size="icon"
              variant={pathname === item.href ? "outline" : "ghost"} // Set variant based on active path
            >
              <item.icon className="h-6 w-6" />
              {/* <span className="text-sm">{item.label}</span> */}
            </Button>
          </Link>
        ))}
    </nav>
  );
};

export default NavigationBar;
