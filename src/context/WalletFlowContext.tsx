import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { STORAGE_KEYS, FLOW_STEPS } from "@/config/constants"

export type Step = (typeof FLOW_STEPS)[number]

interface WalletFlowContextType {
  step: Step
  next: (step: Step) => void
  goBack: () => void
  resetFlow: () => void
}

const WalletFlowContext = createContext<WalletFlowContextType | null>(null)

export function WalletFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.STEP)
    return (stored as Step) || "welcome"
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STEP, step)
  }, [step])

  const next = useCallback((newStep: Step) => {
    setStep(newStep)
  }, [])

  const goBack = useCallback(() => {
    const currentIndex = FLOW_STEPS.indexOf(step)
    if (currentIndex > 0) {
      setStep(FLOW_STEPS[currentIndex - 1])
    }
  }, [step])

  const resetFlow = useCallback(() => {
    setStep("welcome")
    localStorage.removeItem(STORAGE_KEYS.STEP)
  }, [])

  return (
    <WalletFlowContext.Provider value={{ step, next, goBack, resetFlow }}>
      {children}
    </WalletFlowContext.Provider>
  )
}

export function useWalletFlow() {
  const context = useContext(WalletFlowContext)
  if (!context) {
    throw new Error("useWalletFlow must be used inside WalletFlowProvider")
  }
  return context
}
