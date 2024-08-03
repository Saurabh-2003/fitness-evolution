"use server"
import { auth } from '@/core/auth/auth';
import { db } from '@/core/client/client';



export const getconversation = async({id}:{id:string}) => {

  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("error")
    }

    const conversation:any = await db.conversation.findUnique({
      where: {
        id: String(id),
      },
      include: {
        participant1: true,
        participant2: true,
      },
    });

    if (!conversation) {
      console.log("Conversation not found")
    }

    const otherParticipant = conversation.participant1.email === session?.user?.email
      ? conversation.participant2
      : conversation.participant1;

    return otherParticipant?.email;
  } catch (error) {
    console.error(error);
  }
}
