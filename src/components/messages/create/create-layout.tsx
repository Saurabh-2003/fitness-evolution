// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import CreateMail from "./create-mail";
// import { auth } from "@/core/auth/auth";


// const CreateMailLayout = async () => {
//   const session = await auth();

//   return (
//     <section className="h-screen w-full">
//       <ResizablePanelGroup direction="horizontal" className="w-full ">
//         <ResizablePanel defaultSize={50}>
//           <CreateMail user={session?.user} />
//         </ResizablePanel>
//         <ResizableHandle />
//         <ResizablePanel defaultSize={50}></ResizablePanel>
//       </ResizablePanelGroup>
//     </section>
//   );
// };
// export default CreateMailLayout;
