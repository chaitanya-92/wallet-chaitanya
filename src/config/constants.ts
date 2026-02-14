export const STORAGE_KEYS = {
  MNEMONIC: "wallet_mnemonic",
  CHAIN: "wallet_chain",
  ACCOUNTS: "wallet_accounts",
  STEP: "wallet_step",
  IS_IMPORT: "vault_is_import",
} as const

export const FLOW_STEPS = [
  "welcome",
  "select-network",
  "create",
  "confirm-seed",
  "import",
  "dashboard",
] as const


export const RPC = {
  SOLANA: import.meta.env.VITE_SOLANA_RPC ?? "https://api.mainnet-beta.solana.com",
  SOLANA_DEVNET: import.meta.env.VITE_SOLANA_DEVNET_RPC ?? "https://api.devnet.solana.com",
  ETHEREUM: import.meta.env.VITE_ETHEREUM_RPC ?? "https://rpc.ankr.com/eth",
} as const
