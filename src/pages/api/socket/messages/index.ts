import { db } from "@/core/client/client";
import { NextApiResponseServerIo } from "@/resource/types/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { conversationID, session, to, subject, text } = req.body;

    if (!session || !session.user || !session.user.email) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const conversation = await db.conversation.findUnique({
      where: { id: conversationID },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation between users does not exist" });
    }

    const newMessage = await db.message.create({
      data: {
        from: currentUser.email,
        to,
        subject,
        message: text,
        userId: currentUser.id,
        conversationId: conversation.id,
      },
      include: { User: true },
    });

    const channelKey = `chat:${conversation.id}`;

    res?.socket?.server?.io?.emit(channelKey, newMessage);

    return res.status(200).json(newMessage);
  } catch (error) {
    console.error("[DIRECT_MESSAGE_POST]", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
