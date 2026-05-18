"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, BookOpen, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

const DEFAULT_PAYLOAD = {
  githubUrl: "https://github.com/assafelovic/gpt-researcher"
}

const MOCK_RESPONSE = {
  ok: true,
  data: {
    summary: "GPT Researcher is an open deep research agent designed for web and local research tasks, providing detailed, factual, and unbiased research reports with citations. It offers customization options, addresses misinformation, and enhances speed and reliability through parallelized agent work.",
    "cool facts": [
      "Empowers individuals and organizations with accurate, unbiased, and factual information through AI",
      "Utilizes 'planner' and 'execution' agents for research tasks",
      "Generates detailed reports exceeding 2,000 words",
      "Offers AI-generated inline images using Google Gemini for visual illustrations",
      "Supports MCP integration for specialized data sources like GitHub repositories and databases",
      "Includes Deep Research feature for advanced recursive research workflows",
      "Enables inline image generation with dark-mode styling and professional infographic aesthetics",
      "Supports LangSmith for enhanced tracing and observability",
      "Features an enhanced frontend for improved user experience and streamlined research process"
    ]
  }
}

export function ApiDemo() {
  const [payload, setPayload] = useState(JSON.stringify(DEFAULT_PAYLOAD, null, 2))
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("idle")

  const handleSend = async () => {
    setIsLoading(true)
    setStatus("idle")
    setResponse(null)

    try {
      const parsedPayload = JSON.parse(payload)

      const res = await fetch("https://cursor-course-kappa.vercel.app/api/github-summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedPayload),
      })

      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
      setStatus(res.ok ? "success" : "error")
    } catch {
      setResponse(JSON.stringify(MOCK_RESPONSE, null, 2))
      setStatus("success")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Try the API
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how easy it is to get insights from any GitHub repository. Edit the payload and send a request.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Request</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-mono bg-emerald-500/20 text-emerald-400 rounded">
                    POST
                  </span>
                </div>
              </div>
              <p className="text-xs font-mono text-muted-foreground truncate mt-2">
                /api/github-summarizer
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Body (JSON)
                </label>
                <textarea
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="w-full h-32 p-3 font-mono text-sm bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  spellCheck={false}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 data-icon="inline-start" className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Play data-icon="inline-start" />
                      Send Request
                    </>
                  )}
                </Button>
                <Button variant="outline" asChild>
                  <a href="#documentation">
                    <BookOpen data-icon="inline-start" />
                    Documentation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Response</CardTitle>
                {status === "success" && (
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="size-4" />
                    <span className="text-xs font-medium">200 OK</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-1.5 text-red-400">
                    <AlertCircle className="size-4" />
                    <span className="text-xs font-medium">Error</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80 p-3 font-mono text-sm bg-background border border-border rounded-lg overflow-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                ) : response ? (
                  <pre className="text-foreground whitespace-pre-wrap">{response}</pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Send a request to see the response
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
