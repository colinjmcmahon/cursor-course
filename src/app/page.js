import { ApiDemo } from "@/components/landing/api-demo"
import { About } from "@/components/landing/about"
import { CTA } from "@/components/landing/cta"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Pricing } from "@/components/landing/pricing"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  let user = null

  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // Env may be unset in some environments
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header user={user} />
      <main>
        <Hero user={user} />
        <Features />
        <ApiDemo /> 
        <Pricing />
       
        <About />
        <CTA user={user} />
      </main>
      <Footer />
    </div>
  )
}
