"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Copy,
  Edit,
  Eye,
  Loader,
  MoreHorizontal,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import { db } from "@/core/client/client";
import { AllMembers } from "@/server/fetchCondidate";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/assets/icon/user_149071.png";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import MembersDetailsForm from "./membersDetailsForm";
import { RemoveMember } from "@/server/removeMeeting";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type Members = {
  id: string;
  name: string;
  email: string;
  image: string;
  sex: "MALE" | "FEMALE" | "OTHER";
  role: "user" | "trainer";
};

const ActionsCell = ({ member }: { member: Members }) => {
  const router = useRouter();

  function DeleteUser(id: any) {
    const handleDeleteUser = React.useCallback(async () => {
      try {
        const response = await RemoveMember(id);
        if (response.success) {
          toast.success("User deleted successfully");
          console.log(response.success);
          router.refresh()
        } else {
          toast.error("Error deleting user");
          console.error(response.error);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }, [id]);

    return handleDeleteUser;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="w-full inline-flex items-center gap-2"
          onClick={() => navigator.clipboard.writeText(member?.email)}
        >
          <Copy className="w-4 h-4" />
          Copy email ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <AlertDialog>
              <AlertDialogTrigger className="w-full inline-flex items-end gap-2">
                <Eye className="w-4 h-4" />
                View Details
              </AlertDialogTrigger>
              <AlertDialogContent className="p-0 overflow-hidden">
                <MembersDetailsForm
                  AlertDialogFooter={AlertDialogFooter}
                  data={member}
                />
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <AlertDialog>
              <AlertDialogTrigger className="w-full inline-flex items-end gap-2 text-red-500">
                <Trash className="w-4 h-4" />
                User Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <h2 className="text-lg font-medium">Confirm Delete</h2>
                <p>Are you sure you want to delete this user?</p>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={DeleteUser(member?.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Members>[] = [
  {
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row?.original?.image || avatar.src} />
          <AvatarFallback>
            {row?.original?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "sex",
    header: "Gender",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sex") || "Null"}</div>
    ),
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell member={row.original} />,
  },
];

export function AdminAccount() {
  const [data, setData] = React.useState<Members[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      const response = await AllMembers();
      setData(response as any);
      setLoading(false);
    }

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full py-10 px-4">
        <h2 className="text-xl font-semibold">Users Management</h2>
        <p>View & Manage users, Change details ect.</p>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by names, role & email ..."
          value={
            (table
              .getColumn("name" && "role" && "email")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("name" && "role" && "email")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell?.id}>
                      {flexRender(
                        cell?.column?.columnDef?.cell,
                        cell?.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table?.getRowModel().rows?.length} / {data?.length}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table?.previousPage()}
            disabled={!table?.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table?.nextPage()}
            disabled={!table?.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
