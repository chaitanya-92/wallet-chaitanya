import { motion } from "framer-motion"
import { ChevronRight, Layers, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { welcomeContent } from "@/data"

interface Props {
  onCreate: () => void
  onImport: () => void
}

export default function Welcome({ onCreate, onImport }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-[480px] text-center relative px-2"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(130,100,255,0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <motion.div variants={staggerItem} className="flex justify-center mb-7">
          <div
            className="w-20 h-20 rounded-[24px] flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(130,100,255,0.3), rgba(70,50,190,0.25))",
              border: "1px solid rgba(130,100,255,0.4)",
              boxShadow:
                "0 0 48px rgba(130,100,255,0.25), 0 0 100px rgba(130,100,255,0.1)",
            }}
          >
            <Layers size={36} color="#c0b0ff" aria-hidden />
          </div>
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="font-[Syne] font-extrabold text-[48px] sm:text-[56px] md:text-[62px] leading-none tracking-[-2px] mb-5"
          style={{
            background: "linear-gradient(135deg, #ffffff 20%, #b09cff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {welcomeContent.title}
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-[var(--text-muted)] text-base leading-[1.7] max-w-[340px] mx-auto mb-9"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {welcomeContent.subtitle}
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="flex justify-center gap-2 flex-wrap mb-10"
        >
          {welcomeContent.featurePills.map((label) => (
            <span key={label} className="vault-pill">
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div variants={staggerItem} className="flex flex-col gap-3">
          <Button
            onClick={onCreate}
            className="w-full h-[52px] text-[15px] font-semibold rounded-[14px] gap-2"
            style={{
              background: "linear-gradient(135deg, #8264ff, #5a3ecf)",
              border: "none",
              boxShadow: "0 4px 24px rgba(130,100,255,0.4)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {welcomeContent.createWallet}
            <ChevronRight size={18} aria-hidden />
          </Button>

          <Button
            onClick={onImport}
            variant="outline"
            className="w-full h-[52px] text-[15px] font-semibold rounded-[14px] gap-2"
            style={{
              background: "rgba(130,100,255,0.08)",
              border: "1px solid rgba(130,100,255,0.22)",
              color: "#c4b4ff",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Download size={16} aria-hidden />
            {welcomeContent.importWallet}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
