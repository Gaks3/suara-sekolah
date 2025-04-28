"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/app/api/[[...route]]/lib/auth";
import { LogOut } from "lucide-react"; // Import ikon logout
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

interface NavbarProps {
  session: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  } | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" width={100} height={100} className="w-10 h-auto" alt="logo" />
          <span className="text-xl font-bold text-primary">Suara Sekolah</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/tentang-kami" className="relative">
            <span
              className={`text-gray-500 font-semibold hover:text-primary transition cursor-pointer ${
                isActive("/tentang-kami") ? "text-primary" : ""
              }`}
            >
              Tentang Kami
            </span>
            {isActive("/tentang-kami") && (
              <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-primary rounded-full"></span>
            )}
          </Link>
          <Link href="/faq" className="relative">
            <span
              className={`text-gray-500 font-semibold hover:text-primary transition cursor-pointer ${
                isActive("/faq") ? "text-primary" : ""
              }`}
            >
              FAQ
            </span>
            {isActive("/faq") && (
              <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-primary rounded-full"></span>
            )}
          </Link>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
        <span className="text-gray-700 text-1xl font-semibold">
          {session?.user?.name}
        </span>
          {session?.user ? (
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                {session.user.name.charAt(0).toUpperCase()}
              </div>
              <form
                action={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      credentials: "include",
                    },
                  });

                  router.push("/sign-in");
                }}
              >
                <button
                  type="submit"
                  className="flex items-center text-gray-700 hover:text-primary transition"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link href="/sign-in">
                <button className="bg-primary text-sm text-white px-4 py-2 rounded-lg hover:bg-primary transition cursor-pointer">
                  Masuk
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="border-2 text-sm border-blue-700 bg-white hover:text-white text-primary px-4 py-1.5 rounded-lg hover:bg-primary transition">
                  Daftar
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Sidebar Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            <div
              className={`h-1 w-6 bg-gray-600 mb-1 rounded transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`h-1 w-6 bg-gray-600 mb-1 rounded transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`h-1 w-6 bg-gray-600 mb-1 rounded transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/50">
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <button
                  onClick={closeSidebar}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col p-4 space-y-6">
                <Link
                  href="/tentang-kami"
                  onClick={closeSidebar}
                  className="relative"
                >
                  <span
                    className={`block text-gray-600 hover:text-primary transition cursor-pointer py-2 ${
                      isActive("/tentang-kami")
                        ? "text-primary font-medium"
                        : ""
                    }`}
                  >
                    Tentang Kami
                  </span>
                </Link>
                <Link href="/faq" onClick={closeSidebar} className="relative">
                  <span
                    className={`block text-gray-600 hover:text-primary transition cursor-pointer py-2 ${
                      isActive("/faq") ? "text-primary font-medium" : ""
                    }`}
                  >
                    FAQ
                  </span>
                </Link>
                <div className="pt-4 border-t">
                  {session?.user ? (
                    <span className="block w-full text-center text-gray-700 font-semibold">
                      {session.user.name}
                    </span>
                  ) : (
                    <>
                      <Link href="/sign-in" onClick={closeSidebar}>
                        <span className="block w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition cursor-pointer text-center mb-3">
                          Login
                        </span>
                      </Link>
                      <Link href="/sign-up" onClick={closeSidebar}>
                        <span className="block w-full border-2 border-blue-700 bg-white hover:text-white text-primary rounded-lg py-2 hover:bg-primary transition cursor-pointer text-center">
                          Register
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
