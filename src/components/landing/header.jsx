"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { HeaderAuth } from "@/components/landing/header-auth"

export const Header = ({ user }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2"
          aria-label="Dandi Github Analyzer home"
        >
          <Github className="size-6 shrink-0 text-foreground sm:size-7" aria-hidden />
          <span className="whitespace-nowrap text-sm font-bold tracking-tight text-foreground sm:text-base lg:text-lg">
            Dandi Github Analyzer
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
          <nav className="hidden items-center gap-6 md:flex md:gap-8" aria-label="Main">
            <Link
              href="#features"
              className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/dashboards"
              className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          </nav>

          <Link
            href="/dashboards"
            className="whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:hidden"
          >
            Dashboard
          </Link>

          <HeaderAuth user={user} />
        </div>
      </div>
    </header>
  )
}
