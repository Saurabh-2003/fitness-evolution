// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowLeft, Ellipsis, SendHorizontal, Smile } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// // import { GoDotFill } from "react-icons/go";

import exp from "constants";

// function OnlineEnquiry() {
//   return (
//     <div className="w-full max-w-3xl mx-auto bg-primary">
//       <div className="w-full flex flex-col items-center justify-center">
//         <header className="w-full h-[8vh] bg-primary flex items-center justify-between sticky top-0 px-3 z-50">
//           <div className="w-fit">
//             <Button
//               variant={"secondary"}
//               size={"icon"}
//               asChild
//               className="rounded-full"
//             >
//               <Link href={"/home"}>
//                 <ArrowLeft className="w-6 h-6" />
//               </Link>
//             </Button>
//           </div>
//           <div className="w-fit flex items-center justify-center gap-1">
//             <div className="w-12 h-12 rounded-full">
//               <Image
//                 src={
//                   "https://img.freepik.com/free-photo/bald-man-amidst-dumbbells-looking-away_23-2147687595.jpg?t=st=1714726285~exp=1714729885~hmac=6d771726344e245922b4fbb7d95403a2a81fc2d6bba43e7d1cde7a06e6665127&w=900"
//                 }
//                 alt="profile"
//                 width={500}
//                 height={500}
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             <div className="w-fit flex flex-col items-start justify-start">
//               <h2 className="text-sm text-secondary font-semibold">
//                 Saksham Kamboj
//               </h2>
//               <div className="flex items-center justify-start">
//                 <GoDotFill className="w-5 h-5 fill-green-500 stroke-green-500" />
//                 <p className="text-muted-foreground text-xs font-semibold">
//                   Always Active
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="w-fit flex items-center justify-center">
//             <Button
//               variant={"secondary"}
//               size={"icon"}
//               className="rounded-full"
//             >
//               <Ellipsis className="w-6 h-6" />
//             </Button>
//           </div>
//         </header>
//         <main className="w-full min-h-[84vh] flex flex-col items-center justify-start overflow-y-scroll overflow-hidden bg-black/30 px-3">
//           <div className="w-full py-2">
//             <p className="text-secondary text-center">Wed 9:30AM</p>
//           </div>
//           <div className="w-full flex flex-col justify-center items-center gap-5">
//             <div className="w-full flex flex-col items-start justify-start">
//               <div className="w-full flex items-start justify-start gap-2">
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   className="rounded-full w-10 h-10 p-0"
//                 >
//                   <Image
//                     src={
//                       "https://img.freepik.com/free-photo/bald-man-amidst-dumbbells-looking-away_23-2147687595.jpg?t=st=1714726285~exp=1714729885~hmac=6d771726344e245922b4fbb7d95403a2a81fc2d6bba43e7d1cde7a06e6665127&w=900"
//                     }
//                     alt="profile"
//                     width={500}
//                     height={500}
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 </Button>
//                 <div className="max-w-[60vw] w-fit min-h-10 bg-secondary text-primary rounded-e-2xl rounded-b-2xl p-2 flex flex-col justify-center items-center gap-1 relative">
//                   <p className="w-full text-primary text-start">hi</p>
//                   <div className="w-fit absolute bottom-0 -right-16">
//                     <span className="w-fit text-muted-foreground ">2:23pm</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full flex flex-col items-end justify-end">
//               <div className="max-w-[60vw] w-fit min-h-10 bg-secondary text-primary rounded-l-2xl rounded-b-2xl p-2 relative">
//                 <p className="w-full text-primary text-start">
//                   hi, how are you
//                 </p>
//                 <div className="w-fit absolute bottom-0 -left-16">
//                   <span className="w-fit text-muted-foreground ">2:24pm</span>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full flex flex-col items-start justify-start">
//               <div className="w-full flex items-start justify-start gap-2">
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   className="rounded-full w-10 h-10 p-0"
//                 >
//                   <Image
//                     src={
//                       "https://img.freepik.com/free-photo/bald-man-amidst-dumbbells-looking-away_23-2147687595.jpg?t=st=1714726285~exp=1714729885~hmac=6d771726344e245922b4fbb7d95403a2a81fc2d6bba43e7d1cde7a06e6665127&w=900"
//                     }
//                     alt="profile"
//                     width={500}
//                     height={500}
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 </Button>
//                 <div className="max-w-[60vw] w-fit min-h-10 bg-secondary text-primary rounded-e-2xl rounded-b-2xl p-2 flex flex-col justify-center items-center gap-1 relative">
//                   <p className="w-full text-primary text-start">
//                     I am good, what are you doing
//                   </p>
//                   <div className="w-fit absolute bottom-0 -right-16">
//                     <span className="w-fit text-muted-foreground ">2:24pm</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full flex flex-col items-end justify-end">
//               <div className="max-w-[60vw] w-fit min-h-10 bg-secondary text-primary rounded-l-2xl rounded-b-2xl p-2 relative">
//                 <p className="w-full text-primary text-start">
//                   i am doing workout
//                 </p>
//                 <div className="w-fit absolute bottom-0 -left-16">
//                   <span className="w-fit text-muted-foreground ">2:25pm</span>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full flex flex-col items-start justify-start">
//               <div className="w-full flex items-start justify-start gap-2">
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   className="rounded-full w-10 h-10 p-0"
//                 >
//                   <Image
//                     src={
//                       "https://img.freepik.com/free-photo/bald-man-amidst-dumbbells-looking-away_23-2147687595.jpg?t=st=1714726285~exp=1714729885~hmac=6d771726344e245922b4fbb7d95403a2a81fc2d6bba43e7d1cde7a06e6665127&w=900"
//                     }
//                     alt="profile"
//                     width={500}
//                     height={500}
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 </Button>
//                 <div className="max-w-[60vw] w-fit min-h-10 bg-secondary text-primary rounded-e-2xl rounded-b-2xl p-2 flex flex-col justify-center items-center gap-1 relative">
//                   <p className="w-full text-primary text-start">
//                     ok good to hear, keep up the good work
//                   </p>
//                   <div className="w-fit absolute bottom-0 -right-16">
//                     <span className="w-fit text-muted-foreground ">2:26pm</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full flex flex-col items-end justify-end">
//               <div className="max-w-[60vw] w-fit min-h-10 bg-secondary text-primary rounded-l-2xl rounded-b-2xl p-2 relative">
//                 <p className="w-full text-primary text-start">
//                   what is time to open gym
//                 </p>
//                 <div className="w-fit absolute bottom-0 -left-16">
//                   <span className="w-fit text-muted-foreground ">2:27pm</span>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full flex flex-col items-start justify-start">
//               <div className="w-full flex items-start justify-start gap-2">
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   className="rounded-full w-10 h-10 p-0"
//                 >
//                   <Image
//                     src={
//                       "https://img.freepik.com/free-photo/bald-man-amidst-dumbbells-looking-away_23-2147687595.jpg?t=st=1714726285~exp=1714729885~hmac=6d771726344e245922b4fbb7d95403a2a81fc2d6bba43e7d1cde7a06e6665127&w=900"
//                     }
//                     alt="profile"
//                     width={500}
//                     height={500}
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 </Button>
//                 <div className="max-w-[60vw] w-fit min-h-10 bg-secondary text-primary rounded-e-2xl rounded-b-2xl p-2 flex flex-col justify-center items-center gap-1 relative">
//                   <p className="w-full text-primary text-start">
//                     Opens at 5 in the morning and 4 in the evening
//                   </p>
//                   <div className="w-fit absolute bottom-0 -right-16">
//                     <span className="w-fit text-muted-foreground ">2:28pm</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//         <footer className="w-full h-[8vh] bg-primary flex items-center justify-between sticky bottom-0 border-muted-foreground px-3 z-50">
//           <div className="w-[10%]">
//             <Smile className="w-8 h-8 stroke-secondary" />
//           </div>
//           <div className="w-[70%]">
//             <Input
//               placeholder="Send a message..."
//               className="w-full h-10 rounded-xl bg-primary text-secondary outline-none border-none text-xl"
//             />
//           </div>
//           <div className="w-[20%] flex items-center justify-center gap-1">
//             <p className="text-secondary font-semibold text-xl">Send</p>
//             <SendHorizontal className="w-4 h-4 stroke-secondary" />
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default OnlineEnquiry;

function OnlineEnquiry(){
  return(
    <div></div>
  )
}
export default OnlineEnquiry;