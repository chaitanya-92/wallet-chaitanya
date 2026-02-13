import { useState } from "react"
import { motion } from "framer-motion"
import { validateMnemonic } from "@scure/bip39"
import { wordlist } from "@scure/bip39/wordlists/english.js"
import { ChevronLeft, Download, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  importWalletContent,
  importWalletErrors,
  commonContent,
  toastMessages,
} from "@/data"

interface Props {
  onImport: (mnemonic: string) => void
  onBack: () => void
}

export default function ImportWallet({ onImport, onBack }: Props) {
  const [phrase, setPhrase] = useState("")
  const [error, setError] = useState("")

  const wordCount = phrase.trim().split(/\s+/).filter(Boolean).length

  const handleSubmit = () => {
    const trimmed = phrase.trim()
    const words = trimmed.split(/\s+/)
    if (words.length !== 12 && words.length !== 24) {
      setError(importWalletErrors.invalidWordCount)
      return
    }
    if (!validateMnemonic(trimmed, wordlist)) {
      setError(importWalletErrors.invalidPhrase)
      return
    }
    setError("")
    toast.success(toastMessages.walletImported)
    onImport(trimmed)
  }

  return (
    <motion.div
      key="import-wallet"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flow-container"
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-5">
          <div
            className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center"
            style={{
              background: "rgba(130,100,255,0.1)",
              border: "1px solid rgba(130,100,255,0.3)",
            }}
          >
            <Download size={22} color="#c4b4ff" />
          </div>
        </div>
        <h2
          className="font-[Syne] font-bold text-[26px] text-[#eeeeff] mb-2.5"
          style={{ letterSpacing: "-0.5px" }}
        >
          {importWalletContent.title}
        </h2>
        <p
          className="text-[var(--text-muted)] text-sm leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {importWalletContent.subtitle.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <Label
            className="text-[11px] uppercase tracking-[0.09em]"
            style={{
              color: "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {importWalletContent.label}
          </Label>
          <span
            className="text-[11px] transition-colors duration-200"
            style={{
              fontFamily: "'DM Mono', monospace",
              color:
                wordCount === 12 || wordCount === 24
                  ? "#50e8a0"
                  : "var(--text-subtle)",
            }}
          >
            {importWalletContent.wordCountLabel(wordCount)}
          </span>
        </div>

        <Textarea
          value={phrase}
          onChange={(e) => {
            setPhrase(e.target.value)
            if (error) setError("")
          }}
          placeholder={importWalletContent.placeholder}
          rows={5}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="none"
          className="resize-none text-sm leading-[1.7] tracking-[0.03em]"
          style={{
            fontFamily: "'DM Mono', monospace",
            background: "rgba(130,100,255,0.04)",
            border: `1px solid ${error ? "rgba(255,90,90,0.4)" : "rgba(130,100,255,0.18)"}`,
            borderRadius: 14,
            color: "var(--text-primary)",
            outline: "none",
          }}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 mt-2.5 text-[13px]"
            style={{
              color: "#ff5a5a",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <AlertTriangle size={13} />
            {error}
          </motion.div>
        )}
      </div>

      <div
        className="p-[12px_16px] rounded-xl flex gap-2.5 items-start mb-7"
        style={{
          background: "rgba(255,184,77,0.07)",
          border: "1px solid rgba(255,184,77,0.18)",
        }}
      >
        <span className="text-sm shrink-0">🔒</span>
        <p
          className="text-xs leading-relaxed m-0"
          style={{ color: "#b09070", fontFamily: "'DM Sans', sans-serif" }}
        >
          {importWalletContent.securityNotice}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleSubmit}
          disabled={wordCount === 0}
          className="w-full h-[52px] text-[15px] font-semibold rounded-[14px] gap-2"
          style={{
            background: "linear-gradient(135deg, #8264ff, #5a3ecf)",
            border: "none",
            boxShadow: "0 4px 24px rgba(130,100,255,0.4)",
            fontFamily: "'DM Sans', sans-serif",
            opacity: wordCount === 0 ? 0.5 : 1,
          }}
        >
          <Download size={16} />
          {importWalletContent.submitButton}
        </Button>

        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[var(--text-muted)] hover:text-[var(--text-accent)] gap-1.5 text-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <ChevronLeft size={15} />
          {commonContent.back}
        </Button>
      </div>
    </motion.div>
  )
}
