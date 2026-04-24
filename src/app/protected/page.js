"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ActionToast } from "../dashboards/components/ActionToast"
import { useActionToast } from "../dashboards/hooks/useActionToast"

const ProtectedContent = () => {
  const searchParams = useSearchParams()
  const apiKey = `${searchParams.get("apiKey") ?? ""}`.trim()

  const [isValidating, setIsValidating] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [validationError, setValidationError] = useState("")
  const { actionToast, showActionToast, dismissActionToast } = useActionToast()

  useEffect(() => {
    const validateApiKey = async () => {
      if (!apiKey) {
        setHasAccess(false)
        setValidationError("Add an API key from the playground page before visiting /protected.")
        showActionToast("invalid api key", "danger")
        return
      }

      try {
        setIsValidating(true)
        setValidationError("")

        const response = await fetch("/api/keys/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ apiKey }),
        })

        const payload = await response.json()
        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to validate API key")
        }

        if (payload.valid) {
          setHasAccess(true)
          showActionToast("valid api key, /protected can be accessed")
          return
        }

        setHasAccess(false)
        showActionToast("invalid api key", "danger")
      } catch (error) {
        setHasAccess(false)
        setValidationError(error.message ?? "Unable to validate API key")
        showActionToast("invalid api key", "danger")
      } finally {
        setIsValidating(false)
      }
    }

    validateApiKey()
  }, [apiKey, showActionToast])

  return (
    <>
      <ActionToast actionToast={actionToast} onDismiss={dismissActionToast} />
      <section className="rounded-[28px] border border-stone-200/80 bg-[#fefdfb] p-8 sm:p-10">
        {isValidating ? (
          <p className="text-sm text-stone-600">Validating API key...</p>
        ) : hasAccess ? (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-stone-900">Access granted</h2>
            <p className="text-sm text-stone-600">You are authorized to view protected content.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-rose-700">Access denied</h2>
            <p className="text-sm text-stone-600">
              {validationError || "The provided key is not valid for protected access."}
            </p>
          </div>
        )}
      </section>
    </>
  )
}

const ProtectedPage = () => {
  return (
    <div className="min-h-screen bg-[#fdfaf6] px-5 py-10 text-stone-900 sm:px-8">
      <div className="mx-auto w-full max-w-[720px]">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Protected</h1>
            <p className="mt-1 text-sm text-stone-600">This page validates access using your API key</p>
          </div>
          <Link
            href="/playground"
            className="rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
          >
            Back to Playground
          </Link>
        </header>

        <Suspense
          fallback={
            <section className="rounded-[28px] border border-stone-200/80 bg-[#fefdfb] p-8 sm:p-10">
              <p className="text-sm text-stone-600">Validating API key...</p>
            </section>
          }
        >
          <ProtectedContent />
        </Suspense>
      </div>
    </div>
  )
}

export default ProtectedPage
