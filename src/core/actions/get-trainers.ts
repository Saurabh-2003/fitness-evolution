'use server'
import { db } from "@/core/client/client"

export const getTrainers = async () => {
  try {
    const trainers = await db.user.findMany({
      where: { role: 'TRAINER' },
      select: {
        email: true,
        name: true,
        image:true
      }
    })
    return { trainers }
  } catch (error) {
    console.error("[GET_TRAINERS_ERROR]", error)
    return { error: "Failed to fetch trainers" }
  }
}