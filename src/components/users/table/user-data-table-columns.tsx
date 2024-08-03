"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { Book, Shield, User2Icon } from "lucide-react";
import { DataTableColumnHeader } from "./user-data-table-column-header";
import { DataTableRowActions } from "./user-data-table-row-actions";
import { ROLES } from "@/resource/enum/enum";

export const roles = [
  {
    value: ROLES.ADMIN,
    label: "Admin",
    icon: Shield,
  },
  {
    value: "USER",
    label: "User",
    icon: User2Icon,
  },
  {
    value: "MANAGER",
    label: "Manager",
    icon: Book,
  },
];
export const labels = [
  {
    value: "editor",
    label: "Editor",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
  {
    value: "manager",
    label: "Manager",
  },
];
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }: any) => {
      return (
        <div className="flex space-x-2 w-auto max-w-60 items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={row?.original?.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>
              {row?.original?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <span className="w-auto truncate font-medium">
              {row.getValue("name")}
            </span>
            <span className="w-auto text-muted-foreground truncate font-medium">
              {row?.original?.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => <DataTableRowActions row={row} />,
  },
];
