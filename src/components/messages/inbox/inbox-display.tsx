// import { Archive, ArchiveX, Clock, Forward, MoreVertical, Reply, ReplyAll, Trash2 } from 'lucide-react';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Label } from '@/components/ui/label';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Separator } from '@/components/ui/separator';
// import { Switch } from '@/components/ui/switch';
// import { Textarea } from '@/components/ui/textarea';
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
// import { Mail } from '@prisma/client';
// import { ScrollArea } from '@/components/ui/scroll-area';

// interface InboxMailDisplayProps {
//   mail: Mail | null;
// }

// export function InboxMailDisplay({ mail }: InboxMailDisplayProps) {
//   return (
//     <div className='flex relative z-10 flex-col h-screen overflow-hidden'>
//       <div className='flex items-center p-1.5'>
//         <div className='flex items-center gap-2'>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant='ghost'
//                 size='icon'
//                 disabled={!mail}>
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
//                 size='icon'
//                 disabled={!mail}>
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
//                 size='icon'
//                 disabled={!mail}>
//                 <Trash2 className='h-4 w-4' />
//                 <span className='sr-only'>Move to trash</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>Move to trash</TooltipContent>
//           </Tooltip>
//           <Separator
//             orientation='vertical'
//             className='mx-1 h-6'
//           />
//         </div>
//         <div className='ml-auto flex items-center gap-2'>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant='ghost'
//                 size='icon'
//                 disabled={!mail}>
//                 <Reply className='h-4 w-4' />
//                 <span className='sr-only'>Reply</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>Reply</TooltipContent>
//           </Tooltip>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant='ghost'
//                 size='icon'
//                 disabled={!mail}>
//                 <ReplyAll className='h-4 w-4' />
//                 <span className='sr-only'>Reply all</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>Reply all</TooltipContent>
//           </Tooltip>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant='ghost'
//                 size='icon'
//                 disabled={!mail}>
//                 <Forward className='h-4 w-4' />
//                 <span className='sr-only'>Forward</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>Forward</TooltipContent>
//           </Tooltip>
//         </div>
//         <Separator
//           orientation='vertical'
//           className='mx-2 h-6'
//         />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant='ghost'
//               size='icon'
//               disabled={!mail}>
//               <MoreVertical className='h-4 w-4' />
//               <span className='sr-only'>More</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align='end'>
//             <DropdownMenuItem>Mark as unread</DropdownMenuItem>
//             <DropdownMenuItem>Star thread</DropdownMenuItem>
//             <DropdownMenuItem>Add label</DropdownMenuItem>
//             <DropdownMenuItem>Mute thread</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <Separator />
//       {mail ? (
//         <div className='flex flex-1 flex-col'>
//           <div className='flex items-start p-4'>
//             <div className='flex items-start gap-4 text-sm'>
//               <Avatar>
//                 <AvatarImage alt={mail?.subject} />
//                 <AvatarFallback>NA</AvatarFallback>
//               </Avatar>
//               <div className='grid gap-1'>
//                 <div className='font-semibold'>{mail?.subject}</div>
//                 <div className='line-clamp-1 text-xs'>{mail?.subject}</div>
//                 <div className='line-clamp-1 text-xs'>
//                   <span className='font-medium'>Reply-To:</span> {mail?.to}
//                 </div>
//               </div>
//             </div>
//             {mail?.date && <div className='ml-auto text-xs text-muted-foreground'>date not found</div>}
//           </div>
//           <Separator />
//           <ScrollArea className='h-[60vh] overflow-y-auto w-full '>
//             <div className=' w-full h-full pb-20 whitespace-pre-wrap p-4 text-sm'>{mail?.text}</div>
//           </ScrollArea>

//           <div className='absolute bg-popover border-t w-full p-4 bottom-0'>
//             <form>
//               <div className='grid gap-4'>
//                 <Textarea
//                   className='p-4'
//                   placeholder={`Reply ${mail?.to}...`}
//                 />
//                 <div className='flex items-center'>
//                   <Label
//                     htmlFor='mute'
//                     className='flex items-center gap-2 text-xs font-normal'>
//                     <Switch
//                       id='mute'
//                       aria-label='Mute thread'
//                     />{' '}
//                     Mute this thread
//                   </Label>
//                   <Button
//                     onClick={(e) => e.preventDefault()}
//                     size='sm'
//                     className='ml-auto'>
//                     Send
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <div className=''>
//           <div className='p-8 text-center text-muted-foreground'>No message selected</div>
//         </div>
//       )}
//     </div>
//   );
// }
