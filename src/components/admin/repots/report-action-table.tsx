import { DataType } from "@/app/(admin)/admin/reports/columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileSearch2Icon, MoreVerticalIcon } from "lucide-react";
import ReportDeleteDialog from "./report-delete-dialog";
import Link from "next/link";
import ReportStatusUpdateDialog from "./report-status-update-dialog";

export default function ReportActionTable({ report }: { report: DataType }) {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <MoreVerticalIcon size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              href={`/admin/reports/${report.id}`}
              className="flex gap-1 items-center"
            >
              <FileSearch2Icon />
              See Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ReportStatusUpdateDialog report={report} />
          <ReportDeleteDialog report={report} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
