import { ReportStatus } from "@prisma/client";
import { Column, Table } from "@tanstack/react-table";
import { ChevronDownIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function StatusFilterDropdown<TData, TValue>({
  table,
  column,
}: {
  table: Table<TData>;
  column: Column<TData, TValue>;
}) {
  const statuses = Object.values(ReportStatus);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 font-sans data-[state=open]:bg-accent"
        >
          Status
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => table.getColumn("status")?.setFilterValue("")}
        >
          None
        </DropdownMenuItem>
        {statuses.map((status, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => table.getColumn("status")?.setFilterValue(status)}
            className="capitalize"
          >
            {status.toLowerCase().replaceAll("_", " ")}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
