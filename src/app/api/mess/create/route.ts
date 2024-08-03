import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/core/client/client";
import { auth } from '@/core/auth/auth';

export async function POST(req: NextRequest) {
  try {
    const { subject, text, to } = await req.json();
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const receiver = await db.user.findUnique({
      where: { email: to },
    });

    if (!receiver) {
      return NextResponse.json({ error: "Receiver not found" }, { status: 404 });
    }

    // A USER can only connect with a TRAINER
    if (currentUser.role === "USER" && receiver.role !== 'TRAINER') {
      return NextResponse.json({ error: "You can only connect with a trainer" }, { status: 403 });
    }

    // A USER can only have one conversation with a TRAINER at a time
    if (currentUser.role === "USER") {
      const existingConversation = await db.conversation.findFirst({
        where: { participant1Id: currentUser.id },
      });

      if (existingConversation && receiver.id !== existingConversation.participant2Id) {
        return NextResponse.json({ error: "You can only connect with one trainer at a time" }, { status: 403 });
      }
    }

    // Validate required fields
    if (!subject || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find or create conversation between currentUser and receiver
    let conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { participant1Id: currentUser.id, participant2Id: receiver.id },
          { participant1Id: receiver.id, participant2Id: currentUser.id },
        ],
      },
    });

    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          participant1Id: currentUser.id,
          participant2Id: receiver.id,
        },
      });
    }else{
      return NextResponse.json({error: "Conversation already exists!! Please head to chat section"}, {status:401})
    }

    const newMessage = await db.message.create({
      data: {
        from: currentUser.email,
        to: receiver.email,
        subject,
        message: text,
        userId: currentUser.id,
        conversationId: conversation.id,
      },
    });

    return NextResponse.json({ conversation, message: newMessage, success:true, feedback:"Conversation created successfully" }, { status: 200 });
  } catch (error) {
    console.error("[CREATE_CONVERSATION_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
