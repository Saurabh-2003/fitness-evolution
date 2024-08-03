import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/core/auth/auth";
import { db } from "@/core/client/client";




export default async function ScheduleMeeting() {

  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });


  if (user?.role !== "ADMIN" && user?.role !== "TRAINER") {
    return null;
  }

  return (
    <section className="p-4">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid h-12 w-full grid-cols-2">
          <TabsTrigger className="h-10" value="account">
            My Schedules
          </TabsTrigger>
          <TabsTrigger className="h-10" value="password">
            Schedule Meeting
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </section>
  );
}
