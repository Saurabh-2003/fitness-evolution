"use client";

import { Button } from "@/components/ui/button";

import { Row } from "@tanstack/react-table";
import { CalendarDays, MessageCircle } from "lucide-react";

import { User } from "@prisma/client";

import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = row?.original as User;

  return (
    <div className="flex flex-row gap-2 w-auto ">
      <Link href={`/messages/${user.email}`}>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Message</span>
        </Button>
      </Link>
      <Link href={`/schedules/create?email=${user.email}`}>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <CalendarDays className="h-6 w-6" />
          <span className="sr-only">Schedule</span>
        </Button>
      </Link>
    </div>
  );
}
