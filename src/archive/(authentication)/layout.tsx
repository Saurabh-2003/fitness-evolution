import logo from "@/assets/icon/logo.jpg";
import { auth } from "@/core/auth/auth";
import { language } from "@/resource/language/language";
import { routes } from "@/resource/routes/routes";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const AuthLayoutStyles = {
  MAIN_DIV:
    "w-full h-screen flex flex-col md:flex-row justify-center items-center",
  IMAGE_DIV: "relative w-full h-full flex-col bg-muted p-10 text-white",
  IMAGE: "object-cover h-full w-full absolute top-0 inset-0",
  LOGO_DIV: "absolute inset-0",
  ICON_DIV: "relative z-20 flex items-center gap-3 text-xl font-medium",
  ICON: "h-6 w-6 mr-2",
  FORM_DIV: "w-full h-full lg:p-8",
  CHILDREN_DIV: "mx-auto flex w-full h-full flex-col justify-center space-y-2",
  TERM_P:
    "w-full px-8 text-center text-sm text-muted-foreground flex gap-1 flex-wrap item-center justify-center",
  TERM_LINK: "underline underline-offset-4 hover:text-primary",
  PRIVACY_LINK: "underline underline-offset-4 hover:text-primary",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) {
    return redirect("/home");
  }
  return (
    <div className={AuthLayoutStyles.MAIN_DIV}>
      <div className={AuthLayoutStyles.IMAGE_DIV}>
        <Image
          src={`https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt="authentication"
          fill
          className={AuthLayoutStyles.IMAGE}
        />
        <div className={AuthLayoutStyles.LOGO_DIV} />
        <Link href={"/"}>
          <div className={AuthLayoutStyles.ICON_DIV}>
            <Image
              src={logo}
              alt="logo"
              width={400}
              height={400}
              className="h-10 w-10 object-cover rounded-full"
            />
            {language.FITNESS_EVOLUTION}
          </div>
        </Link>
      </div>
      <div className={AuthLayoutStyles.FORM_DIV}>
        <div className={AuthLayoutStyles.CHILDREN_DIV}>
          {children}
          <p className={AuthLayoutStyles.TERM_P}>
            {language.TERM_PARA}
            <Link
              href={routes.AUTH_LAYOUT.TERMS}
              className={AuthLayoutStyles.TERM_LINK}
            >
              {language.TERMS_OF_SERVICE}
            </Link>
            {language.AND}
            <Link
              href={routes.AUTH_LAYOUT.SERVICE}
              className={AuthLayoutStyles.PRIVACY_LINK}
            >
              {language.PRIVACY_POLICY}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
