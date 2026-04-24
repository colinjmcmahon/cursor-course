import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(request) {
  let supabaseAdmin

  try {
    supabaseAdmin = getSupabaseAdmin()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const body = await request.json()
  const apiKey = `${body.apiKey ?? ""}`.trim()

  if (!apiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from("api_keys")
    .select("id,status")
    .eq("key", apiKey)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data || data.status !== "active") {
    return NextResponse.json({ valid: false })
  }

  return NextResponse.json({ valid: true })
}
