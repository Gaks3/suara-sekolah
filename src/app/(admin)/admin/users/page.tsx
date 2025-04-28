import { headers } from "next/headers";

import UserCreateDialog from "@/components/admin/users/user-create-dialog";
import { APIClient } from "@/lib/api-client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function UsersPage() {
  const users = await APIClient.api.users.$get(void 0, {
    init: {
      headers: await headers(),
    },
  });

  const { data: usersData } = await users.json();

  return (
    <div className="p-5">
      <div className="flex justify-between mt-5 items-center">
        <h2 className="text-xl font-semibold line-clamp-1">Users Management</h2>
        <UserCreateDialog />
      </div>
      <DataTable columns={columns} data={usersData} defaultFilter="name" />
    </div>
  );
}
