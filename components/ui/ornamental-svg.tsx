"use client"

import { memo } from "react"

interface OrnamentalSvgProps {
  type: "floral-corner" | "sparkle" | "rings-ornament" | "fine-line" | "heart-ornament" | "floral-divider"
  position: string
  size: string
  className?: string
}

export const OrnamentalSvg = memo(function OrnamentalSvg({ type, position, size, className = "" }: OrnamentalSvgProps) {
  const renderSvg = () => {
    switch (type) {
      case "floral-corner":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5C5 5 20 20 20 40C20 60 5 80 5 95" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
            <path d="M5 5C5 5 30 15 50 15C70 15 95 5 95 5" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
            <path
              d="M15 15C15 15 25 25 35 25C45 25 55 15 55 15"
              stroke="#edc3bf"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M15 15C15 15 25 25 25 35C25 45 15 55 15 55"
              stroke="#edc3bf"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="5" cy="5" r="2" fill="#edc3bf" />
            <circle cx="15" cy="15" r="1.5" fill="#edc3bf" />
            <circle cx="25" cy="25" r="1" />
            <circle cx="15" cy="15" r="1.5" fill="#edc3bf" />
            <circle cx="25" cy="25" r="1" fill="#edc3bf" />
          </svg>
        )
      case "sparkle":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 10L55 45L90 50L55 55L50 90L45 55L10 50L45 45L50 10Z"
              stroke="#edc3bf"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="50" r="3" fill="#edc3bf" />
          </svg>
        )
      case "rings-ornament":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#edc3bf" strokeWidth="0.5" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="30" stroke="#edc3bf" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" stroke="#edc3bf" strokeWidth="0.5" strokeDasharray="1 2" />
            <path d="M50 10V90" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
            <path d="M10 50H90" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
            <path d="M22 22L78 78" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
            <path d="M78 22L22 78" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
          </svg>
        )
      case "fine-line":
        return (
          <svg viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5H95" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="5" cy="5" r="2" fill="#edc3bf" />
            <circle cx="50" cy="5" r="2" fill="#edc3bf" />
            <circle cx="95" cy="5" r="2" fill="#edc3bf" />
          </svg>
        )
      case "heart-ornament":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 80C50 80 15 55 15 30C15 20 25 10 35 10C42 10 48 15 50 20C52 15 58 10 65 10C75 10 85 20 85 30C85 55 50 80 50 80Z"
              stroke="#d4af37"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35 40C35 40 40 45 50 45C60 45 65 40 65 40"
              stroke="#d4af37"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="30" cy="30" r="2" fill="#d4af37" />
            <circle cx="70" cy="30" r="2" fill="#d4af37" />
          </svg>
        )
      case "floral-divider":
        return (
          <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20H190" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" />
            <path
              d="M100 5C100 5 105 15 115 15C125 15 130 5 130 5"
              stroke="#d4af37"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M100 35C100 35 105 25 115 25C125 25 130 35 130 35"
              stroke="#d4af37"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path d="M70 5C70 5 75 15 85 15C95 15 100 5 100 5" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" />
            <path
              d="M70 35C70 35 75 25 85 25C95 25 100 35 100 35"
              stroke="#d4af37"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="100" cy="20" r="3" fill="#d4af37" />
            <circle cx="70" cy="20" r="2" fill="#d4af37" />
            <circle cx="130" cy="20" r="2" fill="#d4af37" />
            <circle cx="40" cy="20" r="1.5" fill="#d4af37" />
            <circle cx="160" cy="20" r="1.5" fill="#d4af37" />
          </svg>
        )
      default:
        return null
    }
  }

  return <div className={`absolute ${position} ${size} ornamental-svg ${className}`}>{renderSvg()}</div>
})
