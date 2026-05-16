import Link from "next/link"
import { Button } from "@/components/ui/button"

export const Hero = ({ user }) => {
  const primaryHref = "/dashboards"
  const primaryLabel = user ? "Open Dashboard" : "Get Started"

  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 pb-20 pt-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Unlock GitHub Insights with Dandi
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Get powerful insights, summaries, and analytics for open source GitHub repositories. Discover trends,
          track important updates, and stay ahead of the curve.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 min-w-[140px] rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground shadow-none hover:bg-primary/90"
          >
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 min-w-[140px] rounded-lg border-primary/40 bg-transparent px-8 text-base font-medium text-primary shadow-none hover:bg-primary/5"
          >
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
