import type { NetworkConfig, SelectNetworkContent } from "@/types"

export const networkContent: SelectNetworkContent = {
  title: "Select Network",
  subtitle: "Choose the blockchain you want to use",
}

export const networks: NetworkConfig[] = [
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    emoji: "◎",
    description: "Fast, low-cost L1",
    color: "#9945ff",
    dimColor: "rgba(153,69,255,0.1)",
    borderColor: "rgba(153,69,255,0.28)",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    emoji: "⟠",
    description: "Leading smart contract platform",
    color: "#627eea",
    dimColor: "rgba(98,126,234,0.1)",
    borderColor: "rgba(98,126,234,0.28)",
  },
]
