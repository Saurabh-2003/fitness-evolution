"use server"

import { auth } from "../auth/auth";
import { db } from "../client/client";

export const getConversationDetailsAction = async () => {
  const session = await auth();
  const userEmail: string | undefined = session?.user?.email ?? undefined;

  if (!userEmail) {
    throw new Error("User email not found in session");
  }
  
  const user = await db.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;

  const conversations = await db.conversation.findMany({
    where: {
      OR: [
        { participant1Id: userId },
        { participant2Id: userId },
      ],
    },
    select: {
      id: true,
      lastMessageAt: true,
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1,
        select: {
          message: true,
          createdAt: true
        }
      },
      participant1: {
        select: {
          id: true,
          name: true,
          email: true,
          image:true
        }
      },
      participant2: {
        select: {
          id: true,
          name: true,
          email: true,
          image:true
        }
      }
    }
  });

  const formattedConversations = conversations.map(conversation => {
    const otherParticipant = conversation.participant1.id === userId ? conversation.participant2 : conversation.participant1;
    return {
      id: conversation.id,
      participant: {
        id: otherParticipant.id,
        name: otherParticipant.name,
        email: otherParticipant.email,
        image:otherParticipant.image
      },
      lastMessage: conversation.messages[0] ? conversation.messages[0].message : null,
      lastMessageAt: conversation.lastMessageAt,
    };
  });

  return formattedConversations;
};
