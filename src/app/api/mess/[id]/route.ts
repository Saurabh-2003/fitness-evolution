// app/api/conversation/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/core/client/client';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const conversation = await db.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          include: {
            User: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    return NextResponse.json(conversation.messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
