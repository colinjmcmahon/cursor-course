import Link from "next/link"
import { Github } from "lucide-react"

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Playground", href: "/playground" },
  ],
  Company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
}

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="Dandi home">
              <Github className="size-6 text-foreground" aria-hidden />
              <span className="font-bold text-foreground">Dandi</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Deep insights for GitHub repositories.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Dandi Github Analyzer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
