import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Profile from "@/app/_blocks/profile";
import { db } from "@/core/client/client";
import { auth } from "@/core/auth/auth";
import Image from "next/image";
import { useSocket } from "@/core/providers/socket-provider";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();
  const userData = await db.user.findFirst({
    where: {
      email: session?.user?.email as string,
    },
  });

  return (
    <div className="relative flex object-cover h-[70vh] flex-col w-full gap-4 justify-between items-end">
      <Image
        alt="User avatar"
        loading="eager"
        className="h-full z-0 w-full absolute object-cover top-0 inset-0"
        height={1920}
        src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={1080}
      />
      <div className="flex text-stone-300 font-bold p-4 bg-gradient-to-b py-5 from-black to-transparent flex-col z-10 w-full  justify-center items-center gap-4">
        <h1 className="text-4xl">Welcome {userData?.name}</h1>
      </div>
      <div className="flex p-4 flex-col  z-10 gap-4">
        <Card className="sm:col-span-2 bg-primary/10 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle>Your Schedules</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href={"/schedules"}>View All Schedules</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="sm:col-span-2 bg-primary/10 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle>Your Messages</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href={"/messages"}>View All Messages</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
