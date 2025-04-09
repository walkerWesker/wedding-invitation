"use client"

import { useRef, useEffect, memo } from "react"
import { gsap } from "gsap"
import { throttle } from "@/lib/utils"

interface DecorativeFlowerProps {
  position: string
  size: string
  type: "rose" | "flower" | "petals" | "rings"
  color?: string
  depth?: number
  rotation?: number
}

const DecorativeFlower = memo(function DecorativeFlower({
  position,
  size,
  type,
  color = "#edc3bf",
  depth = 0.1,
  rotation = 0,
}: DecorativeFlowerProps) {
  const flowerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!flowerRef.current) return

    // Set initial rotation
    gsap.set(flowerRef.current, {
      rotation: rotation,
    })

    // Create subtle animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    tl.to(flowerRef.current, {
      rotation: rotation + (Math.random() * 10 - 5),
      scale: 1.05,
      duration: 3 + Math.random() * 2,
      ease: "sine.inOut",
    })

    return () => {
      tl.kill()
    }
  }, [rotation])

  const renderSvg = () => {
    switch (type) {
      case "rose":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="draw-path"
              d="M50 30C50 30 40 20 50 10C60 20 50 30 50 30Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M50 30C50 30 60 20 70 30C60 40 50 30 50 30Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M50 30C50 30 60 40 50 50C40 40 50 30 50 30Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M50 30C50 30 40 20 30 30C40 40 50 30 50 30Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M50 50V80"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M40 60H60"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "flower":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="draw-path"
              d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle className="appear-element" cx="50" cy="40" r="5" fill={color} opacity="0" />
          </svg>
        )
      case "petals":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="draw-path"
              d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M50 10C50 10 30 30 30 50C30 70 50 90 70 70C90 50 70 30 50 10Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle className="appear-element" cx="50" cy="50" r="5" fill={color} opacity="0" />
          </svg>
        )
      case "rings":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="draw-path" cx="40" cy="50" r="15" stroke={color} strokeWidth="1.5" />
            <circle className="draw-path" cx="60" cy="50" r="15" stroke={color} strokeWidth="1.5" />
            <path
              className="draw-path"
              d="M40 35V40"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M40 60V65"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M60 35V40"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="draw-path"
              d="M60 60V65"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={flowerRef}
      className={`absolute ${position} ${size} svg-element`}
      data-parallax={depth}
      style={{ zIndex: -1 }}
    >
      {renderSvg()}
    </div>
  )
})

export default function DecorativeFlowers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const flowersRef = useRef<HTMLDivElement[]>([])

  // Handle mouse movement for parallax effect
  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = throttle((e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2 // -1 to 1
      const y = (clientY / window.innerHeight - 0.5) * 2 // -1 to 1

      flowersRef.current.forEach((flower) => {
        if (!flower) return

        const depth = Number.parseFloat(flower.dataset.parallax || "0.1")

        gsap.to(flower, {
          x: x * 50 * depth,
          y: y * 30 * depth,
          rotation: `+=${x * depth * 5}`,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        })
      })
    }, 50)

    window.addEventListener("mousemove", handleMouseMove)

    // Initialize SVG animations
    const svgElements = containerRef.current.querySelectorAll(".svg-element")

    svgElements.forEach((element) => {
      const paths = element.querySelectorAll(".draw-path")

      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: Math.random(),
          ease: "power2.inOut",
        })
      })

      const appearElements = element.querySelectorAll(".appear-element")

      gsap.to(appearElements, {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        delay: 1.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Left side flowers */}
      <DecorativeFlower
        ref={(el) => {
          if (el) flowersRef.current.push(el)
        }}
        position="top-20 left-10"
        size="w-32 h-32"
        type="flower"
        color="#edc3bf"
        depth={0.2}
        rotation={-15}
      />
      <DecorativeFlower
        ref={(el) => {
          if (el) flowersRef.current.push(el)
        }}
        position="top-1/3 left-5"
        size="w-24 h-24"
        type="rose"
        color="#d4b08c"
        depth={0.15}
        rotation={10}
      />
      <DecorativeFlower
        ref={(el) => {
          if (el) flowersRef.current.push(el)
        }}
        position="bottom-1/4 left-10"
        size="w-40 h-40"
        type="petals"
        color="#e8c4c4"
        depth={0.25}
        rotation={20}
      />

      {/* Right side flowers */}
      <DecorativeFlower
        ref={(el) => {
          if (el) flowersRef.current.push(el)
        }}
        position="top-40 right-10"
        size="w-36 h-36"
        type="petals"
        color="#d4af37"
        depth={0.2}
        rotation={15}
      />
      <DecorativeFlower
        ref={(el) => {
          if (el) flowersRef.current.push(el)
        }}
        position="top-2/3 right-5"
        size="w-28 h-28"
        type="flower"
        color="#edc3bf"
        depth={0.15}
        rotation={-10}
      />
      <DecorativeFlower
        ref={(el) => {
          if (el) flowersRef.current.push(el)
        }}
        position="bottom-20 right-20"
        size="w-32 h-32"
        type="rose"
        color="#d4b08c"
        depth={0.25}
        rotation={-20}
      />

      {/* Center decorative elements */}
      <DecorativeFlower
        ref={(el) => {
          if (el) flowersRef.current.push(el)
        }}
        position="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        size="w-48 h-48"
        type="rings"
        color="#d4af37"
        depth={0.1}
        rotation={0}
      />
    </div>
  )
}
