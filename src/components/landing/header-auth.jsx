"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { AuthPanel } from "@/components/AuthPanel"

export const HeaderAuth = ({ user: initialUser }) => {
  const router = useRouter()
  const [user, setUser] = useState(initialUser)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      if (error) return
      setUser(null)
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <AuthPanel initialUser={user} compact loginLabel="Login" showGoogleIcon={false} />
  }

  const displayName =
    user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Signed in"
  const avatarUrl = user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null
  const initial = (displayName.trim()[0] ?? "?").toUpperCase()

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-primary">{displayName}</span>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt=""
          width={36}
          height={36}
          className="size-9 rounded-full object-cover ring-2 ring-border"
        />
      ) : (
        <div
          className="flex size-9 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground ring-2 ring-border"
          aria-hidden
        >
          {initial}
        </div>
      )}
      <button
        type="button"
        className="text-sm font-medium text-red-500 transition-colors hover:text-red-600 disabled:opacity-50"
        onClick={handleSignOut}
        disabled={isLoading}
        aria-label="Sign out"
      >
        {isLoading ? "Signing out…" : "Sign Out"}
      </button>
    </div>
  )
}
