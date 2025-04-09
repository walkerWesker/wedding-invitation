"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface ParallaxContainerProps {
  children: React.ReactNode
}

export default function ParallaxContainer({ children }: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize parallax effect
    const decorElements = document.querySelectorAll(".decor-element")
    const ornamentalElements = document.querySelectorAll(".ornamental-svg")
    const envelopeElement = document.querySelector(".envelope-container")

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      // Parallax for decorative elements with improved depth effect
      decorElements.forEach((element) => {
        const depth = Number.parseFloat((element as HTMLElement).dataset.depth || "0.1")
        const moveX = (x - 0.5) * depth * 120
        const moveY = (y - 0.5) * depth * 120
        const rotateZ = (x - 0.5) * depth * 10

        gsap.to(element, {
          x: moveX,
          y: moveY,
          rotation: rotateZ,
          duration: 1.2,
          ease: "power2.out",
        })
      })

      // Parallax for ornamental elements with more subtle movement
      ornamentalElements.forEach((element) => {
        const moveX = (x - 0.5) * 30
        const moveY = (y - 0.5) * 30
        const rotateZ = (x - 0.5) * 3

        gsap.to(element, {
          x: moveX,
          y: moveY,
          rotation: rotateZ,
          duration: 1.8,
          ease: "power2.out",
        })
      })

      // Enhanced 3D parallax for envelope
      if (envelopeElement) {
        gsap.to(envelopeElement, {
          x: (x - 0.5) * 30,
          y: (y - 0.5) * 30,
          rotationY: (x - 0.5) * 8,
          rotationX: (y - 0.5) * -8,
          duration: 1.2,
          ease: "power2.out",
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
    </div>
  )
}
