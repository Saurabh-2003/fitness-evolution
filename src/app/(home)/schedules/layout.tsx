"use client";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const defaultTabValue =
    pathname === "/schedules/create" ? "create" : "schedules";

  const handleTabChange = (value: string) => {
    if (value === "schedules") {
      router.push("/schedules");
    } else if (value === "create") {
      router.push("/schedules/create");
    }
  };

  return (
    <section className="p-4">
      <Tabs
        defaultValue={defaultTabValue}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="grid h-12 w-full grid-cols-2">
          <TabsTrigger className="h-10" value="schedules">
            My Schedules
          </TabsTrigger>
          <TabsTrigger className="h-10" value="create">
            Schedule Meeting
          </TabsTrigger>
        </TabsList>
        <TabsContent value="schedules">{children}</TabsContent>
        <TabsContent value="create">{children}</TabsContent>
      </Tabs>
    </section>
  );
};

export default Layout;
