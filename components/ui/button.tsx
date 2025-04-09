"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#d4b08c] to-[#c9a080] text-white hover:from-[#c9a080] hover:to-[#b89070] shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-[#d4b08c] bg-white/80 text-[#7d6a5b] hover:bg-[#d4b08c]/10 hover:border-[#c9a080]",
        secondary:
          "bg-gradient-to-r from-[#8d7b68] to-[#7d6a5b] text-white hover:from-[#7d6a5b] hover:to-[#6d5a4b] shadow-md hover:shadow-lg",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-primary underline-offset-4 hover:underline",
        elegant:
          "bg-white/80 backdrop-blur-sm border border-[#edc3bf] text-[#7d6a5b] hover:bg-[#edc3bf]/20 shadow-sm hover:shadow-md",
        gold: "bg-gradient-to-r from-[#d4af37] to-[#f2d675] text-white hover:from-[#c9a030] hover:to-[#e6ca6c] shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        pill: "h-10 px-6 py-2 rounded-full",
        pillLg: "h-12 px-8 py-3 rounded-full text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  glowEffect?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, glowEffect = false, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
      if (!buttonRef.current || !glowEffect) return

      const button = buttonRef.current

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(button.querySelector(".glow-effect"), {
          left: x,
          top: y,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      button.addEventListener("mousemove", handleMouseMove)

      return () => {
        button.removeEventListener("mousemove", handleMouseMove)
      }
    }, [glowEffect])

    const combinedRef = (node: HTMLButtonElement) => {
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
      buttonRef.current = node
    }

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          "transform hover:-translate-y-0.5 active:translate-y-0 transition-transform",
        )}
        ref={combinedRef}
        {...props}
      >
        {glowEffect && (
          <span className="glow-effect absolute w-20 h-20 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-30"></span>
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:translate-y-0 group-hover:opacity-20 transition-all duration-300"></span>
        </span>
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
