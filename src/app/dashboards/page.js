"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ActionToast } from "./components/ActionToast"
import { ApiKeyModal } from "./components/ApiKeyModal"
import { ApiKeysSection } from "./components/ApiKeysSection"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { PlanUsageCard } from "./components/PlanUsageCard"
import { CREDITS_TOTAL, CREDITS_USED } from "./constants"
import { useActionToast } from "./hooks/useActionToast"
import { useApiKeys } from "./hooks/useApiKeys"

const DashboardPage = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("overview")
  const [payAsYouGo, setPayAsYouGo] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [visibleKeyIds, setVisibleKeyIds] = useState(() => new Set())

  const { actionToast, showActionToast, dismissActionToast } = useActionToast()
  const { apiKeys, isLoadingKeys, apiErrorMessage, createApiKey, updateApiKey, deleteApiKey, setErrorMessage } = useApiKeys()

  const editingApiKey = useMemo(
    () => apiKeys.find((apiKey) => apiKey.id === editingId) ?? null,
    [apiKeys, editingId]
  )

  const creditsPercent = Math.min(100, Math.round((CREDITS_USED / CREDITS_TOTAL) * 100))

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return
      if (isCreateModalOpen) setIsCreateModalOpen(false)
      if (editingApiKey) setEditingId(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [editingApiKey, isCreateModalOpen])

  const handleCreateApiKey = async (values) => {
    try {
      await createApiKey(values)
      closeCreateModal()
    } catch (error) {
      setErrorMessage(error.message ?? "Unable to create API key")
    }
  }

  const handleStartEdit = (id) => {
    setEditingId(id)
  }

  const handleUpdateApiKey = async (values) => {
    if (!editingApiKey) return

    try {
      await updateApiKey({
        id: editingApiKey.id,
        ...values,
      })
      setEditingId(null)
      showActionToast("Updated API key")
    } catch (error) {
      setErrorMessage(error.message ?? "Unable to update API key")
    }
  }

  const handleDeleteApiKey = async (id) => {
    const target = apiKeys.find((apiKey) => apiKey.id === id)
    if (!target) return

    const confirmed = window.confirm(`Delete API key “${target.name}”? This cannot be undone.`)
    if (!confirmed) return

    try {
      await deleteApiKey(id)

      if (editingId === id) {
        setEditingId(null)
      }

      setVisibleKeyIds((previousVisibleIds) => {
        const nextVisibleIds = new Set(previousVisibleIds)
        nextVisibleIds.delete(id)
        return nextVisibleIds
      })

      showActionToast("Deleted API key", "danger")
    } catch (error) {
      setErrorMessage(error.message ?? "Unable to delete API key")
    }
  }

  const handleToggleKeyVisibility = (id) => {
    const target = apiKeys.find((apiKey) => apiKey.id === id)
    const isVisible = visibleKeyIds.has(id)

    setVisibleKeyIds((previousVisibleIds) => {
      const nextVisibleIds = new Set(previousVisibleIds)
      if (nextVisibleIds.has(id)) nextVisibleIds.delete(id)
      else nextVisibleIds.add(id)
      return nextVisibleIds
    })

    if (isVisible) {
      showActionToast(`Hidden ${target?.name ?? "API key"}`)
      return
    }

    showActionToast(`Viewing ${target?.name ?? "API key"}`)
  }

  const handleCopyKey = async (keyValue) => {
    try {
      await navigator.clipboard.writeText(keyValue)
      showActionToast("Copied API Key to clipboard")
    } catch {
      dismissActionToast()
    }
  }

  const handleTogglePayAsYouGo = () => {
    setPayAsYouGo((currentValue) => !currentValue)
  }

  const handlePayAsYouGoKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    handleTogglePayAsYouGo()
  }

  return (
    <div className="min-h-screen bg-[#fdfaf6] px-5 py-10 text-stone-900 sm:px-8">
      <ActionToast actionToast={actionToast} onDismiss={dismissActionToast} />

      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 lg:flex-row lg:items-start">
        <DashboardSidebar activeSidebarItem={activeSidebarItem} onSelectItem={setActiveSidebarItem} />

        <main className="flex min-w-0 flex-1 flex-col gap-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-stone-900">API dashboard</h1>
              <p className="mt-1 text-sm text-stone-600">Plan, usage, and API keys</p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
            >
              Back to Home
            </Link>
          </header>

          <PlanUsageCard
            creditsUsed={CREDITS_USED}
            creditsTotal={CREDITS_TOTAL}
            creditsPercent={creditsPercent}
            payAsYouGo={payAsYouGo}
            onTogglePayAsYouGo={handleTogglePayAsYouGo}
            onPayAsYouGoKeyDown={handlePayAsYouGoKeyDown}
          />

          <ApiKeysSection
            apiKeys={apiKeys}
            isLoadingKeys={isLoadingKeys}
            apiErrorMessage={apiErrorMessage}
            visibleKeyIds={visibleKeyIds}
            onOpenCreateModal={handleOpenCreateModal}
            onToggleKeyVisibility={handleToggleKeyVisibility}
            onCopyKey={handleCopyKey}
            onStartEdit={handleStartEdit}
            onDeleteKey={handleDeleteApiKey}
          />

          <ApiKeyModal mode="create" isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmit={handleCreateApiKey} />
          <ApiKeyModal
            mode="edit"
            isOpen={Boolean(editingApiKey)}
            apiKey={editingApiKey}
            onClose={handleCancelEdit}
            onSubmit={handleUpdateApiKey}
          />
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
