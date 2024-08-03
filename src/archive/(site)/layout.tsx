import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { auth } from "@/core/auth/auth";


const SiteLayout = async ({ children }: any) => {
  const session = await auth();
  return (
    <div className="w-full h-full max-h-screen max-w-3xl mx-auto">
      <Header session={session}/>
      {children}
      <Footer />
    </div>
  );
};

export default SiteLayout;
