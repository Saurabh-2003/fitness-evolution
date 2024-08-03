"use server";

import { db } from "@/core/client/client";

export const RemoveMeeting = async (id: string) => {
  try {
    await db.schedule.delete({
      where: {
        id,
      },
    });
    return { success: "Meeting removed." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};

export const RemoveMember = async (id: string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
    return { success: "User Deleted" };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
