import { getMaskedKeyDisplay } from "../utils"
import { IconCopy, IconEye, IconEyeOff, IconPencil, IconPlus, IconTrash } from "./icons"

const ApiKeyActions = ({ apiKey, isVisible, displayKey, onToggleKeyVisibility, onCopyKey, onStartEdit, onDeleteKey }) => (
  <div className="flex flex-wrap items-center gap-1">
    <button
      type="button"
      aria-label={isVisible ? `Hide key for ${apiKey.name}` : `Show key for ${apiKey.name}`}
      aria-pressed={isVisible}
      onClick={() => onToggleKeyVisibility(apiKey.id)}
      className="inline-flex size-11 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-900"
    >
      {isVisible ? <IconEyeOff /> : <IconEye />}
    </button>
    <button
      type="button"
      aria-label={`Copy key for ${apiKey.name}`}
      onClick={() => onCopyKey(apiKey.key)}
      className="inline-flex size-11 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-900"
    >
      <IconCopy />
    </button>
    <button
      type="button"
      aria-label={`Edit ${apiKey.name}`}
      onClick={() => onStartEdit(apiKey.id)}
      className="inline-flex size-11 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-900"
    >
      <IconPencil />
    </button>
    <button
      type="button"
      aria-label={`Delete ${apiKey.name}`}
      onClick={() => onDeleteKey(apiKey.id)}
      className="inline-flex size-11 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-rose-100/80 hover:text-rose-700"
    >
      <IconTrash />
    </button>
  </div>
)

const ApiKeyMobileCard = ({
  apiKey,
  isVisible,
  displayKey,
  typeLabel,
  onToggleKeyVisibility,
  onCopyKey,
  onStartEdit,
  onDeleteKey,
}) => (
  <article className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-stone-900">{apiKey.name}</h3>
        <p className="mt-1 text-sm text-stone-600">
          <span className="inline-flex rounded-full bg-slate-200/90 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-800">
            {typeLabel}
          </span>
          <span className="mx-2 text-stone-300">·</span>
          {apiKey.usage} usage
        </p>
      </div>
      <ApiKeyActions
        apiKey={apiKey}
        isVisible={isVisible}
        displayKey={displayKey}
        onToggleKeyVisibility={onToggleKeyVisibility}
        onCopyKey={onCopyKey}
        onStartEdit={onStartEdit}
        onDeleteKey={onDeleteKey}
      />
    </div>
    <p className="mt-3 break-all rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 font-mono text-xs text-stone-800">
      {displayKey}
    </p>
  </article>
)

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
    <section className="rounded-2xl border border-stone-200/80 bg-[#fefdfb] p-4 sm:rounded-[28px] sm:p-8 lg:p-10">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-stone-900">API Keys</h2>
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex size-11 items-center justify-center rounded-full border border-stone-200 bg-stone-100/80 text-stone-700 transition-colors hover:bg-stone-200/80"
          aria-label="Create new API key"
        >
          <IconPlus className="h-5 w-5" />
        </button>
      </div>
      {apiErrorMessage ? (
        <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{apiErrorMessage}</p>
      ) : null}

      <div className="mt-6 space-y-3 lg:hidden">
        {isLoadingKeys ? (
          <p className="py-8 text-center text-sm text-stone-500">Loading API keys...</p>
        ) : apiKeys.length === 0 ? (
          <p className="py-8 text-center text-sm text-stone-500">No API keys found. Create one to get started.</p>
        ) : (
          apiKeys.map((apiKey) => {
            const isVisible = visibleKeyIds.has(apiKey.id)
            const displayKey = isVisible ? apiKey.key : getMaskedKeyDisplay(apiKey.key)
            const typeLabel = apiKey.keyType === "prod" ? "prod" : "dev"

            return (
              <ApiKeyMobileCard
                key={apiKey.id}
                apiKey={apiKey}
                isVisible={isVisible}
                displayKey={displayKey}
                typeLabel={typeLabel}
                onToggleKeyVisibility={onToggleKeyVisibility}
                onCopyKey={onCopyKey}
                onStartEdit={onStartEdit}
                onDeleteKey={onDeleteKey}
              />
            )
          })
        )}
      </div>

      <div className="mt-6 hidden overflow-x-auto lg:block">
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
                      <ApiKeyActions
                        apiKey={apiKey}
                        isVisible={isVisible}
                        displayKey={displayKey}
                        onToggleKeyVisibility={onToggleKeyVisibility}
                        onCopyKey={onCopyKey}
                        onStartEdit={onStartEdit}
                        onDeleteKey={onDeleteKey}
                      />
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
