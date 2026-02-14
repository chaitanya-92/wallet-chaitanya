import Navbar from "@/components/Navbar"
import WalletFlow from "@/components/wallet/WalletFlow"
import { motion } from "framer-motion"
import { Toaster } from "@/components/ui/sonner"
import { WalletFlowProvider } from "@/context/WalletFlowContext"
import "./index.css"

export default function App() {
  return (
    <WalletFlowProvider>
      <div className="wallet-grid-bg min-h-screen flex flex-col">
        <Navbar />

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex-1 relative"
        >
          <WalletFlow />
        </motion.main>

        <Toaster position="bottom-right" richColors />
      </div>
    </WalletFlowProvider>
  )
}
