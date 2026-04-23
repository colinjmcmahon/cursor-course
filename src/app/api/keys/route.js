import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabaseAdmin"

const mapApiKeyRecord = (record) => ({
  id: record.id,
  name: record.name,
  key: record.key,
  keyType: record.key_type,
  usage: record.usage,
  permissions: record.permissions,
  createdAt: new Date(record.created_at).toISOString().split("T")[0],
  status: record.status,
})

const createNewApiKey = (keyType) => {
  const randomValue = crypto.randomUUID().replaceAll("-", "").slice(0, 24)
  return keyType === "dev" ? `dandi-dev-${randomValue}` : `dandi-prod-${randomValue}`
}

export async function GET() {
  let supabaseAdmin
  try {
    supabaseAdmin = getSupabaseAdmin()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data, error } = await supabaseAdmin
    .from("api_keys")
    .select("id,name,key,key_type,usage,permissions,created_at,status")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data.map(mapApiKeyRecord))
}

export async function POST(request) {
  let supabaseAdmin
  try {
    supabaseAdmin = getSupabaseAdmin()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const body = await request.json()

  const name = `${body.name ?? ""}`.trim()
  const keyType = body.keyType === "prod" ? "prod" : "dev"
  const permissions = keyType === "prod" ? "read-write" : `${body.permissions ?? "read-only"}`

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from("api_keys")
    .insert({
      name,
      key: createNewApiKey(keyType),
      key_type: keyType,
      usage: 0,
      permissions,
      status: "active",
    })
    .select("id,name,key,key_type,usage,permissions,created_at,status")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(mapApiKeyRecord(data), { status: 201 })
}
