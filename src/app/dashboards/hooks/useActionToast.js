"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export const useActionToast = () => {
  const [actionToast, setActionToast] = useState(null)
  const actionToastTimeoutRef = useRef(null)

  const dismissActionToast = useCallback(() => {
    if (actionToastTimeoutRef.current) {
      clearTimeout(actionToastTimeoutRef.current)
      actionToastTimeoutRef.current = null
    }
    setActionToast(null)
  }, [])

  const showActionToast = useCallback((message, variant = "success") => {
    if (actionToastTimeoutRef.current) {
      clearTimeout(actionToastTimeoutRef.current)
    }
    setActionToast({ message, variant })
    actionToastTimeoutRef.current = window.setTimeout(() => {
      setActionToast(null)
      actionToastTimeoutRef.current = null
    }, 2400)
  }, [])

  useEffect(() => {
    return () => {
      if (!actionToastTimeoutRef.current) return
      clearTimeout(actionToastTimeoutRef.current)
    }
  }, [])

  return {
    actionToast,
    showActionToast,
    dismissActionToast,
  }
}
