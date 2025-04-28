"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { ReportSchema } from "../../../../prisma/generated/zod";
import { DataType } from "@/app/(admin)/admin/reports/columns";
import { ReportStatus } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIClient } from "@/lib/api-client";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserRoundPenIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const updateReportSchema = ReportSchema.pick({ status: true });
type UpdateReportSchema = z.infer<typeof updateReportSchema>;

export default function ReportStatusUpdateDialog({
  report,
  dropdown = true,
}: {
  report: DataType;
  dropdown?: boolean;
}) {
  const router = useRouter();

  const statuses = Object.values(ReportStatus);

  const form = useForm<UpdateReportSchema>({
    resolver: zodResolver(updateReportSchema),
    defaultValues: {
      status: report.status,
    },
  });

  const onSubmit = async (values: UpdateReportSchema) => {
    try {
      const res = await APIClient.api.reports[":id"].$patch(
        {
          param: {
            id: report.id,
          },
          form: {
            status: values.status,
          },
        },
        {
          init: {
            credentials: "include",
          },
        }
      );

      if (res.ok) {
        toast.success("Successfully to update report status");
        router.refresh();
      } else {
        const json = await res.json();

        toast.error(json.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update report status");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {dropdown ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <UserRoundPenIcon className="mr-1" />
            Edit
          </DropdownMenuItem>
        ) : (
          <Button className="w-full">Perbarui Status</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perbarui Laporan</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="w-full capitalize"
                          placeholder="Select an status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((value, index) => (
                        <SelectItem
                          key={index}
                          value={value}
                          className="capitalize"
                        >
                          {value
                            .toLowerCase()
                            .replaceAll("_", " ")
                            .split(" ")
                            .map(
                              (value) =>
                                value.at(0)?.toUpperCase() + value.slice(1)
                            )
                            .join(" ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
