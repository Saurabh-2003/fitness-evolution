"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Message, User } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function formatTimeWithoutSeconds(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
}
type Messages = (Message & { User: User }) | null;
const MessagesList = ({ messages , showAddMessageButton }: { messages: Messages[] , showAddMessageButton: boolean }) => {
    return (
    <Card className="w-full h-full p-0 border-none shadow-none">
      <CardHeader className="p-4 pb-0 pt-6">
        <CardTitle>Messages</CardTitle>
        <CardDescription>All of your messages at one place.</CardDescription>
        <div className="w-full flex gap-2 flex-row justify-between items-center ">
          
         {showAddMessageButton && <div className="w-12">
            <Link href={`/messages/create`}>
              <Button className="h-10 w-10" size="icon">
                <PlusCircle className="h-6 w-6" />
                <span className="sr-only">Create</span>
              </Button>
            </Link>
          </div>}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[55vh] overflow-y-scroll border  w-full rounded-2xl divide-muted-foreground">
          {messages && messages?.map(
            (chat) =>
              chat && (
                <Link
                  key={chat?.id}
                  href={`/messages/${chat?.to}`}
                  className="flex items-center gap-4 p-4"
                  prefetch={false}
                >
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={chat?.User?.image || "https://github.com/shadcn.png"}
                      alt={chat?.User?.name || "No Name Found"}
                      width={6}
                      height={6}
                      className="w-10 h-10 "
                    />
                    <AvatarFallback>
                      {(chat?.User?.name && chat?.User?.name[0]!) || "NA"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 grid gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="font-medium">{chat?.User?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {chat?.User?.email}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeWithoutSeconds(chat?.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {chat?.message}
                    </p>
                  </div>
                </Link>
              )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesList;
