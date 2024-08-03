import { auth } from "@/core/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserAvatar() {
  const session = await auth();

  if (session && !session.user) return null;
  return (
    <Avatar>
      <AvatarImage alt={session?.user?.name!} src={session?.user?.image!} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
