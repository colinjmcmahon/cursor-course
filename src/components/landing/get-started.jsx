import { AuthPanel } from "@/components/AuthPanel"

export const GetStarted = ({ user }) => {
  if (user) return null

  return (
    <section id="get-started" className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">Create your account</h2>
          <p className="mt-3 text-muted-foreground">Sign in with Google to get API keys and access the dashboard.</p>
        </div>
        <div className="mt-8 rounded-xl border border-border bg-card/50 p-6">
          <AuthPanel initialUser={user} />
        </div>
      </div>
    </section>
  )
}
