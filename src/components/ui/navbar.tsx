"use client";

import { useState } from "react";
import { School } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link rel="stylesheet" href="/" className="flex items-center space-x-2">
          <School className="text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Suara Sekolah</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/tentang">
            <span className="text-gray-500 font-semibold hover:text-blue-600 transition cursor-pointer">
              Tentang Kami
            </span>
          </Link>
          <Link href="/faq">
            <span className="text-gray-500 font-semibold hover:text-blue-600 transition cursor-pointer">
              FAQ
            </span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link href="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
              Masuk
            </button>
          </Link>
          <Link href="/register">
            <button className="border-2 border-blue-700 bg-white hover:text-white text-blue-700 px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">
              Daftar
            </button>
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
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
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <School className="text-blue-600" />
                  <span className="text-xl font-bold text-gray-800">
                    Suara Sekolah
                  </span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col p-4 space-y-6">
                <Link href="/tentang" onClick={closeSidebar}>
                  <span className="block text-gray-600 hover:text-blue-600 transition cursor-pointer py-2">
                    Tentang Kami
                  </span>
                </Link>
                <Link href="/faq" onClick={closeSidebar}>
                  <span className="block text-gray-600 hover:text-blue-600 transition cursor-pointer py-2">
                    FAQ
                  </span>
                </Link>
                <div className="pt-4 border-t">
                  <Link href="/login" onClick={closeSidebar}>
                    <span className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer text-center mb-3">
                      Login
                    </span>
                  </Link>
                  <Link href="/register" onClick={closeSidebar}>
                    <span className="block w-full border-2 border-blue-700 bg-white hover:text-white text-blue-700 rounded-lg py-2 hover:bg-blue-700 transition cursor-pointer text-center">
                      Register
                    </span>
                  </Link>
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
