"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { DecorElement } from "@/components/ui/decor-element"
import { OrnamentalSvg } from "@/components/ui/ornamental-svg"

interface DecorativeElementsProps {
  isOpen: boolean
}

export default function DecorativeElements({ isOpen }: DecorativeElementsProps) {
  const decorRef = useRef<HTMLDivElement>(null)
  const ornamentalRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)

  // Initial animation for decorative elements
  useEffect(() => {
    if (!decorRef.current) return

    const elements = decorRef.current.querySelectorAll(".decor-svg")

    gsap.fromTo(
      elements,
      {
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 0.7,
        stagger: 0.1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      },
    )

    // Animate SVG paths
    const paths = decorRef.current.querySelectorAll(".decor-svg path")

    paths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      })
    })

    // Create continuous floating animation for background elements
    if (floatingElementsRef.current) {
      const floatingElements = floatingElementsRef.current.querySelectorAll(".floating-element")

      floatingElements.forEach((element) => {
        // Random values for more natural movement
        const randomX = Math.random() * 20 - 10
        const randomY = Math.random() * 20 - 10
        const randomDuration = 3 + Math.random() * 4
        const randomDelay = Math.random() * 2

        gsap.to(element, {
          x: randomX,
          y: randomY,
          rotation: randomX / 2,
          duration: randomDuration,
          delay: randomDelay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }
  }, [])

  // Animation for ornamental elements when envelope opens
  useEffect(() => {
    if (!ornamentalRef.current) return

    if (isOpen) {
      // Get all ornamental SVG elements
      const ornamentalElements = ornamentalRef.current.querySelectorAll(".ornamental-svg")

      // Fade in ornamental elements with more dramatic animation
      gsap.fromTo(
        ornamentalElements,
        {
          scale: 0,
          opacity: 0,
          rotation: -5,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.1,
          duration: 1.2,
          delay: 0.8,
          ease: "back.out(1.7)",
        },
      )

      // Animate SVG paths with drawing effect
      const paths = ornamentalRef.current.querySelectorAll(".ornamental-svg path")

      paths.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 100

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 1,
          ease: "power2.inOut",
        })
      })

      // Animate circles with scale and opacity
      const circles = ornamentalRef.current.querySelectorAll(".ornamental-svg circle")

      gsap.fromTo(
        circles,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          delay: 1.2,
          ease: "back.out(2)",
        },
      )

      // Create a shower of confetti/petals when envelope opens
      if (floatingElementsRef.current) {
        const confettiElements = Array.from({ length: 50 }).map(() => {
          const element = document.createElement("div")
          element.className = "absolute w-2 h-2 rounded-full confetti-element"
          element.style.backgroundColor = ["#d4b08c", "#e8c4c4", "#d4af37", "#f5efe7"][Math.floor(Math.random() * 4)]
          element.style.left = `${Math.random() * 100}%`
          element.style.top = "0"
          element.style.opacity = "0"
          floatingElementsRef.current?.appendChild(element)
          return element
        })

        confettiElements.forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: -20,
              x: 0,
              opacity: 0,
              scale: 0,
            },
            {
              y: window.innerHeight,
              x: ((Math.random() - 0.5) * window.innerWidth) / 2,
              opacity: 0.8,
              scale: 0.5 + Math.random(),
              duration: 3 + Math.random() * 3,
              delay: 1 + Math.random() * 0.5,
              ease: "power1.out",
              onComplete: () => {
                if (floatingElementsRef.current && floatingElementsRef.current.contains(element)) {
                  floatingElementsRef.current.removeChild(element)
                }
              },
            },
          )
        })
      }
    } else {
      // Hide ornamental elements when envelope closes
      const ornamentalElements = ornamentalRef.current.querySelectorAll(".ornamental-svg")

      gsap.to(ornamentalElements, {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      })
    }
  }, [isOpen])

  return (
    <>
      {/* Background decorative elements (always visible) */}
      <div ref={decorRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <DecorElement type="flower" position="top-10 left-10" size="w-32 h-32" depth="0.2" />
        <DecorElement type="rings" position="top-20 right-20" size="w-40 h-40" depth="0.3" />
        <DecorElement type="lines" position="bottom-20 left-20" size="w-40 h-40" depth="0.15" />
        <DecorElement type="butterfly" position="bottom-10 right-10" size="w-32 h-32" depth="0.25" />
        <DecorElement
          type="flower2"
          position="top-1/2 right-10 transform -translate-y-1/2"
          size="w-24 h-24"
          depth="0.1"
        />
        <DecorElement type="dots" position="top-1/2 left-10 transform -translate-y-1/2" size="w-24 h-24" depth="0.2" />
      </div>

      {/* Floating background elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-30 floating-element">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="10" fill="#d4af37" fillOpacity="0.5" />
          </svg>
        </div>

        <div className="absolute top-1/3 right-1/3 w-6 h-6 opacity-30 floating-element">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="40" height="40" fill="#d4b08c" fillOpacity="0.5" />
          </svg>
        </div>

        <div className="absolute bottom-1/4 right-1/4 w-10 h-10 opacity-30 floating-element">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30,50 L50,30 L70,50 L50,70 Z" fill="#e8c4c4" fillOpacity="0.5" />
          </svg>
        </div>

        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 opacity-30 floating-element">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,20 L80,80 L20,80 Z" fill="#d4af37" fillOpacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Ornamental elements that appear when envelope opens */}
      <div ref={ornamentalRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <OrnamentalSvg type="floral-corner" position="top-0 left-0" size="w-64 h-64" />
        <OrnamentalSvg type="floral-corner" position="top-0 right-0" size="w-64 h-64" className="rotate-90" />
        <OrnamentalSvg type="floral-corner" position="bottom-0 right-0" size="w-64 h-64" className="rotate-180" />
        <OrnamentalSvg type="floral-corner" position="bottom-0 left-0" size="w-64 h-64" className="rotate-270" />
        <OrnamentalSvg type="sparkle" position="top-1/4 left-1/4" size="w-16 h-16" />
        <OrnamentalSvg type="sparkle" position="top-1/3 right-1/3" size="w-12 h-12" />
        <OrnamentalSvg type="sparkle" position="bottom-1/4 right-1/4" size="w-16 h-16" />
        <OrnamentalSvg type="sparkle" position="bottom-1/3 left-1/3" size="w-12 h-12" />
        <OrnamentalSvg
          type="rings-ornament"
          position="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          size="w-96 h-96"
        />
        <OrnamentalSvg type="fine-line" position="top-20 left-1/2 transform -translate-x-1/2" size="w-64 h-2" />
        <OrnamentalSvg type="fine-line" position="bottom-20 left-1/2 transform -translate-x-1/2" size="w-64 h-2" />

        {/* Additional ornamental elements */}
        <OrnamentalSvg type="heart-ornament" position="top-1/3 left-1/2 transform -translate-x-1/2" size="w-32 h-32" />
        <OrnamentalSvg
          type="floral-divider"
          position="bottom-1/3 left-1/2 transform -translate-x-1/2"
          size="w-80 h-16"
        />
      </div>
    </>
  )
}
