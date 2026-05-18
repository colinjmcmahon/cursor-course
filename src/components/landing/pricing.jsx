import Link from "next/link"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for exploring open source projects.",
    features: [
      "Track up to 5 repositories",
      "Basic AI summaries",
      "Star history (7 days)",
      "Weekly digest emails",
      "Community support",
    ],
    cta: "Get started",
    popular: false,
    comingSoon: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For developers who want deeper insights.",
    features: [
      "Track up to 50 repositories",
      "Advanced AI summaries",
      "Full star history",
      "Real-time PR alerts",
      "Version tracking",
      "Cool facts & analytics",
      "Priority support",
    ],
    cta: "Start free trial",
    popular: false,
    comingSoon: true
  },
  {
    name: "Team",
    price: "$39",
    period: "/month",
    description: "For teams monitoring critical dependencies.",
    features: [
      "Unlimited repositories",
      "Everything in Pro",
      "Team dashboards",
      "Custom notifications",
      "API access",
      "SSO & audit logs",
      "Dedicated support",
    ],
    cta: "Contact sales",
    popular: false,
    comingSoon: true,
  },
]

export const Pricing = () => {
  return (
    <section id="pricing" className="border-t border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col rounded-xl border border-border bg-white py-0 shadow-sm ${
                plan.popular ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
            >
              {plan.popular ? (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most popular
                </Badge>
              ) : null}
              {plan.comingSoon ? (
                <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                  Coming Soon
                </Badge>
              ) : null}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period ? <span className="text-muted-foreground">{plan.period}</span> : null}
                </div>
                <CardDescription className="mt-2 text-muted-foreground">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="size-4 shrink-0 text-foreground" aria-hidden />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.comingSoon ? (
                  <Button
                    className="w-full rounded-lg"
                    variant={plan.popular ? "default" : "outline"}
                    disabled
                  >
                    Coming Soon
                  </Button>
                ) : (
                  <Button asChild className="w-full rounded-lg" variant={plan.popular ? "default" : "outline"}>
                    <Link href="/dashboards">{plan.cta}</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
