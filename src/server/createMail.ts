// "use server";

// import * as z from "zod";
// import { db } from "@/core/client/client";
// import { auth } from "@/core/auth/auth";

// const FormSchema = z.object({
//   subject: z.string(),
//   text: z.string(),
//   to: z.string(),
// });

// export const CreateMailAction = async (values: z.infer<typeof FormSchema>) => {
//   const validatedFields = FormSchema.safeParse(values);
//   const session = await auth();
//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }
//   const { subject, text, to } = validatedFields.data;
//   try {
//     await db.mail.create({
//       data: {
//         from: session?.user?.email!,
//         name: session?.user?.name!,
//         user: {
//           connect: {
//             email: session?.user?.email!,
//           },
//         },
//         subject,
//         text,
//         to,
//       },
//     });
//     return { success: "Mail Sent successfully." };
//   } catch (error) {
//     // console.log(error);
//     return { error: "Something went wrong." };
//   }
// };

// /////////Reply chat///////////

// const ReplySchema = z.object({
//   subject: z.string(),
//   text: z.string(),
//   to: z.string(),
//   inReplyTo: z.string().uuid(),
// });

// export const ReplyMailAction = async (values: z.infer<typeof ReplySchema>) => {
//   const validatedFields = ReplySchema.safeParse(values);
//   const session = await auth();

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { subject, text, to, inReplyTo } = validatedFields.data;

//   try {
//     // Find the original mail
//     const originalMail = await db.mail.findUnique({
//       where: { id: inReplyTo },
//     });

//     if (!originalMail) {
//       return { error: "Original mail not found!" };
//     }

//     // Create the reply mail
//     await db.mail.create({
//       data: {
//         from: session?.user?.email!,
//         name: session?.user?.name!,
//         userId: session?.user?.id!,
//         subject: `Re: ${originalMail.subject}`,
//         text,
//         to,
//         date: new Date(),
//         read: false,
//         trash: false,
//         draft: false,
//         labels: [],
//         archive: false,
//       },
//     });

//     return { success: "Reply Sent successfully." };
//   } catch (error) {
//     // console.log(error);
//     return { error: "Something went wrong." };
//   }
// };
