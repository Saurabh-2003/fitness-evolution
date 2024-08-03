// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

// import { Input } from '@/components/ui/input';
// import React from 'react';

// import { useToast } from '@/components/ui/use-toast';

// import { User } from '@prisma/client';
// import { editUserSchema } from '@/resource/validation/validation';
// import { EditUser } from '@/server/editUserAction';

// export default function EditUserForm({ user }: { user: User }) {
//   const [error, setError] = React.useState<string | undefined>('');
//   const [success, setSuccess] = React.useState<string | undefined>('');
//   const [tab, setTab] = React.useState<boolean>(false);
//   const { toast } = useToast();

//   const [isPending, setIsPending] = React.useState<boolean>(false);
//   const form = useForm<z.infer<typeof editUserSchema>>({
//     resolver: zodResolver(editUserSchema),
//     defaultValues: {
//       name: user.name || '',
//       email: user.email || '',
//       role: user.role!,
//     },
//   });
//   async function onSubmit(values: z.infer<typeof editUserSchema>) {
//     setError('');
//     setSuccess('');
//     setIsPending(true);
//     const data = await EditUser(values, user.id);
//     if (data?.error) {
//       form.reset();
//       setError(data?.error);
//       toast({
//         title: data?.error,
//       });
//       setIsPending(false);
//     }
//     if (data?.success) {
//       form.reset();
//       setSuccess(data?.success);
//       setIsPending(false);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className=' flex flex-col gap-2'>
//           <FormField
//             control={form.control}
//             name='name'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Full Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder='Enter Your Full Name'
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         <FormField
//           control={form.control}
//           name='email'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder='exam@gmail.com'
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name='role'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Role</FormLabel>
//               <Select
//                 onValueChange={field.onChange}
//                 defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder='Select User Role' />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value='USER'>USER</SelectItem>
//                   <SelectItem value='ADMIN'>ADMIN</SelectItem>
//                   <SelectItem value='EMPLOYEE'>EMPLOYEE</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className='col-span-2 flex flex-col'>
//           <Button
//             disabled={isPending}
//             type='submit'
//             className='w-full'>
//             {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
//             {isPending ? 'Updating...' : 'Update Details'}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
