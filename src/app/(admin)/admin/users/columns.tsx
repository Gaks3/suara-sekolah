"use client"

import type { InferResponseType } from "hono"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { UserRole } from "@prisma/client"

import SortColumnHeader from "@/components/sort-column-header"
import { Badge } from "@/components/ui/badge"
import RoleFilterDropdown from "@/components/admin/users/role-filter-dropdown"

import type { APIClient } from "@/lib/api-client"
import { UnwrapArray } from "@/lib/types"
// import UserActionTable from "./components/user-action-table"

export type DataType = UnwrapArray<
  InferResponseType<typeof APIClient.api.users.$get, 200>["data"]
>

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortColumnHeader column={column} title="Id" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ table, column }) => (
      <RoleFilterDropdown table={table} column={column} />
    ),
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
    enableColumnFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortColumnHeader column={column} title="Created At" />
    ),
    accessorFn: ({ createdAt }) => format(createdAt, "PPP"),
    enableColumnFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActionTable user={row.original} />,
    enableColumnFilter: false,
  },
]

export const RoleBadge = ({ role }: { role: string }) => (
  <Badge
    variant={"outline"}
    className={`capitalize ${
      role === UserRole.admin
        ? "bg-green-50 text-green-700 border-green-200"
        : "bg-gray-50 text-gray-700 border-gray-200"
    }`}
  >
    {role}
  </Badge>
)
