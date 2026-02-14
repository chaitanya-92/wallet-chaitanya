import { Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useWalletFlow } from "@/context/WalletFlowContext"
import { FLOW_STEPS } from "@/config/constants"
import { navContent } from "@/data"

export default function Navbar() {
  const { step } = useWalletFlow()
  const currentIndex = FLOW_STEPS.indexOf(step)

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080b14]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-md bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/20">
            <Layers size={18} className="text-violet-300" />
          </div>

          <span className="font-[Syne] font-semibold text-base sm:text-lg tracking-tight text-white">
            {navContent.appName}
          </span>
        </div>

        {currentIndex >= 0 && (
          <div className="hidden sm:flex items-center gap-2">
            {FLOW_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= currentIndex
                    ? "w-7 bg-violet-500"
                    : "w-2 bg-white/10"
                }`}
              />
            ))}
          </div>
        )}

        <Badge
          variant="outline"
          className="hidden sm:flex h-8 px-3 rounded-full text-xs font-medium border-green-400/20 bg-green-400/5 text-green-400 items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-400" />
          {navContent.testnetBadge}
        </Badge>
      </div>
    </header>
  )
}
