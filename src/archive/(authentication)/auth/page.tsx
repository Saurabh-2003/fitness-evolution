import SignInButton from "@/components/auth/signin-button";
import { language } from "@/resource/language/language";

const SignInPageStyle = {
  SIGN_DIV: "flex flex-col pb-10 space-y-4 text-center",
  H1: "text-2xl font-semibold tracking-tight",
  P: "text-sm py-2 text-muted-foreground"
}

export default function SignInPage() {
  return (
    <>
      <div className={SignInPageStyle.SIGN_DIV}>
        <h1 className={SignInPageStyle.H1}>
          {language.SIGN_IN_ACCOUNT}
        </h1>
        <p className={SignInPageStyle.P}>
         {language.SIGN_IN_P}
        </p>
        <SignInButton />
      </div>
    </>
  );
}
