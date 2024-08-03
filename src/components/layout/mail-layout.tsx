"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/core/lib/utils";
import { Inbox, Mail, PencilIcon, Send } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import SignOutButton from "../auth/signout-button";
import { Nav } from "../messages/nav";
import { TooltipProvider } from "../ui/tooltip";

const MailLayout = ({ children }: { children: ReactNode }) => {
  const defaultLayout = [20, 80];
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={3.5}
          collapsible={true}
          minSize={12}
          maxSize={30}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={cn(
            isCollapsed &&
              "h-[100vh] w-full relative min-w-[36px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-start  justify-start",
              isCollapsed ? "h-[52px] p-4" : "p-4"
            )}
          >
            <Link href={"/"}>
              <div className="flex flex-row w-full">
                <Mail className="h-6 w-6 mr-2" />
                <span
                  className={cn("text-xl font-bold", isCollapsed && "hidden")}
                >
                  MeMail
                </span>
              </div>
            </Link>
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Create Mail",
                label: "",
                icon: PencilIcon,
                link: "/home/messages/create",
              },
              {
                title: "Inbox",
                label: "128",
                icon: Inbox,
                link: "/home/messages/inbox",
              },
              // {
              //   title: 'Drafts',
              //   label: '9',
              //   icon: File,
              //   link: '/home/messages/draft',
              // },
              {
                title: "Sent",
                label: "",
                icon: Send,
                link: "/home/messages/sent",
              },
            ]}
          />

          <div className="h-auto max-w-14   absolute bottom-5 p-2  w-full flex justify-start items-center">
            <SignOutButton />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default MailLayout;
