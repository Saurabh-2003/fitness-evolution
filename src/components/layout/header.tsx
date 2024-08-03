import Image from "next/image";
import { Bell, Hand } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header({ session }: { session: any }) {
  return (
    <div className="w-full h-24 bg-background flex items-center justify-center p-3">
      <div className="w-full flex justify-start items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-fit">
              <div className="w-14 h-14 rounded-full">
                <Image
                  src={session?.user?.image}
                  alt="profile"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-full flex flex-col justify-start items-start">
          <h1 className="text-sm font-bold text-gray-500 flex flex-row items-center justify-center gap-1">
            Welcome back!
            <Hand className="h-4 w-4" />
          </h1>
          <p className="text-xl text-primary">{session?.user?.name}</p>
        </div>
      </div>
      <div className="w-fit flex justify-end items-center">
        <div className="w-14 h-14 rounded-full bg-secondary flex justify-center items-center">
          <Bell />
        </div>
      </div>
    </div>
  );
}

export default Header;
