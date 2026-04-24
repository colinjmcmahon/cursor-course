import Link from "next/link"
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
  return (
    <aside className="w-full lg:sticky lg:top-8 lg:w-[300px] lg:shrink-0">
      <div className="overflow-hidden rounded-[26px] border border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-8 py-7">
          <h2 className="text-4xl font-semibold tracking-tight text-black">Dandi AI</h2>
        </div>

        <nav className="py-4" aria-label="Sidebar navigation">
          <ul className="space-y-1">
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
                    className={`flex items-center gap-4 px-8 py-4 text-xl font-medium transition-colors ${
                      isActive
                        ? "bg-violet-50 text-violet-500"
                        : isDisabled
                          ? "cursor-not-allowed text-slate-500"
                          : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${isActive ? "text-violet-500" : "text-slate-500"}`} />
                    <span>{item.label}</span>
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
