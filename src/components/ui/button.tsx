import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 cursor-pointer",
    "whitespace-nowrap rounded-md",
    "text-sm font-medium",
    "transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0",
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--accent-dim)]",
        accent:
          "bg-gradient-to-br from-[#8264ff] to-[#5a3ecf] text-white shadow-sm shadow-violet-500/30 hover:opacity-90",
        ghost:
          "bg-transparent text-[var(--text-accent)] hover:bg-[var(--accent-dim)]",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--accent-dim)]",
        secondary:
          "bg-[var(--accent-dim)] text-[var(--text-primary)] hover:bg-[var(--accent-dim)]/80",
        destructive:
          "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
        link:
          "text-[var(--accent)] underline-offset-4 hover:underline bg-transparent",
      },

      size: {
        default: "h-9 px-4",
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
        "icon-xs": "h-6 w-6",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
