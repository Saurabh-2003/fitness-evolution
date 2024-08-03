'use client'

import { signIn } from "next-auth/react";
import { Button } from "../ui/button"
import { Icons } from "@/assets/icon/icons"
import { constant } from "@/resource/constant/constants"
import { language } from "@/resource/language/language"
import { routes } from "@/resource/routes/routes"
import { Loader } from "lucide-react"
import React from "react"
import { toast } from "sonner"

const SignInButtonStyles = {
  LOADER: 'h-4 w-4 mr-2 animate-spin',
  BUTTON: 'transition-all duration-300 w-80 py-2',
  ICON: 'h-4 w-4 mr-2',
};


const SignInButton = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const HandleSignin = async () => {
    try {
      setLoading(true);
      await signIn(constant.GOOGLE, {
        callbackUrl: routes.DASHBOARD.HOME,
        redirect: true,
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
    <div className="flex items-center justify-center w-full px-10 md:px-5">
      <Button
        disabled={loading}
        variant={"outline"}
        onClick={() => HandleSignin()}
        type="button"
        className={SignInButtonStyles.BUTTON}
      >
        {loading ? (
          <Loader className={SignInButtonStyles.LOADER} />
        ) : (
          <Icons.GOOGLE className={SignInButtonStyles.ICON} />
        )}
        {loading ? language.SIGNING : language.SIGN_WITH_GOOGLE}
      </Button>
    </div>
  );
};

export default SignInButton;
