import type { WelcomeContent } from "@/types"

export const welcomeContent: WelcomeContent = {
  title: "Vault",
  subtitle:
    "Your non-custodial Web3 wallet. Own your keys, own your assets. No compromise.",
  featurePills: ["🔐 Self-Custody", "⚡ Multi-Chain", "🌐 Open Source"] as const,
  createWallet: "Create New Wallet",
  importWallet: "Import Existing Wallet",
}
