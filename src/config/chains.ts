import type { Chain } from "@/types"

export const CHAIN_STYLES: Record<
  Chain,
  { color: string; bg: string; border: string }
> = {
  solana: {
    color: "#9945ff",
    bg: "rgba(153,69,255,0.15)",
    border: "rgba(153,69,255,0.3)",
  },
  ethereum: {
    color: "#627eea",
    bg: "rgba(98,126,234,0.15)",
    border: "rgba(98,126,234,0.3)",
  },
}
