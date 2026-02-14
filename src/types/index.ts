export type Chain = "solana" | "ethereum"

export interface WalletAccount {
  name: string
  publicKey: string
  privateKey: string
  chain: Chain
}

export type Step =
  | "welcome"
  | "select-network"
  | "create"
  | "confirm-seed"
  | "import"
  | "dashboard"

export interface NavContent {
  appName: string
  testnetBadge: string
}

export interface WelcomeContent {
  title: string
  subtitle: string
  featurePills: readonly string[]
  createWallet: string
  importWallet: string
}

export interface NetworkConfig {
  id: Chain
  name: string
  symbol: string
  emoji: string
  description: string
  color: string
  dimColor: string
  borderColor: string
}

export interface SelectNetworkContent {
  title: string
  subtitle: string
}

export interface CreateWalletContent {
  title: string
  subtitle: string
  confirmButton: string
  cancelButton: string
}

export interface ConfirmSeedContent {
  title: string
  subtitle: string
  checkboxLabel: string
  continueButton: string
}

export interface ImportWalletContent {
  title: string
  subtitle: string
  label: string
  placeholder: string
  securityNotice: string
  submitButton: string
  wordCountLabel: (count: number) => string
}

export interface ImportWalletErrors {
  invalidWordCount: string
  invalidPhrase: string
}

export interface DashboardContent {
  title: string
  managedLabel: (count: number) => string
  resetButton: string
  addAccountButton: string
  resetDialogTitle: string
  resetDialogDescription: (count: number) => string
  resetDialogWarning: string
  resetConfirmButton: string
  emptyState: string
  addFirstButton: string
}

export interface AddAccountDialogContent {
  title: string
  placeholder: string
  cancelButton: string
  createButton: string
}

export interface AccountCardContent {
  publicKeyLabel: string
  privateKeyLabel: string
  deleteDialogTitle: string
  deleteDialogNameAction: string
  deleteDialogRederiveNote: string
  deleteConfirmButton: string
  autoHideNotice: string
}

export interface MnemonicGridContent {
  revealPrompt: string
  revealButton: string
  hideButton: string
  copyButton: string
  copiedButton: string
}

export interface CommonContent {
  back: string
  cancel: string
  delete: string
  copy: string
  continue: string
}

export interface ToastMessages {
  walletImported: string
  walletCleared: string
  accountCreated: string
  accountRemoved: string
  publicKeyCopied: string
  privateKeyCopied: string
  seedPhraseCopied: string
  enterAccountName: string
}
