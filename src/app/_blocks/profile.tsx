import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SignOutButton from "@/components/auth/signout-button";
import { auth } from "@/core/auth/auth";
import { db } from "@/core/client/client";
import Image from "next/image";
import { ModeToggle } from "@/components/layout/modeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import UserAccount from "@/components/common/account/userAccount";
import { TrainerAccount } from "@/components/common/account/trainerAccount";
import { AdminAccount } from "@/components/common/account/adminAccount";

export default async function Profile() {
  const session = await auth();
  const userData = await db.user.findFirst({
    where: {
      email: session?.user?.email as string,
    },
  });

  return (
    <TooltipProvider>
      <div className="flex items-start justify-start w-full h-full">
        <div className="rounded-lg shadow-lg w-full">
          <div className="h-40 z-0"></div>
          <Image
            alt="User avatar"
            className="rounded-full z-10 -mt-12 border-4   mx-auto"
            height="100"
            src={userData?.image!}
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div className="text-center mt-2">
            <h2 className="text-lg font-semibold">{userData?.name}</h2>
            <p className="text-gray-500">{userData?.email}</p>
          </div>
          <div className="flex p-4 w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="w-full">
                    <div className="font-medium">Dark Mode</div>
                  </TableCell>
                  <TableCell className="text-right w-full">
                    <ModeToggle />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium w-full">Logout</div>
                  </TableCell>
                  <TableCell className="text-right w-full">
                    <SignOutButton />
                  </TableCell>
                </TableRow>
                <Separator className="w-full" />
              </TableBody>
            </Table>
          </div>
          <div className="w-full px-4">
            {userData?.role === "USER" && (
              <div className="">
                <UserAccount userData={userData} />
              </div>
            )}
            {userData?.role === "TRAINER" && (
              <div className="">
                <TrainerAccount  />
              </div>
            )}
            {userData?.role === "ADMIN" && (
              <div className="">
                <AdminAccount />
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
