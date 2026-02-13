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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h2 className="font-[Syne] font-bold text-2xl md:text-3xl text-white">
            {dashboardContent.title}
          </h2>
          <p className="text-sm mt-1 text-[var(--text-muted)]">
            {dashboardContent.managedLabel(accounts.length)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ConfirmDialog
            trigger={
              <Button variant="destructive" size="lg">
                <RotateCcw size={15} />
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
            onClick={() => setDialogOpen(true)}
          >
            <Plus size={15} />
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
            <List size={16} />
          </Button>

          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setView("grid")}
          >
            <LayoutGrid size={16} />
          </Button>
        </div>
      </div>

      <AddAccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={onAddAccount}
      />

      {accounts.length === 0 ? (
        <div className="vault-card text-center py-16 space-y-4">
          <p className="text-[var(--text-muted)]">
            {dashboardContent.emptyState}
          </p>

          <Button
            variant="accent"
            size="lg"
            onClick={() => setDialogOpen(true)}
          >
            <Plus size={14} />
            {dashboardContent.addFirstButton}
          </Button>
        </div>
      ) : (
        <motion.div
          layout
          className={
            view === "grid"
              ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-5"
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
