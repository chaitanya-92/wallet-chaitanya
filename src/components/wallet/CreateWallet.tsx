import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Camera } from "lucide-react"
import html2canvas from "html2canvas"
import { Button } from "@/components/ui/button"
import MnemonicGrid from "./MnemonicGrid"
import { fadeInUp } from "@/lib/motion"
import { createWalletContent } from "@/data"

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
  const captureRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mnemonic) createMnemonic()
  }, [mnemonic, createMnemonic])

  const handleScreenshot = async () => {
    if (!captureRef.current) return

    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: "#080b14",
      scale: 2,
    })

    const link = document.createElement("a")
    link.download = "recovery-phrase.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      exit="exit"
      className="w-full max-w-3xl mx-auto space-y-8"
    >
      <div className="text-center space-y-2">
        <h2>{createWalletContent.title}</h2>
        <p>{createWalletContent.subtitle}</p>
      </div>

      {mnemonic && (
        <div className="space-y-4">
          <div ref={captureRef}>
            <MnemonicGrid mnemonic={mnemonic} startVisible={false} />
          </div>

          <div className="flex justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
              onClick={handleScreenshot}
            >
              <Camera size={16} />
              Download Screenshot
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 max-w-md mx-auto">
        <Button
          variant="accent"
          className="h-11 text-sm"
          onClick={onConfirm}
        >
          {createWalletContent.confirmButton}
        </Button>

        <Button
          variant="default"
          className="h-10 text-sm"
          onClick={onBack}
        >
          {createWalletContent.cancelButton}
        </Button>
      </div>

    </motion.div>
  )
}
