"use server";

import * as z from "zod";

import { db } from "@/core/client/client";
import { editUserSchema } from "@/resource/validation/validation";
import { revalidatePath } from "next/cache";

export const EditUser = async (
  values: z.infer<typeof editUserSchema>,
  id: string
) => {
  const validatedFields = editUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, role, email } = validatedFields.data;
  try {
    if (id) {
      await db.user.update({
        where: {
          id,
        },
        data: {
          name,
          role,
          email,
        },
      });
      revalidatePath(`/home/users`);
      return { success: "User Profile Updated." };
    }
    return { error: "Update Failed" };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};

// export const DeleteUser = async (id: string) => {
//   // Validate the user ID
//   const validatedFields = deleteUserSchema.safeParse({ id });

//   if (!validatedFields.success) {
//     return { error: "Invalid user ID!" };
//   }

//   try {
//     // Delete the user
//     await db.user.delete({
//       where: {
//         id,
//       },
//     });
//     // Revalidate the path to update the user list
//     revalidatePath(`/home/users`);
//     return { success: "User deleted successfully." };
//   } catch (error) {
//     return { error: "Something went wrong." };
//   }
// };