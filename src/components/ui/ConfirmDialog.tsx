import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "react"
import { commonContent } from "@/data"

interface ConfirmDialogProps {
  trigger: ReactNode
  title: string
  description: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  variant?: "default" | "destructive"
}

export default function ConfirmDialog({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  cancelText = commonContent.cancel,
  onConfirm,
  variant = "default",
}: ConfirmDialogProps) {
  const isDestructive = variant === "destructive"

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent
        className="rounded-[22px] border-0 max-w-[420px]"
        style={{
          background: "rgba(13,17,32,0.98)",
          border: "1px solid rgba(130,100,255,0.15)",
          backdropFilter: "blur(24px)",
        }}
      >
        <AlertDialogHeader className="text-center space-y-2">
          <AlertDialogTitle
            className="font-[Syne] font-bold text-xl text-[#eeeeff]"
            style={{ letterSpacing: "-0.3px" }}
          >
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription
            className="text-sm leading-relaxed"
            style={{
              color: "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-2.5 mt-2">
          <AlertDialogCancel
            className="flex-1 h-11 rounded-[11px] font-semibold border-0"
            style={{
              background: "rgba(130,100,255,0.08)",
              border: "1px solid rgba(130,100,255,0.2)",
              color: "#a090d8",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 h-11 rounded-[11px] font-semibold border-0"
            style={
              isDestructive
                ? {
                    background: "rgba(255,90,90,0.1)",
                    border: "1px solid rgba(255,90,90,0.28)",
                    color: "#ff7070",
                    fontFamily: "'DM Sans', sans-serif",
                  }
                : {
                    background: "linear-gradient(135deg, #8264ff, #5a3ecf)",
                    border: "none",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(130,100,255,0.35)",
                    fontFamily: "'DM Sans', sans-serif",
                  }
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
