"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useWindowSize } from "@/hooks/use-window-size"

interface EnvelopeProps {
  isOpen: boolean
  toggleEnvelope: () => void
}

export default function Envelope({ isOpen, toggleEnvelope }: EnvelopeProps) {
  const envelopeRef = useRef<HTMLDivElement>(null)
  const leftSideRef = useRef<HTMLDivElement>(null)
  const rightSideRef = useRef<HTMLDivElement>(null)
  const topFlapRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const { width } = useWindowSize()

  useEffect(() => {
    if (
      !envelopeRef.current ||
      !leftSideRef.current ||
      !rightSideRef.current ||
      !topFlapRef.current ||
      !contentRef.current
    )
      return

    timeline.current = gsap.timeline({ paused: true })

    // Setup the envelope animation - more dramatic opening
    timeline.current
      // First animate the top flap
      .to(topFlapRef.current, {
        rotateX: -180,
        duration: 1,
        ease: "power3.inOut",
        transformOrigin: "top center",
      })
      // Then animate the sides
      .to(
        [leftSideRef.current, rightSideRef.current],
        {
          scaleX: 0,
          duration: 1.2,
          ease: "power4.inOut",
          transformOrigin: "center center",
          stagger: 0.1,
        },
        "-=0.5",
      )
      // Fade out the content
      .to(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in",
        },
        0,
      )
      // Move the envelope away
      .to(
        envelopeRef.current,
        {
          scale: 0.9,
          y: "-100vh",
          opacity: 0,
          duration: 1.2,
          ease: "power3.inOut",
          onComplete: () => {
            if (envelopeRef.current) {
              envelopeRef.current.style.pointerEvents = "none"
            }
          },
        },
        1,
      )

    return () => {
      timeline.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (timeline.current) {
      if (isOpen) {
        timeline.current.play()
      } else {
        // Reset envelope position and visibility
        if (envelopeRef.current) {
          gsap.to(envelopeRef.current, {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            onStart: () => {
              if (envelopeRef.current) {
                envelopeRef.current.style.pointerEvents = "auto"
              }
            },
          })
        }

        // Reset sides
        if (leftSideRef.current && rightSideRef.current) {
          gsap.to([leftSideRef.current, rightSideRef.current], {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
          })
        }

        // Reset top flap
        if (topFlapRef.current) {
          gsap.to(topFlapRef.current, {
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
          })
        }

        // Reset content
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        timeline.current.pause(0)
      }
    }
  }, [isOpen])

  // Calculate responsive dimensions
  const getEnvelopeWidth = () => {
    return width < 640
      ? "w-full max-w-xs"
      : width < 768
        ? "w-full max-w-sm"
        : width < 1024
          ? "w-full max-w-md"
          : "w-full max-w-4xl"
  }

  return (
    <div
      ref={envelopeRef}
      className={`cursor-pointer perspective-1000 ${getEnvelopeWidth()} mx-auto envelope-container transition-all duration-300`}
      onClick={toggleEnvelope}
    >
      <div className="relative transform-style-3d transition-transform duration-500 ease-out w-full aspect-[16/9]">
        {/* Top flap of envelope */}
        <div
          ref={topFlapRef}
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-rose to-tertiary rounded-t-2xl z-30 transform-style-3d backface-hidden"
          style={{
            transformOrigin: "top center",
            boxShadow: "0 -5px 15px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-t-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="#d4af37" />
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#pattern-circles)" />
              </svg>
            </div>
          </div>

          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="50" cy="50" r="40" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 2" />
              <path
                d="M50 20C50 20 65 35 65 50C65 65 50 80 35 65C20 50 35 35 50 20Z"
                stroke="#d4af37"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M50 20C50 20 35 35 35 50C35 65 50 80 65 65C80 50 65 35 50 20Z"
                stroke="#d4af37"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Envelope content (visible when closed) */}
        <div
          ref={contentRef}
          className="absolute inset-0 bg-gradient-to-br from-tertiary to-card rounded-2xl shadow-2xl flex flex-col items-center justify-center z-10"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="relative z-10 text-center px-4 sm:px-6">
            <div className="w-24 sm:w-28 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 sm:mb-8 opacity-80"></div>

            <div className="relative">
              <div className="absolute -top-6 -left-6 -right-6 -bottom-6 bg-white/30 rounded-full blur-md"></div>
              <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#5e4b3a] text-center font-semibold mb-3 sm:mb-4 relative">
                <span className="relative inline-block animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-[#5e4b3a] via-[#7d6a5b] to-[#5e4b3a] bg-size-200">
                  Jessica & Pablo
                </span>
              </h1>
            </div>

            <div className="relative inline-block">
              <p className="font-['Poppins'] text-[#5e4b3a] text-center text-base sm:text-lg md:text-xl font-medium relative z-10">
                Nos casamos
              </p>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
            </div>

            <p className="font-['Poppins'] text-foreground text-center text-xs sm:text-sm md:text-base mt-3 sm:mt-4">
              Sábado 02 de agosto del 2025
            </p>

            <div className="w-24 sm:w-28 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6 sm:mt-8 opacity-80"></div>
          </div>

          <div className="absolute top-6 left-6 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 opacity-30">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M50 10C50 10 60 30 80 30C80 30 60 40 60 60C60 60 40 50 20 60C20 60 30 40 20 20C20 20 40 30 50 10Z"
                stroke="#d4af37"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="absolute bottom-6 right-6 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 opacity-30">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M50 10C50 10 60 30 80 30C80 30 60 40 60 60C60 60 40 50 20 60C20 60 30 40 20 20C20 20 40 30 50 10Z"
                stroke="#d4af37"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Wax seal */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16">
            <div className="w-full h-full rounded-full bg-rose flex items-center justify-center shadow-md">
              <div className="w-9 sm:w-10 md:w-12 h-9 sm:h-10 md:h-12 rounded-full border-2 border-gold flex items-center justify-center">
                <span className="font-['Cormorant_Garamond'] text-xl sm:text-2xl text-gold">J&P</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-[#5e4b3a] font-['Poppins'] text-xs sm:text-sm opacity-70 animate-pulse">
              Toca para abrir
            </p>
          </div>
        </div>

        {/* Left side of envelope */}
        <div
          ref={leftSideRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-tertiary to-card rounded-l-2xl shadow-md z-20"
          style={{
            transformOrigin: "right center",
            boxShadow: "-5px 0 15px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-l-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <pattern id="pattern-diamonds" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="#d4af37" />
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#pattern-diamonds)" fillOpacity="0.2" />
              </svg>
            </div>
          </div>

          <div className="absolute top-1/4 left-1/4 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 opacity-40">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="50" cy="50" r="30" stroke="#d4af37" strokeWidth="2" />
            </svg>
          </div>

          <div className="absolute bottom-1/4 left-1/3 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 opacity-40">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M20 20L80 80" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 80L80 20" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Right side of envelope */}
        <div
          ref={rightSideRef}
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-tertiary to-card rounded-r-2xl shadow-md z-20"
          style={{
            transformOrigin: "left center",
            boxShadow: "5px 0 15px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-r-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <pattern id="pattern-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="#d4af37" />
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#pattern-dots)" />
              </svg>
            </div>
          </div>

          <div className="absolute top-1/3 right-1/4 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 opacity-40">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M50 20C50 20 65 35 65 50C65 65 50 80 35 65C20 50 35 35 50 20Z"
                stroke="#d4af37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="absolute bottom-1/4 right-1/3 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 opacity-40">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="30" cy="30" r="3" fill="#d4af37" />
              <circle cx="50" cy="50" r="3" fill="#d4af37" />
              <circle cx="70" cy="70" r="3" fill="#d4af37" />
              <circle cx="30" cy="70" r="3" fill="#d4af37" />
              <circle cx="70" cy="30" r="3" fill="#d4af37" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
