import React, { Suspense } from "react";
import NavigationBar from "../_blocks/navigation-bar";
import { auth } from "@/core/auth/auth";
import { db } from "@/core/client/client";
import HeaderBar from "../_blocks/header-bar";
import BreadCrumbs from "@/components/common/breadcrumbs";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    return redirect("/auth");
  }
  const userData = await db.user.findFirst({
    where: {
      email: session?.user?.email as string,
    },
  });

  return (
    <div className="flex flex-col h-dvh">
      <Suspense fallback={null}>
        <HeaderBar
          src={userData?.image || ""}
          name={userData?.name || ""}
          email={userData?.email || ""}
        />
      </Suspense>
      {/* <Suspense fallback={null}>
        <BreadCrumbs />
      </Suspense> */}
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Suspense fallback={null}>
        <NavigationBar userRole={userData?.role || "USER"} />
      </Suspense>
    </div>
  );
};

export default Layout;
