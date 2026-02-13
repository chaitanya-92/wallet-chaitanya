import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Copy, Eye, EyeOff, Trash2, Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Badge } from "@/components/ui/badge"
import ConfirmDialog from "@/components/ui/ConfirmDialog"
import type { WalletAccount } from "@/types"
import { CHAIN_STYLES } from "@/config/chains"
import { accountCardContent, toastMessages } from "@/data"

interface Props {
  account: WalletAccount
  index: number
  onDelete: (index: number) => void
}

function truncate(str: string) {
  return str.slice(0, 10) + "…" + str.slice(-8)
}

export default function AccountCard({ account, index, onDelete }: Props) {
  const [visible, setVisible] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const { copied: copiedPub, copy: copyPub } = useCopyToClipboard()
  const { copied: copiedPriv, copy: copyPriv } = useCopyToClipboard()

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const chain = account.chain ?? "ethereum"
  const style = CHAIN_STYLES[chain]

  const togglePrivKey = () => {
    if (visible) {
      setVisible(false)
      return
    }

    setVisible(true)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setVisible(false), 8000)
  }

  const handleCopyPub = () =>
    copyPub(account.publicKey, toastMessages.publicKeyCopied)

  const handleCopyPriv = () =>
    copyPriv(account.privateKey, toastMessages.privateKeyCopied)

  const handleDelete = () => {
    onDelete(index)
    toast.success(toastMessages.accountRemoved)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="vault-card relative"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${style.color}55, transparent)`,
        }}
      />

      <div className="p-5 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-md flex items-center justify-center text-sm font-semibold"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: style.bg,
                border: `1px solid ${style.border}`,
                color: style.color,
              }}
            >
              {index + 1}
            </div>

            <div>
              <div
                className="text-sm font-semibold text-[#eeeeff]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {account.name}
              </div>

              <Badge
                variant="outline"
                className="text-[11px] px-2 py-0 h-5 border-0 font-mono"
                style={{
                  background: style.bg,
                  color: style.color,
                }}
              >
                {chain.charAt(0).toUpperCase() + chain.slice(1)}
              </Badge>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-md"
            style={{
              background: "rgba(255,90,90,0.08)",
              border: "1px solid rgba(255,90,90,0.2)",
              color: "#ff7070",
            }}
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 size={14} />
          </Button>
        </div>

        <div>
          <p className="text-[11px] uppercase mb-1 text-[var(--text-muted)]">
            {accountCardContent.publicKeyLabel}
          </p>

          <div className="rounded-md px-3 py-2 flex justify-between items-center bg-[rgba(130,100,255,0.04)] border border-[rgba(130,100,255,0.12)]">
            <span className="text-[13px] truncate font-mono text-[#c4b4ff]">
              {truncate(account.publicKey)}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={handleCopyPub}
            >
              {copiedPub ? <Check size={13} /> : <Copy size={13} />}
            </Button>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase mb-1 text-[var(--text-muted)]">
            {accountCardContent.privateKeyLabel}
          </p>

          <div
            className={`rounded-md px-3 py-2 flex justify-between items-center transition-all ${
              visible
                ? "bg-red-500/5 border border-red-500/30"
                : "bg-[rgba(130,100,255,0.04)] border border-[rgba(130,100,255,0.12)]"
            }`}
          >
            <span
              className={`text-[13px] truncate font-mono ${
                visible ? "text-red-300" : "text-[var(--text-subtle)]"
              }`}
            >
              {visible
                ? truncate(account.privateKey)
                : "●●●●●●●●●●●●●●●●●●●●●●●●"}
            </span>

            <div className="flex gap-2">
              {visible && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={handleCopyPriv}
                >
                  {copiedPriv ? <Check size={13} /> : <Copy size={13} />}
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={togglePrivKey}
              >
                {visible ? <EyeOff size={13} /> : <Eye size={13} />}
              </Button>
            </div>
          </div>

          {visible && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] mt-1 text-red-400"
            >
              {accountCardContent.autoHideNotice}
            </motion.p>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={accountCardContent.deleteDialogTitle}
        description={
          <>
            <strong>{account.name}</strong>{" "}
            {accountCardContent.deleteDialogNameAction}
            <br />
            {accountCardContent.deleteDialogRederiveNote}
          </>
        }
        confirmText={accountCardContent.deleteConfirmButton}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </motion.div>
  )
}
