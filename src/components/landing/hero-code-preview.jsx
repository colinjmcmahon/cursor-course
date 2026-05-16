export const HeroCodePreview = () => {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <p className="mb-2 font-mono text-xs text-muted-foreground">summarizer.ts · API response</p>
      <div className="relative">
        <div className="absolute -right-2 top-8 z-0 w-[92%] rotate-2 border-2 border-border bg-white shadow-[6px_6px_0_0_#0a0a0a] sm:-right-4">
          <div className="flex items-center justify-between border-b-2 border-border bg-[#f3efe6] px-3 py-2">
            <span className="font-mono text-xs text-muted-foreground">request.json</span>
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ffc107]" />
              <span className="size-2.5 rounded-full bg-[#fda4af]" />
              <span className="size-2.5 rounded-full bg-[#86efac]" />
            </div>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
            <code>
              <span className="text-[#8b5cf6]">POST</span> /api/github-summarizer{"\n"}
              <span className="text-muted-foreground">{"{"}</span>
              {"\n"}  <span className="text-[#2563eb]">&quot;githubUrl&quot;</span>:{" "}
              <span className="text-[#dc2626]">&quot;github.com/vercel/next.js&quot;</span>
              {"\n"}
              <span className="text-muted-foreground">{"}"}</span>
            </code>
          </pre>
        </div>

        <div className="relative z-10 border-2 border-border bg-white shadow-[8px_8px_0_0_#0a0a0a]">
          <div className="flex items-center justify-between border-b-2 border-border bg-[#ffe566] px-3 py-2">
            <span className="font-mono text-xs font-medium">response.json</span>
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ffc107]" />
              <span className="size-2.5 rounded-full bg-[#fda4af]" />
              <span className="size-2.5 rounded-full bg-[#86efac]" />
            </div>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
            <code>
              <span className="text-muted-foreground">{"{"}</span>
              {"\n"}  <span className="text-[#2563eb]">&quot;ok&quot;</span>:{" "}
              <span className="text-[#16a34a]">true</span>,{"\n"}  <span className="text-[#2563eb]">&quot;data&quot;</span>:{" "}
              <span className="text-muted-foreground">{"{"}</span>
              {"\n"}    <span className="text-[#2563eb]">&quot;summary&quot;</span>:{" "}
              <span className="text-[#dc2626]">&quot;React framework…&quot;</span>,{"\n"}    <span className="text-[#2563eb]">
                &quot;coolFacts&quot;
              </span>
              : <span className="text-muted-foreground">[…]</span>
              {"\n"}  <span className="text-muted-foreground">{"}"}</span>
              {"\n"}
              <span className="text-muted-foreground">{"}"}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}
