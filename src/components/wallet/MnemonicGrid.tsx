import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { mnemonicGridContent, toastMessages } from "@/data"

interface Props {
  mnemonic: string
  startVisible?: boolean
}

export default function MnemonicGrid({ mnemonic, startVisible = false }: Props) {
  const [revealed, setRevealed] = useState(startVisible)
  const [copied, setCopied] = useState(false)
  const words = mnemonic.trim().split(/\s+/)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mnemonic)
    toast.success(toastMessages.seedPhraseCopied)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="relative">
        <div
          className="grid grid-cols-4 gap-2 p-5 rounded-[18px] backdrop-blur-[20px]"
          style={{
            background: "rgba(8,10,18,0.7)",
            border: "1px solid var(--border)",
          }}
        >
          {words.map((word, i) => (
            <div key={`${word}-${i}`} className="seed-word">
              <span className="seed-word-index">{i + 1}.</span>
              <span
                className="seed-word-text select-none transition-[filter] duration-300"
                style={{
                  filter: revealed ? "none" : "blur(7px)",
                  userSelect: revealed ? "text" : "none",
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {!revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-[18px] flex flex-col items-center justify-center gap-3.5"
            style={{
              background: "rgba(8,10,18,0.55)",
              backdropFilter: "blur(3px)",
            }}
          >
            <div
              className="w-12 h-12 rounded-[13px] flex items-center justify-center"
              style={{
                background: "rgba(130,100,255,0.14)",
                border: "1px solid rgba(130,100,255,0.3)",
              }}
            >
              <EyeOff size={20} color="#b09cff" aria-hidden />
            </div>
            <p
              className="text-[13px] m-0"
              style={{ color: "#9090b8", fontFamily: "'DM Sans', sans-serif" }}
            >
              {mnemonicGridContent.revealPrompt}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRevealed(true)}
              className="gap-1.5 text-[13px]"
              style={{
                padding: "9px 22px",
                background: "var(--accent-dim)",
                border: "1px solid var(--border)",
              }}
            >
              <Eye size={14} aria-hidden />
              {mnemonicGridContent.revealButton}
            </Button>
          </motion.div>
        )}
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex gap-2.5 mt-3.5 justify-end"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRevealed(false)}
            className="gap-1.5 h-8 text-xs rounded-lg"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <EyeOff size={13} aria-hidden />
            {mnemonicGridContent.hideButton}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-1.5 h-8 text-xs rounded-lg transition-all duration-300"
            style={{
              background: copied ? "var(--success-dim)" : "var(--accent-dim)",
              border: `1px solid ${copied ? "rgba(80,232,160,0.3)" : "var(--border)"}`,
              color: copied ? "var(--success)" : "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {copied ? (
              <Check size={13} aria-hidden />
            ) : (
              <Copy size={13} aria-hidden />
            )}
            {copied
              ? mnemonicGridContent.copiedButton
              : mnemonicGridContent.copyButton}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
