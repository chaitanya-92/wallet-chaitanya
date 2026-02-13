import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { networks, networkContent, commonContent } from "@/data"

interface Props {
  onSelect: (chain: "solana" | "ethereum") => void
  onBack: () => void
}

export default function SelectNetwork({ onSelect, onBack }: Props) {
  return (
    <motion.div
      key="select-network"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flow-container"
    >
      <div className="text-center mb-9">
        <h2 className="font-[Syne] font-bold text-[28px] text-[#eeeeff] mb-2.5 tracking-tight">
          {networkContent.title}
        </h2>
        <p
          className="text-[var(--text-muted)] text-sm leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {networkContent.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3.5 mb-8">
        {networks.map((chain, i) => (
          <motion.button
            key={chain.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(chain.id)}
            className="flex items-center gap-4 p-[18px] rounded-2xl text-left transition-all duration-200 cursor-pointer"
            style={{
              background: chain.dimColor,
              border: `1px solid ${chain.borderColor}`,
            }}
          >
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[22px] shrink-0"
              style={{
                background: `rgba(${chain.id === "solana" ? "153,69,255" : "98,126,234"}, 0.15)`,
                border: `1px solid ${chain.borderColor}`,
                color: chain.color,
              }}
            >
              {chain.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-[Syne] font-bold text-base text-[#eeeeff] mb-0.5 tracking-tight">
                {chain.name}
              </div>
              <div
                className="text-[13px] text-[var(--text-muted)]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {chain.description}
              </div>
            </div>

            <span
              className="text-xs px-2.5 py-1 rounded-lg shrink-0 font-mono"
              style={{
                color: chain.color,
                background: chain.dimColor,
                border: `1px solid ${chain.borderColor}`,
              }}
            >
              {chain.symbol}
            </span>
          </motion.button>
        ))}
      </div>

      <Button
        variant="ghost"
        onClick={onBack}
        className="text-[var(--text-muted)] hover:text-[var(--text-accent)] gap-1.5 px-0 text-sm"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <ChevronLeft size={15} />
        {commonContent.back}
      </Button>
    </motion.div>
  )
}
