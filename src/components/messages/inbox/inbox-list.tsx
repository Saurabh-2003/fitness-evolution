// import { ComponentProps } from 'react';

// import { Badge } from '@/components/ui/badge';
// import { ScrollArea } from '@/components/ui/scroll-area';

// import { Mail } from '@prisma/client';
// import { cn } from '@/core/lib/utils';

// interface InboxMailListProps {
//   mails: Mail[];
//   setSelected: (id: string) => any;
// }

// export function InboxMailList({ mails, setSelected }: InboxMailListProps) {
//   return (
//     <ScrollArea className='h-screen'>
//       <div className='flex flex-col gap-2 p-4 pt-0'>
//         {mails.map(({ id, read, name, subject, labels, text, date }, index) => (
//           <button
//             key={id}
//             className={cn(
//               'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
//               ''
//             )}
//             onClick={() => setSelected(id)}>
//             <div className='flex w-full flex-col gap-1'>
//               <div className='flex items-center'>
//                 <div className='flex items-center gap-2'>
//                   <div className='font-semibold'>{name}</div>
//                   {!read && <span className='flex h-2 w-2 rounded-full bg-blue-600' />}
//                 </div>
//                 <div className={cn('ml-auto text-xs', '')}>{date?.toISOString()}</div>
//               </div>
//               <div className='text-xs font-medium'>{subject}</div>
//             </div>
//             <div className='line-clamp-2 text-xs text-muted-foreground'>{text.substring(0, 300)}</div>
//             {labels.length ? (
//               <div className='flex items-center gap-2'>
//                 {labels.map((label) => (
//                   <Badge
//                     key={label}
//                     variant={getBadgeVariantFromLabel(label)}>
//                     {label}
//                   </Badge>
//                 ))}
//               </div>
//             ) : null}
//           </button>
//         ))}
//       </div>
//     </ScrollArea>
//   );
// }

// function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['variant'] {
//   if (['work'].includes(label.toLowerCase())) {
//     return 'default';
//   }

//   if (['personal'].includes(label.toLowerCase())) {
//     return 'outline';
//   }

//   return 'secondary';
// }
