"use client"

import { useRef, useEffect, memo } from "react"
import { gsap } from "gsap"
import { throttle } from "@/lib/utils"
import { useWindowSize } from "@/hooks/use-window-size"

interface DecorativeElementProps {
  type: "fine-line" | "minimalist-flower" | "rose" | "petal" | "sparkle" | "rings" | "ornamental-swirl"
  position: string
  size: string
  color?: string
  rotation?: number
  depth?: number
  delay?: number
}

const DecorativeElement = memo(function DecorativeElement({
  type,
  position,
  size,
  color = "#edc3bf",
  rotation = 0,
  depth = 0.1,
  delay = 0,
}: DecorativeElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  useEffect(() => {
    if (!elementRef.current) return

    // Adjust scale based on screen size
    const scale = width < 640 ? 0.7 : width < 768 ? 0.8 : width < 1024 ? 0.9 : 1

    // Set initial rotation and scale
    gsap.set(elementRef.current, {
      rotation: rotation,
      opacity: 0,
      scale: scale * 0.8,
    })

    // Create animation timeline
    const tl = gsap.timeline({ delay: delay })

    // Fade in animation
    tl.to(elementRef.current, {
      opacity: 1,
      scale: scale,
      duration: 1,
      ease: "power2.out",
    })

    // Get all paths for drawing animation
    const paths = elementRef.current.querySelectorAll("path")
    paths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
        },
        "-=1.5",
      )
    })

    // Get all circles for appear animation
    const circles = elementRef.current.querySelectorAll("circle")
    circles.forEach((circle) => {
      gsap.set(circle, {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
      })

      tl.to(
        circle,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )
    })

    // Create subtle continuous animation
    gsap.to(elementRef.current, {
      y: "random(-10, 10)",
      x: "random(-10, 10)",
      rotation: rotation + "random(-5, 5)",
      duration: "random(4, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      gsap.killTweensOf(elementRef.current)
      gsap.killTweensOf(paths)
      gsap.killTweensOf(circles)
    }
  }, [delay, rotation, width])

  const renderSvg = () => {
    switch (type) {
      case "fine-line":
        return (
          <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M10 10H190" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
            <circle cx="10" cy="10" r="2" fill={color} />
            <circle cx="100" cy="10" r="2" fill={color} />
            <circle cx="190" cy="10" r="2" fill={color} />
            <path d="M40 5C40 5 50 10 60 10C70 10 80 5 80 5" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
            <path
              d="M40 15C40 15 50 10 60 10C70 10 80 15 80 15"
              stroke={color}
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <path
              d="M120 5C120 5 130 10 140 10C150 10 160 5 160 5"
              stroke={color}
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <path
              d="M120 15C120 15 130 10 140 10C150 10 160 15 160 15"
              stroke={color}
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        )
      case "minimalist-flower":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="50" cy="40" r="3" fill={color} />
          </svg>
        )
      case "rose":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 30C50 30 45 20 50 15C55 20 50 30 50 30Z"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M50 30C50 30 60 25 65 30C60 35 50 30 50 30Z"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M50 30C50 30 55 40 50 45C45 40 50 30 50 30Z"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M50 30C50 30 40 25 35 30C40 35 50 30 50 30Z"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M50 45V70" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45 55H55" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "petal":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M40 40C40 40 50 50 60 40"
              stroke={color}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "sparkle":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 20L53 40L73 43L53 46L50 66L47 46L27 43L47 40L50 20Z"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="50" cy="43" r="3" fill={color} />
          </svg>
        )
      case "rings":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="40" cy="50" r="15" stroke={color} strokeWidth="1.2" fill="none" />
            <circle cx="60" cy="50" r="15" stroke={color} strokeWidth="1.2" fill="none" />
            <path d="M40 35V40" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 60V65" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 35V40" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 60V65" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "ornamental-swirl":
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M20 50C20 50 30 20 50 20C70 20 80 50 80 50"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M20 50C20 50 30 80 50 80C70 80 80 50 80 50"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
              stroke={color}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 80C50 80 40 70 50 60C60 70 50 80 50 80Z"
              stroke={color}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="50" r="2" fill={color} />
            <circle cx="80" cy="50" r="2" fill={color} />
          </svg>
        )
      default:
        return null
    }
  }

  // Calculate responsive size based on screen width
  const getResponsiveSize = () => {
    if (width < 640) {
      // For mobile screens, reduce size
      return size
        .replace(/w-(\d+)/, (_, num) => `w-${Math.max(Math.floor(Number.parseInt(num) * 0.7), 12)}`)
        .replace(/h-(\d+)/, (_, num) => `h-${Math.max(Math.floor(Number.parseInt(num) * 0.7), 12)}`)
    }
    return size
  }

  return (
    <div
      ref={elementRef}
      className={`absolute ${position} ${getResponsiveSize()} pointer-events-none transition-transform duration-300`}
      style={{ zIndex: -1 }}
      data-parallax={depth}
    >
      {renderSvg()}
    </div>
  )
})

