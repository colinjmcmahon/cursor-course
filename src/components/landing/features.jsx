import { BarChart3, GitPullRequest, Lightbulb, Star, Tag, Zap } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "AI Summaries",
    description:
      "Get instant AI-generated summaries of any repository, including purpose, tech stack, and key highlights.",
  },
  {
    icon: Star,
    title: "Star Analytics",
    description: "Track star growth over time with detailed charts and predictions for trending repositories.",
  },
  {
    icon: Lightbulb,
    title: "Cool Facts",
    description: "Discover interesting facts about repos: top contributors, commit patterns, and hidden gems.",
  },
  {
    icon: GitPullRequest,
    title: "PR Insights",
    description: "Stay updated on important pull requests with smart filtering for breaking changes and features.",
  },
  {
    icon: Tag,
    title: "Version Tracking",
    description: "Never miss a release. Get notifications for new versions with changelog summaries.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Instant notifications when something important happens in your tracked repositories.",
  },
]

export const Features = () => {
  return (
    <section id="features" className="border-t border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to track open source
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            Powerful features to help you understand and monitor any GitHub repository.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article
                key={feature.title}
                className="rounded-xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
