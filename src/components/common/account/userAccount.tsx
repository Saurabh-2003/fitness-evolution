import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import { Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ChangeTrainerForm from "./changeTrainerForm";

function UserAccount({ userData }: { userData: User }) {
  return (
    <div className="w-full">
      <Table>
        <TableBody>
          <TableRow className="w-full flex justify-between">
            <TableCell className="text-left w-fit">
              <span className="font-medium">Trainer Name</span>
            </TableCell>
            <TableCell className="inline-flex items-center justify-end gap-5 w-fit">
              <span className="font-medium text-right">
                {userData?.trainerName ? userData?.trainerName : "NA"}
              </span>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Edit className="w-4 h-4" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <ChangeTrainerForm AlertDialogFooter={AlertDialogFooter} />
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
          <Separator className="w-full" />
        </TableBody>
      </Table>
    </div>
  );
}

export default UserAccount;
