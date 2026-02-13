import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import MnemonicGrid from "./MnemonicGrid"
import { fadeInUp } from "@/lib/motion"
import { createWalletContent, commonContent } from "@/data"

interface Props {
  mnemonic: string
  createMnemonic: () => string
  onConfirm: () => void
  onBack: () => void
}

export default function CreateWallet({
  mnemonic,
  createMnemonic,
  onConfirm,
  onBack,
}: Props) {
  useEffect(() => {
    if (!mnemonic) createMnemonic()
  }, [mnemonic, createMnemonic])

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flow-container space-y-8"
    >
      <div className="text-center space-y-2">
        <h2>{createWalletContent.title}</h2>
        <p>{createWalletContent.subtitle}</p>
      </div>

      {mnemonic && <MnemonicGrid mnemonic={mnemonic} />}

      <div className="flex flex-col gap-3">
        <Button variant="accent" size="lg" onClick={onConfirm}>
          {createWalletContent.confirmButton}
        </Button>

        <Button variant="ghost" size="lg" onClick={onBack}>
          {commonContent.back}
        </Button>
      </div>
    </motion.div>
  )
}
