"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const PlaygroundPage = () => {
  const router = useRouter()
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedApiKey = apiKey.trim()
    if (!trimmedApiKey) return
    router.push(`/protected?apiKey=${encodeURIComponent(trimmedApiKey)}`)
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fdfaf6] px-4 py-8 text-stone-900 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-[720px]">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">API Playground</h1>
            <p className="mt-1 text-sm text-stone-600">Submit an API key to access the protected page</p>
          </div>
          <Link
            href="/dashboards"
            className="inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded-full border border-stone-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
          >
            Back to Dashboard
          </Link>
        </header>

        <section className="rounded-2xl border border-stone-200/80 bg-[#fefdfb] p-5 sm:rounded-[28px] sm:p-8 lg:p-10">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
              API key
              <input
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                className="min-h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-base font-normal text-stone-900 outline-none ring-stone-400/50 transition focus:ring-2 sm:text-sm"
                placeholder="e.g. dandi-dev-..."
                aria-label="API key input"
                autoComplete="off"
              />
            </label>

            <div className="mt-2 flex sm:justify-end">
              <button
                type="submit"
                className="min-h-11 w-full rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
              >
                Validate key
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default PlaygroundPage
