import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabaseAdmin"
import { summarizeReadmeWithLangChain } from "./chain"

export async function POST(request) {

  let supabaseAdmin

  try {
    supabaseAdmin = getSupabaseAdmin()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  let body = {}
  try {
    body = await request.json()
  } catch (_error) {
    // Allow header-only requests (no JSON body) from tools like Postman
  }

  const headerApiKey = `${request.headers.get("x-api-key") ?? ""}`.trim()
  const bodyApiKey = `${body.apiKey ?? ""}`.trim()
  const apiKey = headerApiKey || bodyApiKey

  if (!apiKey) {
    return NextResponse.json({ error: "the API key is required" }, { status: 400 })
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
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  let readmeContent = ""
  try {
    readmeContent = await getReadmeContent(body.githubUrl)
  } catch (fetchError) {
    return NextResponse.json(
      {
        ok: false,
        stage: "getReadmeContent",
        error: fetchError.message ?? "Unable to fetch README content",
        debug: {
          githubUrl: body.githubUrl ?? null
        }
      },
      { status: 500 }
    )
  }

  let summary = null
  try {
    summary = await summarizeReadmeWithLangChain(readmeContent)
    console.log("summary", summary)
  } catch (summaryError) {
    return NextResponse.json(
      {
        ok: false,
        stage: "summarizeReadmeWithLangChain",
        error: summaryError.message ?? "Unable to summarize README content",
        debug: {
          githubUrl: body.githubUrl ?? null
        }
      },
      { status: 500 }
    )
  }

  return NextResponse.json({
    ok: true,
    data: summary
  })
}

async function getReadmeContent(githubUrl) {
  // Extract owner and repo from the GitHub URL
  let match = githubUrl.match(
    /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/
  )
  if (!match) {
    throw new Error("Invalid GitHub repository URL")
  }
  const [, owner, repo] = match

  // Try both main and master branch
  const branches = ["main", "master"]
  let res
  let content

  for (const branch of branches) {
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`
    res = await fetch(rawUrl)
    if (res.ok) {
      content = await res.text()
      return content
    }
  }
  throw new Error("README.md not found in main or master branch")
}
