import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserAvatar from "@/components/layout/avatar-box";

type HeaderBarProps = {
  src: string;
  name: string;
  email: string;
};

const HeaderBar: React.FC<HeaderBarProps> = ({ src, name, email }) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <header className="py-4 px-4 flex items-center justify-between">
      <div className="text-2xl font-bold">Fitness Evolution</div>
      <UserAvatar email={email} name={name} src={src} />
    </header>
  );
};

export default HeaderBar;
