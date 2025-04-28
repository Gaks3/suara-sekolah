import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";

import { DataType } from "@/app/(admin)/admin/reports/columns";
import { APIClient } from "@/lib/api-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ReportDeleteDialog({ report }: { report: DataType }) {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const res = await APIClient.api.reports[":id"].$delete(
        {
          param: {
            id: report.id,
          },
        },
        {
          init: {
            credentials: "include",
          },
        }
      );

      if (res.status === 204) {
        toast.success("Successfully to delete report");

        router.refresh();
      } else {
        const json = await res.json();

        toast.error(json.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete report");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="!text-destructive"
        >
          <TrashIcon className="mr-1 !text-destructive" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            report and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button asChild variant={"destructive"} onClick={onSubmit}>
            <AlertDialogAction>Delete</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
