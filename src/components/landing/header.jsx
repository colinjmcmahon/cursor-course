"use client"

import Link from "next/link"
import { useState } from "react"
import { Github, Menu, X } from "lucide-react"
import { HeaderAuth } from "@/components/landing/header-auth"

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "/dashboards", label: "Dashboard" },
]

export const Header = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="mx-auto flex h-14 min-h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          aria-label="Dandi Github Analyzer home"
          onClick={handleCloseMobileMenu}
        >
          <Github className="size-6 shrink-0 text-foreground sm:size-7" aria-hidden />
          <span className="truncate text-sm font-bold tracking-tight text-foreground sm:text-base lg:hidden">
            Dandi
          </span>
          <span className="hidden whitespace-nowrap text-sm font-bold tracking-tight text-foreground lg:inline lg:text-lg">
            Dandi Github Analyzer
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex md:gap-8" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <HeaderAuth user={user} compactOnMobile />

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={handleToggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-main-nav"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <nav
          id="mobile-main-nav"
          className="border-t border-border bg-white px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-foreground/90 transition-colors hover:bg-muted hover:text-foreground"
                  onClick={handleCloseMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
