import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // const session = await authClient.getSession({
  //   fetchOptions: {
  //       headers: await headers(),
  //   }
  // });

  // if (session) {
  //   redirect("/dashboard");
  // }

  return <div className="h-screen flex flex-col items-center justify-center">{children}</div>;
}