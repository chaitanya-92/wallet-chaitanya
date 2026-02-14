import { AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Welcome from "./Welcome"
import SelectNetwork from "./SelectNetwork"
import CreateWallet from "./CreateWallet"
import ConfirmSeed from "./ConfirmSeed"
import ImportWallet from "./ImportWallet"
import Dashboard from "./Dashboard"
import { useWallet } from "@/hooks/useWallet"
import { useWalletFlow } from "@/context/WalletFlowContext"
import { STORAGE_KEYS } from "@/config/constants"
import { Button } from "@/components/ui/button"

export default function WalletFlow() {
  const wallet = useWallet()
  const flow = useWalletFlow()

  const isDashboard = flow.step === "dashboard"
  const isScrollable =
    flow.step === "dashboard" || flow.step === "create"

  const handleSelectNetwork = (chain: "solana" | "ethereum") => {
    wallet.setChain(chain)
    const isImport =
      localStorage.getItem(STORAGE_KEYS.IS_IMPORT) === "true"

    flow.next(isImport ? "import" : "create")
  }

  const handleCreateStart = () => {
    localStorage.removeItem(STORAGE_KEYS.IS_IMPORT)
    flow.next("select-network")
  }

  const handleImportStart = () => {
    localStorage.setItem(STORAGE_KEYS.IS_IMPORT, "true")
    flow.next("select-network")
  }

  const handleFirstAccount = async () => {
    if (!wallet.chain) return
    await wallet.deriveAccount(0, "Account 1")
    flow.next("dashboard")
  }

  const handleImport = async (mnemonic: string) => {
    wallet.importMnemonic(mnemonic)

    if (!wallet.chain) {
      flow.next("select-network")
      return
    }

    await wallet.deriveAccount(0, "Account 1")
    localStorage.removeItem(STORAGE_KEYS.IS_IMPORT)
    flow.next("dashboard")
  }

  const handleReset = () => {
    wallet.resetWallet()
    flow.resetFlow()
    localStorage.removeItem(STORAGE_KEYS.IS_IMPORT)
  }

  return (
    <div className="relative w-full h-full max-w-6xl mx-auto px-4 flex flex-col">

      {/* NON-SCROLL FLOWS (CENTERED) */}
      {!isScrollable && (
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {flow.step === "welcome" && (
              <Welcome
                key="welcome"
                onCreate={handleCreateStart}
                onImport={handleImportStart}
              />
            )}

            {flow.step === "select-network" && (
              <SelectNetwork
                key="select-network"
                onSelect={handleSelectNetwork}
                onBack={flow.goBack}
              />
            )}

            {flow.step === "confirm-seed" && (
              <ConfirmSeed
                key="confirm-seed"
                onContinue={handleFirstAccount}
                onBack={flow.goBack}
              />
            )}

            {flow.step === "import" && (
              <ImportWallet
                key="import"
                onImport={handleImport}
                onBack={flow.goBack}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* SCROLLABLE FLOWS */}
      {isScrollable && (
        <div className="flex-1 overflow-y-auto py-10">
          {flow.step === "create" && wallet.chain && (
            <CreateWallet
              mnemonic={wallet.mnemonic}
              createMnemonic={wallet.createMnemonic}
              onConfirm={() => flow.next("confirm-seed")}
              onBack={flow.goBack}
            />
          )}

          {isDashboard && (
            <Dashboard
              accounts={wallet.accounts}
              onAddAccount={(name: string) =>
                wallet.deriveAccount(wallet.accounts.length, name)
              }
              onDeleteAccount={wallet.deleteAccount}
              onResetWallet={handleReset}
            />
          )}
        </div>
      )}

      {!isScrollable && flow.step !== "welcome" && (
        <div className="absolute top-6 left-4 z-40">
          <Button
            variant="ghost"
            size="sm"
            onClick={flow.goBack}
            className="gap-2 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>
      )}
    </div>
  )
}
