"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinkClass = (path: string) =>
    `text-[17px] font-medium transition ${
      pathname === path
        ? "text-purple-600 border-b-2 border-purple-600"
        : "text-gray-700 hover:text-purple-600"
    }`;

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* LEFT (Hamburger + Logo) */}
        <div className="flex items-center gap-3">
          {/* HAMBURGER */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo-icon.png"
              alt="CareNest Logo"
              width={56}
              height={56}
              priority
            />
            <h1 className="text-2xl font-bold hidden sm:block">
              Care<span className="text-purple-600">Nest</span>
            </h1>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8">
          <Link className={navLinkClass("/")} href="/">Home</Link>
          <Link className={navLinkClass("/services")} href="/services">
            Services
          </Link>
          <Link className={navLinkClass("/my-bookings")} href="/my-bookings">
            My Bookings
          </Link>

          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={session.user?.image || "/assets/avatar.png"}
                  alt="Profile"
                  width={44}
                  height={44}
                  className="rounded-full border-2 border-purple-500 cursor-pointer"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-60 mt-3 rounded-xl">
                <div className="px-4 py-3 bg-purple-600 text-white">
                  <p className="font-semibold text-sm">
                    {session.user?.name}
                  </p>
                  <p className="text-xs truncate">
                    {session.user?.email}
                  </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User size={16} /> Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600"
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="text-[16px] bg-purple-600 hover:bg-purple-700">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* RIGHT (Mobile Profile/Login) */}
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

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col gap-5 px-6 py-5 text-[17px] font-medium">
            <Link onClick={() => setOpen(false)} href="/">Home</Link>
            <Link onClick={() => setOpen(false)} href="/services">Services</Link>
            <Link onClick={() => setOpen(false)} href="/my-bookings">
              My Bookings
            </Link>

            {status === "authenticated" ? (
              <>
                <Link onClick={() => setOpen(false)} href="/profile">
                  Profile
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
