import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReportCategory } from "@prisma/client";
import { Column, Table } from "@tanstack/react-table";
import { ChevronDownIcon, EyeOffIcon } from "lucide-react";

export default function CategoryFilterDropdown<TData, TValue>({
  table,
  column,
}: {
  table: Table<TData>;
  column: Column<TData, TValue>;
}) {
  const categories = Object.values(ReportCategory);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 font-sans data-[state=open]:bg-accent"
        >
          Category
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => table.getColumn("category")?.setFilterValue("")}
        >
          None
        </DropdownMenuItem>
        {categories.map((category, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() =>
              table.getColumn("category")?.setFilterValue(category)
            }
            className="capitalize"
          >
            {category.toLowerCase().replaceAll("_", " ")}
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
