/**
 * Inserts a profile row the first time we see this auth user after login.
 * Later logins leave the row unchanged (ignoreDuplicates).
 */
export const ensureUserProfile = async (supabase, user) => {
  if (!user?.id) {
    return { ok: false, skipped: true }
  }

  const meta = user.user_metadata ?? {}
  const fullName =
    meta.full_name ?? meta.name ?? meta.preferred_username ?? null
  const avatarUrl = meta.avatar_url ?? meta.picture ?? null

  const row = {
    id: user.id,
    email: user.email ?? null,
    full_name: fullName,
    avatar_url: avatarUrl,
  }

  const { error } = await supabase
    .from("profiles")
    .upsert(row, { onConflict: "id", ignoreDuplicates: true })

  if (error) {
    console.error("[ensureUserProfile]", error.message)
    return { ok: false, error }
  }

  return { ok: true }
}
