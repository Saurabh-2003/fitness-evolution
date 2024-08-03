import Conversations from "@/app/_blocks/conversation-list";
// import MessagesList from "@/app/_blocks/messages-list";
import { auth } from "@/core/auth/auth";
import { db } from "@/core/client/client";
import { ConversationProvider } from "@/core/providers/conversation-provider";
import { Message, User } from "@prisma/client";
import Link from "next/link";
import {
  Card,
  // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

type Messages = Message & { User: User };

const removeDuplicateChat = (messages: Messages[]) => {
  const chats: Messages[] = [];
  messages?.forEach((message) => {
    const isExist = chats.find(
      (chat) => chat?.User?.email === message?.User?.email
    );
    if (!isExist) {
      chats?.push(message);
    }
  });
  return chats;
};
const MessageListPage = async () => {
  const session = await auth();
  const user = await db?.user?.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  if (user?.role === "ADMIN") {
    return (
      <ConversationProvider>
        <Card className="w-full h-fit p-0 border-none shadow-none">
          <CardHeader className="p-4 pb-0 pt-6">
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              All of your messages at one place.
            </CardDescription>
            <div className="w-full flex gap-2 flex-row justify-between items-center ">
              <div className="w-12">
                <Link href={`/messages/create`}>
                  <Button className="h-10 w-10" size="icon">
                    <PlusCircle className="h-6 w-6" />
                    <span className="sr-only">Create</span>
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Conversations />
      </ConversationProvider>
    );
  }

  return (
    <>
      <ConversationProvider>
        <Card className="w-full h-fit p-0 border-none shadow-none">
          <CardHeader className="p-4 pb-0 pt-6">
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              All of your messages at one place.
            </CardDescription>
            {/* <div className="w-full flex gap-2 flex-row justify-between items-center ">
              <div className="w-12">
                <Link href={`/messages/create`}>
                  <Button className="h-10 w-10" size="icon">
                    <PlusCircle className="h-6 w-6" />
                    <span className="sr-only">Create</span>
                  </Button>
                </Link>
              </div>
            </div> */}
          </CardHeader>
        </Card>
        <Conversations />
      </ConversationProvider>
    </>
  );
};

export default MessageListPage;
