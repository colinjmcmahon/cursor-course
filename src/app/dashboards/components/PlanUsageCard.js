import { IconCreditCard, IconInfo } from "./icons"

export const PlanUsageCard = ({
  creditsUsed,
  creditsTotal,
  creditsPercent,
  payAsYouGo,
  onTogglePayAsYouGo,
  onPayAsYouGoKeyDown,
}) => {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-r from-[#7b3ff2] via-[#e145a3] to-[#ff6b2d]">
      <div className="relative z-10 space-y-8 p-8 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90">
              Current plan
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Researcher</h2>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-white/18 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/30 transition-colors hover:bg-white/28"
          >
            <IconCreditCard className="h-4 w-4" />
            Manage Plan
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            API Usage
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="About API usage"
            >
              <IconInfo />
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-white/85">
            <span>Monthly plan</span>
            <span className="font-semibold text-white">
              {creditsUsed.toLocaleString()} / {creditsTotal.toLocaleString()} Credits
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/35">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-300"
              style={{ width: `${creditsPercent}%` }}
            />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              role="switch"
              aria-checked={payAsYouGo}
              aria-label="Pay as you go"
              onClick={onTogglePayAsYouGo}
              onKeyDown={onPayAsYouGoKeyDown}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                payAsYouGo ? "bg-white" : "bg-white/35"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-[#7b3ff2] shadow transition-transform ${
                  payAsYouGo ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-white">Pay as you go</span>
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="About pay as you go"
            >
              <IconInfo />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
