"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  ClockIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder-logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" active={pathname === "/"}>
              <LayoutDashboardIcon className="h-4 w-4" />
              <span>Book</span>
            </NavLink>

            <NavLink href="/trips" active={pathname === "/trips"}>
              <ClockIcon className="h-4 w-4" />
              <span>My Trips</span>
            </NavLink>

            <NavLink href="/profile" active={pathname === "/profile"}>
              <UserIcon className="h-4 w-4" />
              <span>Profile</span>
            </NavLink>

            <Button className="ml-2 font-exxaro">Sign In</Button>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-slate-100 mt-4">
            <ul className="space-y-2">
              <li>
                <MobileNavLink href="/" active={pathname === "/"}>
                  <LayoutDashboardIcon className="h-5 w-5 text-primary" />
                  <span>Book</span>
                </MobileNavLink>
              </li>
              <li>
                <MobileNavLink href="/trips" active={pathname === "/trips"}>
                  <ClockIcon className="h-5 w-5 text-primary" />
                  <span>My Trips</span>
                </MobileNavLink>
              </li>
              <li>
                <MobileNavLink href="/profile" active={pathname === "/profile"}>
                  <UserIcon className="h-5 w-5 text-primary" />
                  <span>Profile</span>
                </MobileNavLink>
              </li>
              <li className="pt-2">
                <Button className="w-full font-exxaro">Sign In</Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link href={href}>
      <div
        className={`
        flex items-center gap-2 px-4 py-2 rounded-md font-exxaro transition-all
        relative
        ${
          active
            ? "text-primary font-medium"
            : "text-secondary hover:text-primary hover:bg-slate-50"
        }
      `}
      >
        {children}
        {active && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
        )}
      </div>
    </Link>
  );
}

function MobileNavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link href={href}>
      <div
        className={`
        flex items-center gap-2 p-2 rounded-md font-exxaro
        ${
          active
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-slate-50"
        }
      `}
      >
        {children}
      </div>
    </Link>
  );
}
