"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Text */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo-icon.png"
            alt="CareNest Logo"
            width={65} 
            height={65}
            priority
            className="object-contain"
          />

          <div className="leading-tight hidden sm:block">
            <h1 className="text-2xl font-bold text-gray-900">
              Care<span className="text-purple-600">Nest</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link" href="/services">
            Services
          </Link>
          <Link className="nav-link" href="/my-bookings">
            My Bookings
          </Link>

          <Button size="sm" className="ml-2 bg-purple-600 hover:bg-purple-700">
            Login
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                Menu
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-6">
                <Link href="/">Home</Link>
                <Link href="/services">Services</Link>
                <Link href="/my-bookings">My Bookings</Link>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                  Login
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
