"use client";

import { buttonVariants } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/core/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    link?: string;
    icon: LucideIcon;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname();
  return (
    <div className="group flex  h-full w-full flex-col gap-4 py-2">
      {/* <nav className="flex md:flex-col flex-row md:h-20  min-w-80 w-full gap-1 px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link?.link!}
            className={cn(
              buttonVariants({
                variant: link.link === pathname ? "secondary" : "ghost", size: "sm",
              }),
              "justify-center md:justify-start py-2  h-12 w-full col-span-1"
            )}
          >
            <link.icon className="md:mr-3 mr-1 md:h-6 h-6 md:w-6 w-6" />
            <div className=" ">{link.title}</div>
            {link.label && (
              <span
                className={cn(
                  "ml-auto md:flex hidden",
                  link.link === pathname
                    ? "default"
                    : "text-background dark:text-white"
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav> */}
    </div>
  );
}
