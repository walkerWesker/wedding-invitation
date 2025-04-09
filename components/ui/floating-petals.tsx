"use client"

import { useRef, useEffect, memo } from "react"
import { gsap } from "gsap"
import { useWindowSize } from "@/hooks/use-window-size"

interface PetalProps {
  type: "petal" | "rose-petal" | "flower-petal" | "leaf"
  color?: string
  size?: string
  delay?: number
  duration?: number
}

const Petal = memo(function Petal({ type, color = "#edc3bf", size = "w-8 h-8", delay = 0, duration = 10 }: PetalProps) {
  const petalRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  useEffect(() => {
    if (!petalRef.current) return

    // Adjust animation parameters based on screen size
    const speedFactor = width < 640 ? 0.7 : width < 768 ? 0.8 : 1
    const adjustedDuration = duration / speedFactor

    // Random starting position - adjusted for screen width
    const startX = Math.random() * width
    const startRotation = Math.random() * 360
    const startScale = (0.5 + Math.random() * 0.5) * (width < 640 ? 0.7 : width < 768 ? 0.8 : 1)

    // Set initial position
    gsap.set(petalRef.current, {
      x: startX,
      y: -50,
      rotation: startRotation,
      scale: startScale,
      opacity: 0,
    })

    // Create animation
    const tl = gsap.timeline({ repeat: -1, delay: delay })

    tl.to(petalRef.current, {
      opacity: 0.8,
      duration: 1,
    })
      .to(
        petalRef.current,
        {
          y: window.innerHeight + 100,
          x: startX + (Math.random() * 200 - 100) * (width < 640 ? 0.6 : 1),
          rotation: startRotation + Math.random() * 360,
          duration: adjustedDuration,
          ease: "none",
        },
        0,
      )
      .to(
        petalRef.current,
        {
          opacity: 0,
          duration: 2,
        },
        adjustedDuration - 2,
      )

    return () => {
      tl.kill()
    }
  }, [delay, duration, width])

  const renderSvg = () => {
    switch (type) {
      case "petal":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
          </svg>
        )
      case "rose-petal":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 30C50 30 40 10 50 5C60 10 50 30 50 30Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
          </svg>
        )
      case "flower-petal":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
            <circle cx="50" cy="40" r="5" fill={color} fillOpacity="0.8" />
          </svg>
        )
      case "leaf":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 20C50 20 80 50 50 80C20 50 50 20 50 20Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
            <path d="M50 20V80" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div ref={petalRef} className={`absolute ${size} pointer-events-none`} style={{ zIndex: -1 }}>
      {renderSvg()}
    </div>
  )
})

export default function FloatingPetals({ count = 20 }) {
  const { width } = useWindowSize()
  const petals = []
  const petalTypes = ["petal", "rose-petal", "flower-petal", "leaf"]
  const colors = ["#edc3bf", "#e8c4c4", "#d4b08c", "#d4af37"]

  // Adjust petal count based on screen size
  const adjustedCount = width < 640 ? Math.floor(count * 0.6) : width < 768 ? Math.floor(count * 0.8) : count

  for (let i = 0; i < adjustedCount; i++) {
    const type = petalTypes[Math.floor(Math.random() * petalTypes.length)] as
      | "petal"
      | "rose-petal"
      | "flower-petal"
      | "leaf"
    const color = colors[Math.floor(Math.random() * colors.length)]

    // Adjust size based on screen width
    const sizeBase = width < 640 ? 4 : width < 768 ? 5 : 6
    const sizeRange = width < 640 ? 6 : width < 768 ? 8 : 10
    const size = `w-${Math.floor(sizeBase + Math.random() * sizeRange)} h-${Math.floor(sizeBase + Math.random() * sizeRange)}`

    const delay = Math.random() * 10
    const duration = 15 + Math.random() * 20

    petals.push(<Petal key={i} type={type} color={color} size={size} delay={delay} duration={duration} />)
  }

  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">{petals}</div>
}
