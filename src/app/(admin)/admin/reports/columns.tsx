"use client";

import CategoryFilterDropdown from "@/components/admin/repots/category-filter-dropdown";
import DepartmentFilterDropdown from "@/components/admin/repots/department-filter-dropdown";
import ReportActionTable from "@/components/admin/repots/report-action-table";
import StatusFilterDropdown from "@/components/admin/repots/status-filter-dropdown";
import SortColumnHeader from "@/components/sort-column-header";
import { Badge } from "@/components/ui/badge";
import { APIClient } from "@/lib/api-client";
import { UnwrapArray } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { InferResponseType } from "hono";
import {
  CheckCircle2Icon,
  ClockIcon,
  Loader2Icon,
  SearchCheckIcon,
} from "lucide-react";

export type DataType = UnwrapArray<
  InferResponseType<typeof APIClient.api.reports.$get, 200>["data"]
>;

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: "category",
    header: ({ table, column }) => (
      <CategoryFilterDropdown table={table} column={column} />
    ),
    cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    enableColumnFilter: false,
  },
  {
    accessorKey: "department",
    header: ({ table, column }) => (
      <DepartmentFilterDropdown table={table} column={column} />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "status",
    header: ({ table, column }) => (
      <StatusFilterDropdown table={table} column={column} />
    ),
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    enableColumnFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortColumnHeader column={column} title="Created At" />
    ),
    accessorFn: ({ createdAt }) => format(createdAt, "dd MMM yyyy"),
    enableColumnFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <ReportActionTable report={row.original} />,
    enableColumnFilter: false,
  },
];

export const CategoryBadge = ({
  category,
}: {
  category: DataType["category"];
}) => (
  <Badge
    variant={"outline"}
    className={cn(
      "capitalize",
      category === "PENGADUAN"
        ? "bg-red-50 text-red-700 border-red-200"
        : category === "ASPIRASI"
        ? "bg-blue-50 text-primary border-green-200"
        : "bg-gray-50 text-gray-700 border-gray-200"
    )}
  >
    {category.toLowerCase().replaceAll("_", " ")}
  </Badge>
);

export const StatusBadge = ({ status }: { status: DataType["status"] }) => (
  <Badge
    variant={"outline"}
    className={cn(
      "capitalize flex items-center gap-1",
      status === "PROSES_VERIFIKASI"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : status === "TERVERIFIKASI"
        ? "bg-blue-50 text-primary border-blue-200"
        : status === "TINDAK_LANJUT"
        ? "bg-red-50 text-red-700 border-red-200"
        : "bg-green-50 text-green-700 border-red-200"
    )}
  >
    {status === "PROSES_VERIFIKASI" ? (
      <ClockIcon className="size-3" />
    ) : status === "TERVERIFIKASI" ? (
      <SearchCheckIcon className="size-3" />
    ) : status === "TINDAK_LANJUT" ? (
      <Loader2Icon className="size-3" />
    ) : (
      <CheckCircle2Icon className="size-3" />
    )}
    {status.toLowerCase().replaceAll("_", " ")}
  </Badge>
);
