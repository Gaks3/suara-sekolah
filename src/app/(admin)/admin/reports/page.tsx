import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { APIClient } from "@/lib/api-client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ReportsPage() {
  const reports = await APIClient.api.reports.$get(
    {
      query: {},
    },
    {
      init: {
        headers: await headers(),
      },
    }
  );

  if (reports.status === 401) return redirect("/");

  const { data: reportsData } = await reports.json();

  return (
    <div className="p-5">
      <div className="flex justify-between mt-5 items-center">
        <h2 className="text-xl font-semibold line-clamp-1">
          Reports Management
        </h2>
      </div>
      <DataTable columns={columns} data={reportsData} defaultFilter="title" />
    </div>
  );
}
