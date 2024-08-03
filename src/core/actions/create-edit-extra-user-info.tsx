'use server'

import { db } from "@/core/client/client"
import * as z from "zod"
import { auth } from "../auth/auth"

const FormSchema = z.object({
  name: z.string().min(2).max(30).optional(),
  height: z.string().regex(/^\d+(\.\d+)?$/).transform(Number).optional(),
  weight: z.string().regex(/^\d+(\.\d+)?$/).transform(Number).optional(),
  sex: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  age: z.string().regex(/^\d+$/).transform(Number).optional(),
  trainerEmail: z.string().email().optional(),
  fitnessGoals: z.string().optional()
})

export const EditExtraUserInfo = async (values: z.infer<typeof FormSchema>) => {
  const session = await auth()

  if (!session || !session.user?.email) {
    return { error: "Unauthorized" }
  }

  const { name, height, weight, sex, age, trainerEmail, fitnessGoals } = values 

  try {
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return { error: "Unauthorized" }
    }

    let trainer;
    if (trainerEmail) {
      trainer = await db.user.findUnique({
        where: { email: trainerEmail },
      })

      if (!trainer || trainer.role !== 'TRAINER') {
        return {
          error: "No trainer found with this email",
        }
      }

      await db.user.update({
        where: { email: trainerEmail },
        data: {
          studentsEmail: {
            push: session.user.email,
          },
        },
      })

      let conversation = await db.conversation.findFirst({
        where: {
          OR: [
            { participant1Id: currentUser.id, participant2Id: trainer.id },
            { participant1Id: trainer.id, participant2Id: currentUser.id },
          ],
        },
      })

      if (!conversation) {
        conversation = await db.conversation.create({
          data: {
            participant1Id: currentUser.id,
            participant2Id: trainer.id,
          },
        });
      }
    }

    const user = await db.user.update({
      where: { email: session.user.email },
      data: {
        name,
        height,
        weight,
        sex,
        age,
        trainerEmail,
        trainerName: trainer?.name,
        fitnessGoals,
      },
    })

    return { success: true, message: "User updated successfully", user }
  } catch (error) {
    console.error(error)
    return { error: "Internal server error" }
  }
}
