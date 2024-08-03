import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "./modeToggle";
import SignOutButton from "../auth/signout-button";
import { TooltipProvider } from "../ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const UserAvatarStyles = {
  BUTTON: "relative h-8 w-8 rounded-full",
  AVATAR: "h-8 w-8",
  DROPDOWN_MENU_CONTENT: "w-56",
  DROPDOWN_LABEL: "font-normal",
  P_DIV: "flex flex-col space-y-1",
  P1: "text-sm font-medium leading-none",
  P2: "text-xs leading-none text-muted-foreground",
};

type UserAvatarProps = {
  src: string;
  name: string;
  email: string;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name, email }) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <TooltipProvider delayDuration={0}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={UserAvatarStyles.BUTTON}>
            <Avatar className={UserAvatarStyles.AVATAR}>
              <AvatarImage src={src} alt={name} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={UserAvatarStyles.DROPDOWN_MENU_CONTENT}
          align="end"
          forceMount
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Suspense
            fallback={
              <div className="flex items-center space-x-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            }
          >
            <DropdownMenuLabel
              className={UserAvatarStyles.DROPDOWN_LABEL}
              asChild
            >
              <Link href="/account">
                <div className={UserAvatarStyles.P_DIV}>
                  <p className={UserAvatarStyles.P1}>{name}</p>
                  <p className={UserAvatarStyles.P2}>{email}</p>
                </div>
              </Link>
            </DropdownMenuLabel>
          </Suspense>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ModeToggle />
            <span>Theme Switch</span>
            {/* <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

export default UserAvatar;
