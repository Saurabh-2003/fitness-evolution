// import * as React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// // import { ReplyMailAction } from '@/server/createMail';
// import { toast } from "sonner"

// import { User } from '@prisma/client';
// import { ReplyMailAction } from '@/server/createMail';

// const ReplyFormSchema = z.object({
//   subject: z.string(),
//   text: z.string(),
//   to: z.string(),
//   inReplyTo: z.string().uuid(),
// });

// interface ReplyMailProps {
//   user: User | undefined;
//   inReplyTo: string;
// }

// export default function ReplyMail({ user, inReplyTo }: ReplyMailProps) {
//   const [isPending, setIsPending] = React.useState<boolean>(false);
  
//   const { register, handleSubmit, reset } = useForm<z.infer<typeof ReplyFormSchema>>({
//     resolver: zodResolver(ReplyFormSchema),
//     defaultValues: {
//       subject: '',
//       text: '',
//       to: '',
//       inReplyTo: inReplyTo,
//     },
//   });

//   const onSubmit: SubmitHandler<z.infer<typeof ReplyFormSchema>> = async (values) => {
//     try {
//       setIsPending(true);
//       const data = await ReplyMailAction(values);
//       if (data?.error) {
//         toast.error(data.error);
//       } else if (data?.success) {
//         toast.success(data.success);
//       }
//     } catch (error: any) {
//       toast.error(error.message);
//     } finally {
//       setIsPending(false);
//       reset();
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         {...register('subject')}
//         placeholder="Subject"
//         disabled={isPending}
//       />
//       <textarea
//         {...register('text')}
//         placeholder="Text"
//         disabled={isPending}
//       />
//       <input
//         {...register('to')}
//         placeholder="To"
//         disabled={isPending}
//       />
//       <button type="submit" disabled={isPending}>
//         {isPending ? 'Sending...' : 'Send Reply'}
//       </button>
//     </form>
//   );
// }
