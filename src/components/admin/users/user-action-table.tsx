import { MoreVerticalIcon } from "lucide-react";

import { DataType } from "@/app/(admin)/admin/users/columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserUpdateDialog from "./user-update-dialog";
import UserDeleteDialog from "./user-delete-dialog";

export default function UserActionTable({ user }: { user: DataType }) {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <MoreVerticalIcon size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <UserUpdateDialog user={user} />
          <UserDeleteDialog user={user} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
