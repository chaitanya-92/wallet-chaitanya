import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { fadeInUp } from "@/lib/motion"
import { confirmSeedContent, commonContent } from "@/data"

interface Props {
  onContinue: () => void
  onBack: () => void
}

export default function ConfirmSeed({ onContinue, onBack }: Props) {
  const [checked, setChecked] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flow-container space-y-8"
    >
      <div className="text-center space-y-2">
        <h2>{confirmSeedContent.title}</h2>
        <p>{confirmSeedContent.subtitle}</p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span className="text-sm">{confirmSeedContent.checkboxLabel}</span>
      </label>

      <div className="flex flex-col gap-3">
        <Button
          variant="accent"
          disabled={!checked}
          onClick={onContinue}
        >
          {confirmSeedContent.continueButton}
        </Button>
        <Button variant="ghost" onClick={onBack}>
          {commonContent.back}
        </Button>
      </div>
    </motion.div>
  )
}
