"use client"

import { useEffect, useId, useRef, useState } from "react"
import { IconClose } from "./icons"

const INITIAL_FORM_VALUES = {
  name: "",
  keyType: "dev",
  permissions: "read-only",
}

export const ApiKeyModal = ({ mode, isOpen, apiKey, onClose, onSubmit }) => {
  const [name, setName] = useState(INITIAL_FORM_VALUES.name)
  const [keyType, setKeyType] = useState(INITIAL_FORM_VALUES.keyType)
  const [permissions, setPermissions] = useState(INITIAL_FORM_VALUES.permissions)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const nameInputRef = useRef(null)

  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!isOpen) return

    if (mode === "edit" && apiKey) {
      setName(apiKey.name ?? "")
      setKeyType(apiKey.keyType ?? "dev")
      setPermissions(apiKey.permissions ?? "read-only")
      return
    }

    setName(INITIAL_FORM_VALUES.name)
    setKeyType(INITIAL_FORM_VALUES.keyType)
    setPermissions(INITIAL_FORM_VALUES.permissions)
  }, [apiKey, isOpen, mode])

  useEffect(() => {
    if (!isOpen) return
    const t = requestAnimationFrame(() => nameInputRef.current?.focus())
    return () => cancelAnimationFrame(t)
  }, [isOpen])

  if (!isOpen) return null

  const isEditMode = mode === "edit"
  const shouldShowPermissions = isEditMode || keyType === "dev"
  const modalTitle = isEditMode ? "Edit API key" : "Create API key"
  const submitLabel = isEditMode ? "Save" : "Create key"
  const nameInputLabel = isEditMode ? "Edit API key name" : "API key name"
  const keyTypeInputLabel = isEditMode ? "Edit API key type" : "API key type"
  const permissionsInputLabel = isEditMode ? "Edit API key permissions" : "API key permissions"

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        name: trimmedName,
        keyType,
        permissions,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[2px]" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={isEditMode ? undefined : descriptionId}
        className="relative z-10 w-full max-w-md rounded-[24px] border border-stone-200 bg-[#fefdfb] p-6 shadow-xl shadow-stone-900/10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id={titleId} className="text-lg font-semibold text-stone-900">
              {modalTitle}
            </h3>
            {!isEditMode ? (
              <p id={descriptionId} className="mt-1 text-sm text-stone-600">
                Name your key and choose an environment type.
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70"
            aria-label="Close"
          >
            <IconClose />
          </button>
        </div>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
            Key name
            <input
              ref={nameInputRef}
              aria-label={nameInputLabel}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-normal text-stone-900 outline-none ring-stone-400/50 transition focus:ring-2"
              placeholder="e.g. default"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
            Type
            <select
              aria-label={keyTypeInputLabel}
              value={keyType}
              onChange={(event) => setKeyType(event.target.value)}
              className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-normal text-stone-900 outline-none ring-stone-400/50 transition focus:ring-2"
            >
              <option value="dev">dev</option>
              <option value="prod">prod</option>
            </select>
          </label>

          {shouldShowPermissions ? (
            <label className="flex flex-col gap-2 text-sm font-medium text-stone-800">
              Permissions
              <select
                aria-label={permissionsInputLabel}
                value={permissions}
                onChange={(event) => setPermissions(event.target.value)}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-normal text-stone-900 outline-none ring-stone-400/50 transition focus:ring-2"
              >
                <option value="read-only">Read only</option>
                <option value="read-write">Read & write</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          ) : null}

          <div className="mt-2 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
