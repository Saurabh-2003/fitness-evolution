"use server";

import * as z from "zod";
import { db } from "@/core/client/client";
import { auth } from "../auth/auth";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.enum(
    [
      "6:00 AM",
      "8:00 AM",
      "11:00 AM",
      "12:00 PM",
      "2:00 PM",
      "4:00 PM",
      "6:00 PM",
      "8:00 PM",
      "9:00 PM",
    ],
    {
      message: "Time is required",
    }
  ),
  body: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(160, {
      message: "Message must not be longer than 30 characters.",
    }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  meetingLink: z.string().min(2, {
    message: "meeting Link must be at least 2 characters.",
  }),
  memberId: z.string().min(2, {
    message: "Email is required",
  }),
});

const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const CreateScheduleAction = async (
  values: z.infer<typeof FormSchema>
) => {
  const validatedFields = FormSchema.safeParse(values);
  const session = await auth();
  if(session?.user?.email === values.memberId){
    return { error: "You can't schedule a meeting with yourself." };
  }
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { subject, body, date, meetingLink, time, memberId } =
    validatedFields.data;
  try {
    await db.schedule.create({
      data: {
        memberId,
        subject,
        body,
        date:formatDate(date),
        meetingLink,
        time,
        User: {
          connect: {
            email: session?.user?.email!,
          },
        },
      },
    });
    revalidatePath("/schedules","page")
    return { success: "Mail Sent successfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
