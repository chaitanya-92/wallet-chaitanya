import Navbar from "@/components/Navbar"
import WalletFlow from "@/components/wallet/WalletFlow"
import { motion } from "framer-motion"
import { Toaster } from "@/components/ui/sonner"
import "./index.css"

export default function App() {
  return (
    <div className="wallet-grid-bg relative min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex-1 flex justify-center pt-[60px] px-4 sm:px-6 relative z-10"
      >
        <WalletFlow />

        <Toaster
          position="top-right"
          richColors
          expand={false}
          closeButton={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(13,17,32,0.96)",
              border: "1px solid rgba(130,100,255,0.18)",
              color: "#eeeeff",
              backdropFilter: "blur(20px)",
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: 14,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            },
          }}
        />
      </motion.main>
    </div>
  )
}
