import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
      className="w-full max-w-md space-y-8 text-center"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">
          {confirmSeedContent.title}
        </h2>
        <p className="text-sm text-white/60">
          {confirmSeedContent.subtitle}
        </p>
      </div>

      <label
        className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
          checked
            ? "border-violet-500/50 bg-violet-500/5 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
            : "border-white/10 bg-white/5 hover:bg-white/10"
        }`}
      >
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => setChecked(Boolean(value))}
          className="mt-1 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
        />

        <span className="text-sm text-white/80 text-left leading-relaxed">
          {confirmSeedContent.checkboxLabel}
        </span>
      </label>

      <div className="flex flex-col gap-3">
        <Button
          variant="accent"
          disabled={!checked}
          onClick={onContinue}
          className="h-11 text-sm font-medium"
        >
          {confirmSeedContent.continueButton}
        </Button>

        <Button
          variant="ghost"
          onClick={onBack}
          className="h-10 text-sm text-white/60 hover:text-white"
        >
          {commonContent.cancel}
        </Button>
      </div>
    </motion.div>
  )
}
