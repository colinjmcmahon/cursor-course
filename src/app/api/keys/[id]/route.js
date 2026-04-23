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

const getRouteId = async (params) => {
  const resolvedParams = await params
  return `${resolvedParams?.id ?? ""}`.trim()
}

export async function PATCH(request, { params }) {
  let supabaseAdmin
  try {
    supabaseAdmin = getSupabaseAdmin()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const id = await getRouteId(params)
  if (!id) {
    return NextResponse.json({ error: "API key id is required" }, { status: 400 })
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
    .update({
      name,
      key_type: keyType,
      permissions,
    })
    .eq("id", id)
    .select("id,name,key,key_type,usage,permissions,created_at,status")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(mapApiKeyRecord(data))
}

export async function DELETE(_request, { params }) {
  let supabaseAdmin
  try {
    supabaseAdmin = getSupabaseAdmin()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const id = await getRouteId(params)
  if (!id) {
    return NextResponse.json({ error: "API key id is required" }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from("api_keys").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
