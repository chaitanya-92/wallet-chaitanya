import { useState, useCallback } from "react"
import { toast } from "sonner"

export function useCopyToClipboard(resetAfterMs = 1800) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string, successMessage = "Copied") => {
      await navigator.clipboard.writeText(text)
      toast.success(successMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), resetAfterMs)
    },
    [resetAfterMs]
  )

  return { copied, copy }
}
