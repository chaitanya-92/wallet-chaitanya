import { AnimatePresence } from "framer-motion"
import Welcome from "./Welcome"
import SelectNetwork from "./SelectNetwork"
import CreateWallet from "./CreateWallet"
import ConfirmSeed from "./ConfirmSeed"
import ImportWallet from "./ImportWallet"
import Dashboard from "./Dashboard"
import { useWalletFlow } from "@/hooks/useWalletFlow"
import { useWallet } from "@/hooks/useWallet"
import { STORAGE_KEYS } from "@/config/constants"

export default function WalletFlow() {
  const flow = useWalletFlow()
  const wallet = useWallet()

  const isCentered = flow.step !== "dashboard"

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
    <div
      className={`w-full mx-auto transition-all duration-300 ${
        isCentered
          ? "max-w-md flex items-center justify-center py-16"
          : "max-w-6xl py-10"
      }`}
    >
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

        {flow.step === "create" && wallet.chain && (
          <CreateWallet
            key="create"
            mnemonic={wallet.mnemonic}
            createMnemonic={wallet.createMnemonic}
            onConfirm={() => flow.next("confirm-seed")}
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

        {flow.step === "dashboard" && wallet.chain && (
          <Dashboard
            key="dashboard"
            accounts={wallet.accounts}
            onAddAccount={(name: string) =>
              wallet.deriveAccount(wallet.accounts.length, name)
            }
            onDeleteAccount={wallet.deleteAccount}
            onResetWallet={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
