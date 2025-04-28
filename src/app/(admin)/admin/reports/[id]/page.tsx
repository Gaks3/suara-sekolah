import {
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  MessageSquareIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";

import { APIClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RoleBadge } from "../../users/columns";
import { CategoryBadge, StatusBadge } from "../columns";
import ReportStatusUpdateDialog from "@/components/admin/repots/report-status-update-dialog";

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const reportId = Number((await params).id);

  const report = await APIClient.api.reports[":id"].$get(
    {
      param: {
        id: reportId,
      },
    },
    {
      init: {
        headers: await headers(),
      },
    }
  );

  if (report.status === 404) return notFound();
  else if (report.status === 401) return redirect("/sign-in");

  const { data: reportData } = await report.json();

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={"/admin/reports"}>
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              Report Details #{reportData.id}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{reportData.title}</CardTitle>
                    <StatusBadge status={reportData.status} />
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Reported on{" "}
                    {format(reportData.createdAt, "dd MMMM yyyy, HH:mm")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {reportData.image && (
                  <div className="overflow-hidden rounded-md border">
                    <Image
                      src={reportData.image}
                      alt="Report Image"
                      width={500}
                      height={300}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Report Description
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {reportData.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Report Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    Reporter
                  </div>
                  <div className="text-sm">
                    {reportData.anonym ? (
                      <span className="italic text-muted-foreground">
                        Anonym
                      </span>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <div className="font-medium text-base">
                            {reportData.user.name}
                          </div>
                          <div className="text-muted-foreground">
                            {reportData.user.email}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 pt-1">
                          {reportData.user.role === "siswa" && (
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center gap-2">
                                <RoleBadge role={reportData.user.role} />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-xs text-muted-foreground">
                                  NIS:
                                </div>
                                <div className="text-xs font-medium">
                                  {reportData.user.nis}
                                </div>
                              </div>
                            </div>
                          )}

                          {reportData.user.role === "guru" && (
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center gap-2">
                                <RoleBadge role={reportData.user.role} />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-xs text-muted-foreground">
                                  NIP:
                                </div>
                                <div className="text-xs font-medium">
                                  {reportData.user.nip}
                                </div>
                              </div>
                            </div>
                          )}

                          {reportData.user.role === "karyawan" && (
                            <div className="flex items-center gap-2">
                              <RoleBadge role={reportData.user.role} />
                            </div>
                          )}

                          {reportData.user.role === "admin" && (
                            <div className="flex items-center gap-2">
                              <RoleBadge role={reportData.user.role} />
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <div className="text-xs text-muted-foreground">
                              Telephone:
                            </div>
                            <div className="text-xs font-medium">
                              {reportData.user.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                    Category
                  </div>
                  <div>
                    <CategoryBadge category={reportData.category} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                    Departement
                  </div>
                  <div className="text-sm">{reportData.department}</div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
                    Status
                  </div>
                  <div>
                    <StatusBadge status={reportData.status} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    Date
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Created At:{" "}
                      </span>
                      {format(reportData.createdAt, "dd MMM yyyy, HH:mm")}
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Updated At:{" "}
                      </span>
                      {format(reportData.updatedAt, "dd MMM yyyy, HH:mm")}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <ReportStatusUpdateDialog
                  report={reportData}
                  dropdown={false}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
