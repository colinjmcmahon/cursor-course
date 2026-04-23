import { getMaskedKeyDisplay } from "../utils"
import { IconCopy, IconEye, IconEyeOff, IconPencil, IconPlus, IconTrash } from "./icons"

export const ApiKeysSection = ({
  apiKeys,
  isLoadingKeys,
  apiErrorMessage,
  visibleKeyIds,
  onOpenCreateModal,
  onToggleKeyVisibility,
  onCopyKey,
  onStartEdit,
  onDeleteKey,
}) => {
  return (
    <section className="rounded-[28px] border border-stone-200/80 bg-[#fefdfb] p-8 sm:p-10">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-stone-900">API Keys</h2>
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-stone-100/80 text-stone-700 transition-colors hover:bg-stone-200/80"
          aria-label="Create new API key"
        >
          <IconPlus className="h-4 w-4" />
        </button>
      </div>
      {apiErrorMessage ? (
        <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{apiErrorMessage}</p>
      ) : null}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <th className="pb-3 pr-4 font-medium">Name</th>
              <th className="pb-3 pr-4 font-medium">Type</th>
              <th className="pb-3 pr-4 font-medium">Usage</th>
              <th className="pb-3 pr-4 font-medium">Key</th>
              <th className="pb-3 font-medium">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingKeys ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-stone-500">
                  Loading API keys...
                </td>
              </tr>
            ) : apiKeys.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-stone-500">
                  No API keys found. Create one to get started.
                </td>
              </tr>
            ) : (
              apiKeys.map((apiKey) => {
                const isVisible = visibleKeyIds.has(apiKey.id)
                const displayKey = isVisible ? apiKey.key : getMaskedKeyDisplay(apiKey.key)
                const typeLabel = apiKey.keyType === "prod" ? "prod" : "dev"

                return (
                  <tr key={apiKey.id} className="border-b border-stone-100 last:border-0">
                    <td className="py-4 pr-4 font-medium text-stone-900">{apiKey.name}</td>
                    <td className="py-4 pr-4">
                      <span className="inline-flex rounded-full bg-slate-200/90 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-800">
                        {typeLabel}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-stone-700">{apiKey.usage}</td>
                    <td className="py-4 pr-4">
                      <span className="inline-flex min-w-0 max-w-[280px] truncate rounded-full border border-stone-200 bg-white/90 px-3 py-1.5 font-mono text-xs text-stone-800">
                        {displayKey}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap items-center gap-1">
                        <button
                          type="button"
                          aria-label={isVisible ? `Hide key for ${apiKey.name}` : `Show key for ${apiKey.name}`}
                          aria-pressed={isVisible}
                          onClick={() => onToggleKeyVisibility(apiKey.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-900"
                        >
                          {isVisible ? <IconEyeOff /> : <IconEye />}
                        </button>
                        <button
                          type="button"
                          aria-label={`Copy key for ${apiKey.name}`}
                          onClick={() => onCopyKey(apiKey.key)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-900"
                        >
                          <IconCopy />
                        </button>
                        <button
                          type="button"
                          aria-label={`Edit ${apiKey.name}`}
                          onClick={() => onStartEdit(apiKey.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-900"
                        >
                          <IconPencil />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${apiKey.name}`}
                          onClick={() => onDeleteKey(apiKey.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-rose-100/80 hover:text-rose-700"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
