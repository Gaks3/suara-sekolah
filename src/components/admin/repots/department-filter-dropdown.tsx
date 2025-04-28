import { ReportDepartment } from "@prisma/client";
import { Column, Table } from "@tanstack/react-table";
import { ChevronDown, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DepartmentFilterDropdown<TData, TValue>({
  table,
  column,
}: {
  table: Table<TData>;
  column: Column<TData, TValue>;
}) {
  const departments = Object.values(ReportDepartment);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 font-sans data-[state=open]:bg-accent"
        >
          Department
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => table.getColumn("department")?.setFilterValue("")}
        >
          None
        </DropdownMenuItem>
        {departments.map((department, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() =>
              table.getColumn("departmnet")?.setFilterValue(department)
            }
            className="uppercase"
          >
            {department.toLowerCase().replaceAll("_", " ")}
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
