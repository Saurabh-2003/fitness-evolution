"use server";

import * as z from "zod";
import { db } from "@/core/client/client";
import { auth } from "@/core/auth/auth";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  subject: z.string(),
  text: z.string(),
  to: z.string(),
});

export const CreateNewMessageAction = async (
  values: z.infer<typeof FormSchema>
) => {
  const validatedFields = FormSchema.safeParse(values);
  const session = await auth();
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { subject, text: message, to } = validatedFields.data;
  const isUser = await db.user.findUnique({
    where: {
      email: to,
    },
  });
  if (!isUser) {
    return {
      error: "No User found with this email.",
    };
  }
  try {
    await db.message.create({
      data: {
        from: session?.user?.email!,
        User: {
          connect: {
            email: to
          },
        },
        subject,
        message,
        to,
      },
    });
    revalidatePath("/messages","page")
    return { success: "Mail Sent successfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
