import Chat from "@/app/_blocks/chat-box";
import { auth } from "@/core/auth/auth";
import { db } from "@/core/client/client";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const MessagesPage = async ({ params }: { params: { id: string } }) => {
  const id: string = decodeURIComponent(params?.id);
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/auth");
  }

  const loggedInUserEmail: string = session?.user?.email;
  const loggedInUser = await db.user.findUnique({ where: { email: loggedInUserEmail } });

  if (!loggedInUser) {
    console.error(`User with email ${loggedInUserEmail} not found.`);
    return redirect("/auth");
  }

  // First, try to fetch the conversation by ID
  const convoById = await db.conversation.findUnique({
    where: { id }
  });

  if (convoById) {
    // If the conversation exists, return the Chat component with the conversation ID
    return <Chat id={id} />;
  }

  const isAdmin: boolean = loggedInUser?.role === "ADMIN";
  let otherUserEmail: string | undefined;

  if (isAdmin && id !== loggedInUserEmail) {
    otherUserEmail = id; // Admin provided the email of the other user
  } else {
    // If not an admin or id is not a conversation ID, redirect to create page
    return redirect("/messages/create");
  }

  try {
    const otherUser = await db?.user?.findUnique({
      where: { email: otherUserEmail }
    });

    if (!otherUser) {
      throw new Error(`User with email ${otherUserEmail} not found.`);
    }

    const convo = await db?.conversation.findFirst({
      where: {
        OR: [
          {
            AND: [
              { participant1Id: loggedInUser?.id },
              { participant2Id: otherUser?.id }
            ]
          },
          {
            AND: [
              { participant1Id: otherUser?.id },
              { participant2Id: loggedInUser?.id }
            ]
          }
        ]
      }
    });

    if (!convo) {
      toast.error("You have to create a conversation first");
      return redirect("/messages/create");
    } else {
      return <Chat id={convo?.id} />;
    }
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return redirect("/messages/create");
  }
};

export default MessagesPage;
