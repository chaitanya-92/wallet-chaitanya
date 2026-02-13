import type { DashboardContent } from "@/types"

export const dashboardContent: DashboardContent = {
  title: "Your Accounts",
  managedLabel: (count: number) =>
    `${count} account${count !== 1 ? "s" : ""} managed`,
  resetButton: "Reset Wallet",
  addAccountButton: "Add Account",
  resetDialogTitle: "Reset Entire Wallet?",
  resetDialogDescription: (count: number) =>
    `This will permanently delete ${count} account${count !== 1 ? "s" : ""}, all wallet data.`,
  resetDialogWarning: "This action cannot be undone.",
  resetConfirmButton: "Reset Wallet",
  emptyState: "No accounts yet. Add your first account.",
  addFirstButton: "Add First Account",
}
