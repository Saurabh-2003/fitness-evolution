import { NextRequest, NextResponse } from "next/server";
import { db } from "@/core/client/client";
import { auth } from "@/core/auth/auth";

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const conversationId = req.nextUrl.searchParams.get("conversationId");

    if(!conversationId){
        return NextResponse.json({error:"No Conversation Id is Present"})
    }
    const conversation = await db.conversation.findUnique({
        where: {
          id: conversationId,
          OR: [
            { participant1Id: currentUser.id },
            { participant2Id: currentUser.id }
          ]
        },
      });

    if (!conversation || (conversation.participant1Id !== currentUser.id && conversation.participant2Id !== currentUser.id)) {
      return NextResponse.json({ error: "Conversation not found or unauthorized" }, { status: 404 });
    }

    await db.conversation.delete({
      where: { id: conversationId },
    });

    return NextResponse.json({ message: "Conversation deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
