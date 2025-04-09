"use client"

import { useRef, useEffect, memo } from "react"
import { gsap } from "gsap"
import { throttle } from "@/lib/utils"

interface PetalProps {
  className?: string
  color?: string
  size?: string
  delay?: number
  duration?: number
  type?: "petal" | "rose" | "flower" | "leaf"
}

// Memoized petal component for better performance
const Petal = memo(function Petal({
  className = "",
  color = "#edc3bf",
  size = "w-8 h-8",
  delay = 0,
  duration = 10,
  type = "petal",
}: PetalProps) {
  const petalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!petalRef.current) return

    // Random starting position
    const startX = Math.random() * 100 - 50
    const startRotation = Math.random() * 360
    const startScale = 0.5 + Math.random() * 0.5

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
          x: startX + (Math.random() * 200 - 100),
          rotation: startRotation + Math.random() * 360,
          duration: duration,
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
        duration - 2,
      )

    return () => {
      tl.kill()
    }
  }, [delay, duration])

  const renderSvg = () => {
    switch (type) {
      case "petal":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
          </svg>
        )
      case "rose":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 30C50 30 45 20 50 15C55 20 50 30 50 30Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
            <path
              d="M50 30C50 30 60 25 65 30C60 35 50 30 50 30Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
            <path
              d="M50 30C50 30 55 40 50 45C45 40 50 30 50 30Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
            <path
              d="M50 30C50 30 40 25 35 30C40 35 50 30 50 30Z"
              fill={color}
              fillOpacity="0.6"
              stroke={color}
              strokeWidth="1"
            />
          </svg>
        )
      case "flower":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <div ref={petalRef} className={`absolute ${size} ${className}`}>
      {renderSvg()}
    </div>
  )
})

interface FlowerPetalsProps {
  count?: number
  side?: "left" | "right" | "both"
  types?: Array<"petal" | "rose" | "flower" | "leaf">
}

export default function FlowerPetals({
  count = 10,
  side = "both",
  types = ["petal", "rose", "flower", "leaf"],
}: FlowerPetalsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const petalsRef = useRef<HTMLDivElement[]>([])

  // Handle mouse movement for parallax effect
  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = throttle((e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2 // -1 to 1
      const y = (clientY / window.innerHeight - 0.5) * 2 // -1 to 1

      petalsRef.current.forEach((petal, index) => {
        if (!petal) return

        // Different depths for different petals
        const depth = 0.05 + (index % 5) * 0.02

        gsap.to(petal, {
          x: `+=${x * 30 * depth}`,
          y: `+=${y * 20 * depth}`,
          rotation: `+=${x * 5}`,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        })
      })
    }, 50)

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Generate petals
  const petals = []
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const size = `w-${Math.floor(6 + Math.random() * 10)} h-${Math.floor(6 + Math.random() * 10)}`
    const delay = Math.random() * 10
    const duration = 15 + Math.random() * 20
    const color = ["#edc3bf", "#e8c4c4", "#d4b08c", "#d4af37"][Math.floor(Math.random() * 4)]

    // Determine position based on side
    let position = ""
    if (side === "left" || (side === "both" && i % 2 === 0)) {
      position = `left-${Math.floor(Math.random() * 20)}`
    } else {
      position = `right-${Math.floor(Math.random() * 20)}`
    }

    petals.push(
      <Petal
        key={i}
        ref={(el) => {
          if (el) petalsRef.current[i] = el
        }}
        type={type}
        size={size}
        delay={delay}
        duration={duration}
        color={color}
        className={position}
      />,
    )
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {petals}
    </div>
  )
}
