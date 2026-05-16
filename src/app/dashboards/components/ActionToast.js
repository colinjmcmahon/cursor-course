import { IconCheckCircle, IconClose } from "./icons"

export const ActionToast = ({ actionToast, onDismiss }) => {
  if (!actionToast) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4 sm:top-6" role="status" aria-live="polite">
      <div
        className={`pointer-events-auto flex w-full max-w-[calc(100vw-2rem)] items-center justify-between gap-3 rounded-2xl px-4 py-3 text-white shadow-xl sm:max-w-lg md:max-w-2xl lg:w-[66%] lg:max-w-3xl ${
          actionToast.variant === "danger" ? "bg-rose-700 shadow-rose-900/25" : "bg-emerald-700 shadow-emerald-900/20"
        }`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span
            className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full sm:size-8 ${
              actionToast.variant === "danger" ? "bg-rose-900/30" : "bg-emerald-900/25"
            }`}
          >
            <IconCheckCircle className="h-5 w-5" />
          </span>
          <p className="truncate text-sm font-semibold tracking-tight sm:text-base">{actionToast.message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/20 sm:size-10"
          aria-label="Dismiss notification"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
