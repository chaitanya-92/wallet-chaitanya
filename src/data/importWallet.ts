import type { ImportWalletContent, ImportWalletErrors } from "@/types"

export const importWalletContent: ImportWalletContent = {
  title: "Import Wallet",
  subtitle:
    "Enter your 12 or 24-word secret recovery phrase,\nseparated by spaces.",
  label: "Recovery Phrase",
  placeholder: "enter word1 word2 word3 ... word12",
  securityNotice:
    "Your phrase never leaves your device. We have zero access to your keys.",
  submitButton: "Import Wallet",
  wordCountLabel: (count: number) => (count > 0 ? `${count} words` : ""),
}

export const importWalletErrors: ImportWalletErrors = {
  invalidWordCount: "Please enter a valid 12 or 24-word recovery phrase.",
  invalidPhrase: "Invalid recovery phrase. Check the words and try again.",
}
