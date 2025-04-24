import { headers as getHeaders } from "next/headers"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { authClient } from "@/lib/auth-client"
import { items } from "@/components/admin/item-admin-sidebar"
import { UserRole } from "@prisma/client"

export default async function AdminLayout({ children }: PropsWithChildren) {
  const headers = await getHeaders()

  const user = await authClient.getSession({
    fetchOptions: {
      headers,
    },
  })

  if (!user.data || (user.data?.user && user.data.user.role !== UserRole.admin))
    return notFound()

  const indexItem = items.findIndex(
    ({ url }) => url === headers.get("x-current-path")
  )

  return (
    <SidebarProvider>
      <AdminSidebar user={user.data.user} />
      <SidebarInset>
        <header className="flex items-center h-16 gap-2 border-b shrink-0 justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator orientation="vertical" className="mr-2 !h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium">
                    {items[indexItem]
                      ? items[indexItem].title
                      : "Admin Dashboard"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
