"use client"

import { useCallback, useEffect, useState } from "react"
import { API_KEYS_ENDPOINT } from "../constants"

const readPayload = async (response) => {
  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed")
  }
  return payload
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([])
  const [isLoadingKeys, setIsLoadingKeys] = useState(true)
  const [apiErrorMessage, setApiErrorMessage] = useState("")

  const loadApiKeys = useCallback(async (signal) => {
    try {
      setIsLoadingKeys(true)
      setApiErrorMessage("")
      const response = await fetch(API_KEYS_ENDPOINT, { signal })
      const payload = await readPayload(response)
      setApiKeys(payload)
    } catch (error) {
      if (error.name === "AbortError") return
      setApiErrorMessage(error.message ?? "Unable to load API keys")
    } finally {
      setIsLoadingKeys(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadApiKeys(controller.signal)
    return () => controller.abort()
  }, [loadApiKeys])

  const createApiKey = useCallback(async ({ name, keyType, permissions }) => {
    setApiErrorMessage("")
    const response = await fetch(API_KEYS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        keyType,
        permissions,
      }),
    })
    const payload = await readPayload(response)
    setApiKeys((currentApiKeys) => [payload, ...currentApiKeys])
    return payload
  }, [])

  const updateApiKey = useCallback(async ({ id, name, keyType, permissions }) => {
    setApiErrorMessage("")
    const response = await fetch(`${API_KEYS_ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        keyType,
        permissions,
      }),
    })
    const payload = await readPayload(response)
    setApiKeys((currentApiKeys) => currentApiKeys.map((apiKey) => (apiKey.id === id ? payload : apiKey)))
    return payload
  }, [])

  const deleteApiKey = useCallback(async (id) => {
    setApiErrorMessage("")
    const response = await fetch(`${API_KEYS_ENDPOINT}/${id}`, {
      method: "DELETE",
    })
    await readPayload(response)
    setApiKeys((currentApiKeys) => currentApiKeys.filter((apiKey) => apiKey.id !== id))
  }, [])

  const setErrorMessage = useCallback((message) => {
    setApiErrorMessage(message)
  }, [])

  return {
    apiKeys,
    isLoadingKeys,
    apiErrorMessage,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    setErrorMessage,
  }
}
