"use client"

import { memo } from "react"

interface DecorElementProps {
  type: "flower" | "rings" | "lines" | "butterfly" | "flower2" | "dots"
  position: string
  size: string
  depth: string
}

export const DecorElement = memo(function DecorElement({ type, position, size, depth }: DecorElementProps) {
  const renderSvg = () => {
    switch (type) {
      case "flower":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 10C50 10 60 30 80 30C80 30 60 40 60 60C60 60 40 50 20 60C20 60 30 40 20 20C20 20 40 30 50 10Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="40" r="5" fill="#edc3bf" />
          </svg>
        )
      case "rings":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="#edc3bf" strokeWidth="1" />
            <circle cx="50" cy="50" r="40" stroke="#edc3bf" strokeWidth="0.5" />
          </svg>
        )
      case "lines":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20L80 80" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
            <path d="M20 80L80 20" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
          </svg>
        )
      case "butterfly":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 30C50 30 30 10 20 30C10 50 40 60 50 80C60 60 90 50 80 30C70 10 50 30 50 30Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M50 30V80" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
          </svg>
        )
      case "flower2":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 20C50 20 65 35 65 50C65 65 50 80 35 65C20 50 35 35 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="50" r="5" fill="#edc3bf" />
          </svg>
        )
      case "dots":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="3" fill="#edc3bf" />
            <circle cx="50" cy="50" r="3" fill="#edc3bf" />
            <circle cx="70" cy="70" r="3" fill="#edc3bf" />
            <circle cx="30" cy="70" r="3" fill="#edc3bf" />
            <circle cx="70" cy="30" r="3" fill="#edc3bf" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className={`absolute ${position} ${size} decor-element decor-svg`} data-depth={depth}>
      {renderSvg()}
    </div>
  )
})
