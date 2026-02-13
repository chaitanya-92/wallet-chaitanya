import Navbar from "@/components/Navbar"
import WalletFlow from "@/components/wallet/WalletFlow"
import { motion } from "framer-motion"
import { Toaster } from "@/components/ui/sonner"
import "./index.css"

export default function App() {
  return (
    <div className="wallet-grid-bg min-h-screen flex flex-col overflow-x-hidden">
      
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 pt-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto w-full">
          <WalletFlow />
        </div>
      </motion.main>

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
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          },
        }}
      />
      
    </div>
  )
}
