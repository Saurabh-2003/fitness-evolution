// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import { Input } from '@/components/ui/input';
// import { User } from 'next-auth';
// import { Separator } from '@/components/ui/separator';
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
// import { Archive, ArchiveX, Loader, Trash2 } from 'lucide-react';
// import React from 'react';
// import { CreateMailAction } from '@/server/createMail';


// const FormSchema = z.object({
//   subject: z.string(),
//   text: z.string(),
//   to: z.string(),
// });

// export default function CreateMail({ user }: { user: User | undefined }) {
//   const [isPending, setIsPending] = React.useState<boolean>(false);
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       subject: '',
//       text: '',
//       to: '',
//     },
//   });

//   async function onSubmit(values: z.infer<typeof FormSchema>) {
//     try {
//       setIsPending(true);
//       const data = await CreateMailAction(values);
//       if (data?.error) {
//         toast.error(data?.error);
//         setIsPending(false);
//         form.reset();
//       }
//       if (data?.success) {
//         toast.success(data?.success);
//         setIsPending(false);
//         form.reset();
//       }
//     } catch (error: any) {
//       toast.error(error.message);
//       setIsPending(false);
//       form.reset();
//     } finally {
//       setIsPending(false);
//       form.reset();
//     }
//   }

//   return (
//     <Form {...form}>
//       <div className='p-1.5 flex flex-row justify-between items-center'>
//         <h2 className='text-xl font-bold pl-2'>Create Mail</h2>
//         <div className='flex items-center gap-2'>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant='ghost'
//                 size='icon'>
//                 <Archive className='h-4 w-4' />
//                 <span className='sr-only'>Archive</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>Archive</TooltipContent>
//           </Tooltip>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant='ghost'
//                 size='icon'>
//                 <ArchiveX className='h-4 w-4' />
//                 <span className='sr-only'>Move to junk</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>Move to junk</TooltipContent>
//           </Tooltip>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant='ghost'
//                 size='icon'>
//                 <Trash2 className='h-4 w-4' />
//                 <span className='sr-only'>Move to trash</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>Move to trash</TooltipContent>
//           </Tooltip>
//         </div>
//       </div>
//       <Separator />
//       <div className='flex p-4  flex-row gap-2'>
//         <div className=''>
//           <Avatar>
//             <AvatarImage
//               src={user?.image || 'https://github.com/shadcn.png'}
//               alt={user?.name || 'No Name Found'}
//             />
//             <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
//           </Avatar>
//         </div>
//         <div className='flex capitalize flex-col '>
//           <h3>
//             <span className='mr-1'>Name:</span>
//             {user?.name || 'No Name Found'}
//           </h3>
//           <h6>
//             <span className='mr-1'>From:</span>
//             {user?.email || 'John@Example.com'}
//           </h6>
//         </div>
//       </div>
//       <Separator />
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className='h-full p-4 pt-2 gap-1 flex flex-col w-full'>
//         <FormField
//           control={form.control}
//           name='to'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Reply To:</FormLabel>
//               <FormControl>
//                 <Input
//                   type='email'
//                   placeholder='John@example.com'
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name='subject'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Subject:</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="What's This Email is About?"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name='text'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Message</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder='What You want to write'
//                   className='resize-none h-[30vh] '
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>
//                 You can <span>@mention</span> other users.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button
//           disabled={isPending}
//           type='submit'
//           className='w-full'>
//           {isPending && <Loader className='mr-2 h-4 w-4 animate-spin' />}
//           {isPending ? 'Sending...' : 'Send Mail'}
//         </Button>
//       </form>
//     </Form>
//   );
// }



