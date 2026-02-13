import type { WelcomeContent } from "@/types"

export const welcomeContent: WelcomeContent = {
  title: "Chaitanya Vault",
  subtitle:
    "A secure, self-custodial multi-chain wallet built for developers and builders. You control the keys. Always.",
  featurePills: [
    "Self-Custody",
    "Multi-Chain Support",
    "Local Key Encryption",
  ] as const,
  createWallet: "Create Wallet",
  importWallet: "Import Wallet",
}
