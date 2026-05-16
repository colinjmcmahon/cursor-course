import Link from "next/link"
import { Button } from "@/components/ui/button"

export const CTA = ({ user }) => {
  const primaryHref = "/dashboards"
  const primaryLabel = user ? "Open Dashboard" : "Get Started"

  return (
    <section className="border-t border-border bg-white px-4 py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center lg:px-8">
        <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Ready to get insights on your favorite repos?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Join developers who use Dandi to track and understand open source projects.
        </p>
        <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <Button asChild size="lg" className="h-12 w-full rounded-lg px-8 sm:min-w-[140px] sm:w-auto">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-lg border-primary/40 px-8 text-primary hover:bg-primary/5 sm:min-w-[140px] sm:w-auto"
          >
            <Link href="/playground">Try the playground</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
