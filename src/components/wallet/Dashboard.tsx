import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, LayoutGrid, List } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ConfirmDialog from "@/components/ui/ConfirmDialog"
import AccountCard from "./AccountCard"
import AddAccountDialog from "./AddAccountDialog"
import type { WalletAccount } from "@/types"

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
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [clearOpen, setClearOpen] = useState(false)

  const handleClearWallet = () => {
    onResetWallet()
    toast.success("Wallet cleared")
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
            Your Accounts
          </h2>
          <p className="text-sm mt-1 text-[var(--text-muted)]">
            {accounts.length} account{accounts.length !== 1 && "s"} managed
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="destructive"
            size="lg"
            onClick={() => setClearOpen(true)}
          >
            <Trash2 size={15} />
            Clear Wallet
          </Button>

          <Button
            variant="accent"
            size="lg"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus size={15} />
            Add Account
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
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={onAddAccount}
      />

      <ConfirmDialog
        open={clearOpen}
        onOpenChange={setClearOpen}
        title="Clear Wallet?"
        description={
          <>
            This will permanently remove all accounts and wallet data.
            <br />
            <span className="text-red-400">
              This action cannot be undone.
            </span>
          </>
        }
        confirmText="Clear Wallet"
        variant="destructive"
        onConfirm={handleClearWallet}
      />

      {accounts.length === 0 ? (
        <div className="vault-card text-center py-16 space-y-4">
          <p className="text-[var(--text-muted)]">
            No accounts yet.
          </p>

          <Button
            variant="accent"
            size="lg"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus size={14} />
            Add First Account
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
