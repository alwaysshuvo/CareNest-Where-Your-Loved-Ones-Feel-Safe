"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo-icon.png"
            alt="CareNest Logo"
            width={65}
            height={65}
            priority
            className="object-contain"
          />
          <h1 className="text-2xl font-bold hidden sm:block">
            Care<span className="text-purple-600">Nest</span>
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6">
          <Link className="nav-link" href="/">Home</Link>
          <Link className="nav-link" href="/services">Services</Link>
          <Link className="nav-link" href="/my-bookings">My Bookings</Link>

          {/* AUTH AREA */}
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative focus:outline-none">
                  <Image
                    src={session.user?.image || "/assets/avatar.png"}
                    alt="Profile"
                    width={44}
                    height={44}
                    className="rounded-full border-2 border-purple-500 shadow-sm cursor-pointer transition hover:scale-105 hover:ring-2 hover:ring-purple-300"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 mt-3 rounded-xl overflow-hidden shadow-xl border animate-in fade-in zoom-in-95"
              >
                {/* USER INFO */}
                <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                  <p className="font-semibold text-sm">
                    {session.user?.name}
                  </p>
                  <p className="text-xs opacity-90 truncate">
                    {session.user?.email}
                  </p>
                </div>

                <DropdownMenuSeparator />

                {/* PROFILE */}
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* LOGOUT */}
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* MOBILE */}
        <div className="md:hidden">
          {status === "authenticated" ? (
            <Link href="/profile">
              <Image
                src={session.user?.image || "/assets/avatar.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-purple-500"
              />
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
