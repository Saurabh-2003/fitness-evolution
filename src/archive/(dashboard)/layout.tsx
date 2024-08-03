// import DashboardLayout from "@/components/layout/home-layout";
// import { auth } from "@/core/auth/auth";
// import { db } from "@/core/client/client";
// import NextAuthProvider from "@/core/providers/Provider";
// import { redirect } from "next/navigation";

// export default async function AppLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();
//   if (!session) {
//     return redirect("/auth");
//   }
//   const [user, message] = await Promise.all([
//     db.user.count(),
//     db.messaging.count(),
//   ]);
//   const count = {
//     user,
//     message,
//   };

//   const userData = await db.user.findFirst({
//     where: {
//       email: session?.user?.email as string,
//     },
//   });
//   return (
//     <NextAuthProvider>
//       <DashboardLayout role={userData?.role! || "USER"} count={count}>
//         {children}
//       </homeLayout>
     
//     </NextAuthProvider>
//   );
// }
