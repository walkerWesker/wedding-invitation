"use client"

import { memo } from "react"

interface SectionDividerProps {
  className?: string
}

export const SectionDivider = memo(function SectionDivider({ className = "" }: SectionDividerProps) {
  return <div className={`w-24 h-1 bg-[#edc3bf] mx-auto my-6 ${className}`}></div>
})
