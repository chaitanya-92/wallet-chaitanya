import { useEffect, useState, useCallback } from "react"
import type { Step } from "@/types"
import { STORAGE_KEYS } from "@/config/constants"

const BACK_MAP: Partial<Record<Step, Step>> = {
  "select-network": "welcome",
  create: "select-network",
  "confirm-seed": "create",
  import: "select-network",
  dashboard: "welcome",
}

export function useWalletFlow() {
  const [step, setStep] = useState<Step>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.STEP)
    return (stored as Step) || "welcome"
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STEP, step)
  }, [step])

  const next = useCallback((newStep: Step) => setStep(newStep), [])
  const goBack = useCallback(() => {
    const prev = BACK_MAP[step]
    if (prev) setStep(prev)
  }, [step])
  const resetFlow = useCallback(() => {
    setStep("welcome")
    localStorage.removeItem(STORAGE_KEYS.STEP)
  }, [])

  return { step, next, goBack, resetFlow }
}

export type { Step } from "@/types"
