"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  IconSidebarBook,
  IconSidebarBulb,
  IconSidebarClipboard,
  IconSidebarCode,
  IconSidebarFile,
  IconSidebarHome,
} from "./icons"

const SIDEBAR_NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: IconSidebarHome, href: "/dashboards", disabled: false },
  { id: "research-assistant", label: "Research Assistant", icon: IconSidebarBulb, href: "#", disabled: true },
  { id: "research-reports", label: "Research Reports", icon: IconSidebarFile, href: "#", disabled: true },
  { id: "api-playground", label: "API Playground", icon: IconSidebarCode, href: "/playground", disabled: false },
  { id: "invoices", label: "Invoices", icon: IconSidebarClipboard, href: "#", disabled: true },
  { id: "documentation", label: "Documentation", icon: IconSidebarBook, href: "#", disabled: true },
]

export const DashboardSidebar = ({ activeSidebarItem, onSelectItem }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(true)

  const handleToggleMobileNav = () => {
    setIsMobileNavOpen((open) => !open)
  }

  return (
    <aside className="w-full lg:sticky lg:top-8 lg:w-[280px] lg:shrink-0 xl:w-[300px]">
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white sm:rounded-[26px]">
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-7">
          <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl lg:text-4xl">Dandi AI</h2>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100 lg:hidden"
            onClick={handleToggleMobileNav}
            aria-expanded={isMobileNavOpen}
            aria-controls="dashboard-sidebar-nav"
            aria-label={isMobileNavOpen ? "Collapse navigation" : "Expand navigation"}
          >
            <ChevronDown
              className={`size-5 transition-transform ${isMobileNavOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        </div>

        <nav
          id="dashboard-sidebar-nav"
          className={`py-2 lg:block lg:py-4 ${isMobileNavOpen ? "block" : "hidden"}`}
          aria-label="Sidebar navigation"
        >
          <ul className="space-y-0.5">
            {SIDEBAR_NAV_ITEMS.map((item) => {
              const isActive = activeSidebarItem === item.id
              const isDisabled = item.disabled
              const Icon = item.icon

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={(event) => {
                      if (isDisabled) {
                        event.preventDefault()
                        return
                      }
                      onSelectItem(item.id)
                    }}
                    aria-current={isActive ? "page" : undefined}
                    aria-disabled={isDisabled}
                    className={`flex min-h-11 items-center gap-3 px-4 py-3 text-base font-medium transition-colors sm:gap-4 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4 lg:text-xl ${
                      isActive
                        ? "bg-violet-50 text-violet-600"
                        : isDisabled
                          ? "cursor-not-allowed text-slate-400"
                          : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon
                      className={`size-5 shrink-0 sm:size-6 ${isActive ? "text-violet-600" : "text-slate-500"}`}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
