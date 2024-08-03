'use server'
import { db } from "../client/client";
import { ROLE } from "@prisma/client";

export async function updateUser(
  id: string,
  data: { role: ROLE; trainerEmail: string | undefined }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const isRoleChanging = user.role !== data.role;

    if (isRoleChanging) {
      // Delete all conversations related to the user
      await db.conversation.deleteMany({
        where: {
          OR: [
            { participant1Id: id },
            { participant2Id: id },
          ],
        },
      });

      // If the user was a trainer and their role is changing to admin or user
      if (user.role === "TRAINER" && (data.role === "ADMIN" || data.role === "USER")) {
        // Update all students who had this trainer
        await db.user.updateMany({
          where: { trainerEmail: user.email },
          data: {
            trainerEmail: null,
            trainerName: null,
          },
        });

        // Clear the studentsEmail array for the trainer
        await db.user.update({
          where: { id },
          data: {
            role: data.role,
            trainerEmail: null,
            trainerName: null,
            studentsEmail: {
              set: [],
            },
          },
        });

        return { message: `User role updated to ${data.role}, all conversations removed, and student-trainer relationships cleared.` };
      }

      // If the user was a user with a trainer and their role is changing to admin or trainer
      if (user.role === "USER" && user.trainerEmail && (data.role === "ADMIN" || data.role === "TRAINER")) {
        const previousTrainer = await db.user.findUnique({
          where: { email: user.trainerEmail },
        });

        if (previousTrainer) {
          await db.user.update({
            where: { email: user.trainerEmail },
            data: {
              studentsEmail: {
                set: previousTrainer.studentsEmail.filter(email => email !== user.email),
              },
            },
          });
        }

        // Clear the trainerEmail and trainerName fields for the user
        await db.user.update({
          where: { id },
          data: {
            role: data.role,
            trainerEmail: null,
            trainerName: null,
          },
        });

        return { message: `User role updated to ${data.role}, all conversations removed, and trainer-student relationship cleared.` };
      }

      // Update the user's role
      await db.user.update({
        where: { id },
        data: {
          role: data.role,
        },
      });

      return { message: `User role updated to ${data.role} and all conversations removed.` };
    }

    let trainerName = null;
    let trainerId = null;

    if (data.trainerEmail && data.trainerEmail !== "No trainer selected") {
      if (user.trainerEmail && user.trainerEmail !== data.trainerEmail) {
        const previousTrainer = await db.user.findUnique({
          where: { email: user.trainerEmail },
        });
        const newTrainer = await db.user.findUnique({
          where: { email: data.trainerEmail },
        });

        if (!newTrainer) {
          throw new Error("New trainer not found");
        }

        trainerName = newTrainer.name;
        trainerId = newTrainer.id;

        await db.conversation.deleteMany({
          where: {
            OR: [
              { participant1Id: id, participant2Id: previousTrainer?.id },
              { participant1Id: previousTrainer?.id, participant2Id: id },
            ],
          },
        });

        await db.conversation.create({
          data: {
            participant1Id: id,
            participant2Id: trainerId,
          },
        });

        if (previousTrainer) {
          await db.user.update({
            where: { email: user.trainerEmail },
            data: {
              studentsEmail: {
                set: previousTrainer.studentsEmail.filter(email => email !== user.email),
              },
            },
          });
        }

        await db.user.update({
          where: { email: data.trainerEmail },
          data: {
            studentsEmail: {
              push: user.email,
            },
          },
        });

      } else if (!user.trainerEmail) {
        const newTrainer = await db.user.findUnique({
          where: { email: data.trainerEmail },
        });

        if (!newTrainer) {
          throw new Error("Trainer not found");
        }

        trainerName = newTrainer.name;
        trainerId = newTrainer.id;

        await db.conversation.create({
          data: {
            participant1Id: id,
            participant2Id: trainerId,
          },
        });

        await db.user.update({
          where: { email: data.trainerEmail },
          data: {
            studentsEmail: {
              push: user.email,
            },
          },
        });
      }
    } else {
      data.trainerEmail = undefined;
      trainerName = null;

      if (user.trainerEmail) {
        const previousTrainer = await db.user.findUnique({
          where: { email: user.trainerEmail },
        });

        await db.conversation.deleteMany({
          where: {
            OR: [
              { participant1Id: id, participant2Id: previousTrainer?.id },
              { participant1Id: previousTrainer?.id, participant2Id: id },
            ],
          },
        });

        if (previousTrainer) {
          await db.user.update({
            where: { email: user.trainerEmail },
            data: {
              studentsEmail: {
                set: previousTrainer.studentsEmail.filter(email => email !== user.email),
              },
            },
          });
        }
      }
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        role: data.role,
        trainerEmail: data.trainerEmail,
        trainerName,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
