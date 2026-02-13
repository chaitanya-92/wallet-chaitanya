import { motion, AnimatePresence } from "framer-motion"
import { Plus, RotateCcw, LayoutGrid, List } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ConfirmDialog from "@/components/ui/ConfirmDialog"
import AccountCard from "./AccountCard"
import AddAccountDialog from "./AddAccountDialog"
import type { WalletAccount } from "@/types"
import { dashboardContent, toastMessages } from "@/data"

interface Props {
  accounts: WalletAccount[]
  onAddAccount: (name: string) => void
  onDeleteAccount: (index: number) => void
  onResetWallet: () => void
}

export default function Dashboard({
  accounts,
  onAddAccount,
  onDeleteAccount,
  onResetWallet,
}: Props) {
  const [view, setView] = useState<"list" | "grid">("list")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleReset = () => {
    onResetWallet()
    toast.success(toastMessages.walletCleared)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h2 className="font-[Syne] font-extrabold text-[32px] text-[#eeeeff] leading-[1.1] tracking-tight">
            {dashboardContent.title}
          </h2>
          <p className="text-sm mt-1 text-[var(--text-muted)]">
            {dashboardContent.managedLabel(accounts.length)}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <ConfirmDialog
            trigger={
              <Button variant="destructive" size="lg" className="gap-1.5">
                <RotateCcw size={15} aria-hidden />
                {dashboardContent.resetButton}
              </Button>
            }
            title={dashboardContent.resetDialogTitle}
            description={
              <>
                {dashboardContent.resetDialogDescription(accounts.length)}
                <br />
                <span className="text-red-400">
                  {dashboardContent.resetDialogWarning}
                </span>
              </>
            }
            confirmText={dashboardContent.resetConfirmButton}
            variant="destructive"
            onConfirm={handleReset}
          />

          <Button
            variant="accent"
            size="lg"
            className="gap-1.5"
            onClick={() => setDialogOpen(true)}
          >
            <Plus size={15} aria-hidden />
            {dashboardContent.addAccountButton}
          </Button>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <div className="flex border border-[var(--border)] rounded-md overflow-hidden">
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setView("list")}
          >
            <List size={16} aria-hidden />
          </Button>

          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setView("grid")}
          >
            <LayoutGrid size={16} aria-hidden />
          </Button>
        </div>
      </div>

      <AddAccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={onAddAccount}
      />

      {accounts.length === 0 ? (
        <div className="vault-card text-center py-14 space-y-4">
          <p className="text-[var(--text-muted)]">
            {dashboardContent.emptyState}
          </p>

          <Button
            variant="accent"
            size="lg"
            className="gap-2"
            onClick={() => setDialogOpen(true)}
          >
            <Plus size={14} aria-hidden />
            {dashboardContent.addFirstButton}
          </Button>
        </div>
      ) : (
        <motion.div
          layout
          className={
            view === "grid"
              ? "grid gap-5 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]"
              : "flex flex-col gap-4"
          }
        >
          <AnimatePresence mode="popLayout">
            {accounts.map((account, index) => (
              <motion.div layout key={account.publicKey}>
                <AccountCard
                  account={account}
                  index={index}
                  onDelete={onDeleteAccount}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}