export default function ElegantDecorations() {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])
  const { width } = useWindowSize()

  // Handle mouse movement for parallax effect
  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = throttle((e: MouseEvent) => {
      const { clientX, clientY } = e

      // Adjust parallax intensity based on screen size
      const intensityFactor = width < 640 ? 0.5 : width < 768 ? 0.7 : width < 1024 ? 0.8 : 1

      const x = (clientX / window.innerWidth - 0.5) * 2 * intensityFactor // -1 to 1
      const y = (clientY / window.innerHeight - 0.5) * 2 * intensityFactor // -1 to 1

      // Get all elements with data-parallax attribute
      const parallaxElements = document.querySelectorAll("[data-parallax]")

      parallaxElements.forEach((element) => {
        if (!element) return

        const depth = Number.parseFloat((element as HTMLElement).dataset.parallax || "0.1")

        gsap.to(element, {
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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [width])

  // Adjust decoration positions and sizes based on screen width
  const getDecorPositions = () => {
    if (width < 640) {
      // Mobile layout
      return {
        fineLine1: "top-10 left-1/2 transform -translate-x-1/2",
        fineLine2: "bottom-10 left-1/2 transform -translate-x-1/2",
        flower1: "top-20 left-5",
        flower2: "bottom-20 right-5",
        rose1: "top-1/4 left-2",
        rose2: "bottom-1/4 right-2",
        petal1: "top-1/5 right-5",
        petal2: "bottom-1/5 left-5",
        sparkle1: "top-1/3 right-2",
        sparkle2: "bottom-1/3 left-2",
        rings1: "top-1/2 right-1/5",
        rings2: "bottom-1/2 left-1/5",
        swirl1: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        swirl2: "bottom-20 left-1/2 transform -translate-x-1/2",
      }
    } else if (width < 768) {
      // Tablet layout
      return {
        fineLine1: "top-16 left-1/2 transform -translate-x-1/2",
        fineLine2: "bottom-16 left-1/2 transform -translate-x-1/2",
        flower1: "top-32 left-10",
        flower2: "bottom-32 right-10",
        rose1: "top-1/3 left-5",
        rose2: "bottom-1/3 right-5",
        petal1: "top-1/4 right-10",
        petal2: "bottom-1/4 left-10",
        sparkle1: "top-1/2 right-5",
        sparkle2: "bottom-1/2 left-5",
        rings1: "top-2/3 right-1/4",
        rings2: "bottom-2/3 left-1/4",
        swirl1: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        swirl2: "bottom-32 left-1/2 transform -translate-x-1/2",
      }
    } else {
      // Desktop layout
      return {
        fineLine1: "top-20 left-1/2 transform -translate-x-1/2",
        fineLine2: "bottom-20 left-1/2 transform -translate-x-1/2",
        flower1: "top-40 left-20",
        flower2: "bottom-40 right-20",
        rose1: "top-1/3 left-10",
        rose2: "bottom-1/3 right-10",
        petal1: "top-1/4 right-20",
        petal2: "bottom-1/4 left-20",
        sparkle1: "top-1/2 right-10",
        sparkle2: "bottom-1/2 left-10",
        rings1: "top-2/3 right-1/4",
        rings2: "bottom-2/3 left-1/4",
        swirl1: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        swirl2: "bottom-40 left-1/2 transform -translate-x-1/2",
      }
    }
  }

  const positions = getDecorPositions()

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Fine ornamental lines */}
      <DecorativeElement
        type="fine-line"
        position={positions.fineLine1}
        size={width < 640 ? "w-64 h-10" : width < 768 ? "w-80 h-10" : "w-96 h-10"}
        color="#edc3bf"
        depth={0.05}
        delay={0.2}
      />
      <DecorativeElement
        type="fine-line"
        position={positions.fineLine2}
        size={width < 640 ? "w-64 h-10" : width < 768 ? "w-80 h-10" : "w-96 h-10"}
        color="#edc3bf"
        depth={0.05}
        delay={0.4}
      />

      {/* Minimalist flowers */}
      <DecorativeElement
        type="minimalist-flower"
        position={positions.flower1}
        size={width < 640 ? "w-20 h-20" : width < 768 ? "w-24 h-24" : "w-32 h-32"}
        color="#edc3bf"
        rotation={-15}
        depth={0.2}
        delay={0.6}
      />
      <DecorativeElement
        type="minimalist-flower"
        position={positions.flower2}
        size={width < 640 ? "w-20 h-20" : width < 768 ? "w-24 h-24" : "w-32 h-32"}
        color="#edc3bf"
        rotation={15}
        depth={0.2}
        delay={0.8}
      />

      {/* Roses */}
      <DecorativeElement
        type="rose"
        position={positions.rose1}
        size={width < 640 ? "w-16 h-16" : width < 768 ? "w-20 h-20" : "w-24 h-24"}
        color="#d4b08c"
        rotation={10}
        depth={0.15}
        delay={1.0}
      />
      <DecorativeElement
        type="rose"
        position={positions.rose2}
        size={width < 640 ? "w-16 h-16" : width < 768 ? "w-20 h-20" : "w-24 h-24"}
        color="#d4b08c"
        rotation={-10}
        depth={0.15}
        delay={1.2}
      />

      {/* Petals */}
      <DecorativeElement
        type="petal"
        position={positions.petal1}
        size={width < 640 ? "w-20 h-20" : width < 768 ? "w-24 h-24" : "w-28 h-28"}
        color="#e8c4c4"
        rotation={20}
        depth={0.25}
        delay={1.4}
      />
      <DecorativeElement
        type="petal"
        position={positions.petal2}
        size={width < 640 ? "w-20 h-20" : width < 768 ? "w-24 h-24" : "w-28 h-28"}
        color="#e8c4c4"
        rotation={-20}
        depth={0.25}
        delay={1.6}
      />

      {/* Sparkles */}
      <DecorativeElement
        type="sparkle"
        position={positions.sparkle1}
        size={width < 640 ? "w-14 h-14" : width < 768 ? "w-16 h-16" : "w-20 h-20"}
        color="#d4af37"
        rotation={0}
        depth={0.3}
        delay={1.8}
      />
      <DecorativeElement
        type="sparkle"
        position={positions.sparkle2}
        size={width < 640 ? "w-14 h-14" : width < 768 ? "w-16 h-16" : "w-20 h-20"}
        color="#d4af37"
        rotation={0}
        depth={0.3}
        delay={2.0}
      />

      {/* Rings */}
      <DecorativeElement
        type="rings"
        position={positions.rings1}
        size={width < 640 ? "w-24 h-24" : width < 768 ? "w-28 h-28" : "w-36 h-36"}
        color="#d4af37"
        rotation={0}
        depth={0.1}
        delay={2.2}
      />
      <DecorativeElement
        type="rings"
        position={positions.rings2}
        size={width < 640 ? "w-24 h-24" : width < 768 ? "w-28 h-28" : "w-36 h-36"}
        color="#d4af37"
        rotation={0}
        depth={0.1}
        delay={2.4}
      />

      {/* Ornamental swirls */}
      <DecorativeElement
        type="ornamental-swirl"
        position={positions.swirl1}
        size={width < 640 ? "w-40 h-40" : width < 768 ? "w-48 h-48" : "w-64 h-64"}
        color="#edc3bf"
        rotation={0}
        depth={0.05}
        delay={2.6}
      />
      <DecorativeElement
        type="ornamental-swirl"
        position={positions.swirl2}
        size={width < 640 ? "w-32 h-32" : width < 768 ? "w-40 h-40" : "w-48 h-48"}
        color="#d4b08c"
        rotation={180}
        depth={0.05}
        delay={2.8}
      />
    </div>
  )
}
