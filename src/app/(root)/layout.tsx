import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const {data} = await authClient.getSession(void 0, {
    headers: await headers()
  })
    
  return (
    <main>
      <Navbar session={data} />
      {children}
      <Footer />
    </main>
  );
}