"use client";

import { Icons } from "@/assets/icon/icons";
import { signOut } from "next-auth/react";
import { language } from "@/resource/language/language";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SignOutButtonStyles = {
  BUTTON: "transition-all duration-300",
  LOADER: "h-4 w-4 animate-spin",
  LOGOUTICON: "h-4 w-4 ",
};

const SignOutButton = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const HandleSignOut = async () => {
    try {
      setLoading(true);
      signOut({
        callbackUrl: "/auth",
        redirect: true
      });
    } catch (error: any) {
      toast.error(error?.message);
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
  };
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={loading}
            variant="ghost"
            size={"sm"}
            onClick={() => HandleSignOut()}
            type="button"
            className={SignOutButtonStyles.BUTTON}
          >
            {loading ? (
              <Icons.LOADER className={SignOutButtonStyles.LOADER} />
            ) : (
              <Icons.LOGOUTICON className={SignOutButtonStyles.LOGOUTICON} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs pl-3">{language.LOGOUT_NOW}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default SignOutButton;
