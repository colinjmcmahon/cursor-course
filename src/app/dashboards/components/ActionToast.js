import { IconCheckCircle, IconClose } from "./icons"

export const ActionToast = ({ actionToast, onDismiss }) => {
  if (!actionToast) return null

  return (
    <div className="fixed inset-x-0 top-6 z-[70] flex justify-center px-4" role="status" aria-live="polite">
      <div
        className={`flex w-[66%] min-w-[320px] max-w-3xl items-center justify-between gap-3 rounded-2xl px-4 py-3 text-white shadow-xl ${
          actionToast.variant === "danger" ? "bg-rose-700 shadow-rose-900/25" : "bg-emerald-700 shadow-emerald-900/20"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
              actionToast.variant === "danger" ? "bg-rose-900/30" : "bg-emerald-900/25"
            }`}
          >
            <IconCheckCircle className="h-5 w-5" />
          </span>
          <p className="text-base font-semibold tracking-tight">{actionToast.message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/20"
          aria-label="Dismiss notification"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
