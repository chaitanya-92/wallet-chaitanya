import Navbar from "@/components/Navbar"
import WalletFlow from "@/components/wallet/WalletFlow"

import { Toaster } from "@/components/ui/sonner"
import { WalletFlowProvider } from "@/context/WalletFlowContext"
import "./index.css"

export default function App() {
  return (
    <WalletFlowProvider>
      <div className="wallet-grid-bg h-dvh flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 relative overflow-hidden">
          <WalletFlow />
        </main>

        <Toaster position="bottom-right" richColors />
      </div>
    </WalletFlowProvider>
  )
}

