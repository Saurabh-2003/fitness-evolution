// import { InboxMail } from "@/components/messages/inbox/inbox-mail";
// import { db } from "@/core/client/client";

// export default async function MailPage() {
//   const mails = await db?.mail?.findMany({
//     where: { draft: false, archive: false, trash: false },
//   });
//   return <InboxMail mails={mails || []} />;
// }
