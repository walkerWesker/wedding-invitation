"use client"

import { useCallback } from "react"

import { useRef, useEffect, useState, memo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { throttle } from "@/lib/utils"

// Memoized decorative SVG components
const FlowerSvg = memo(function FlowerSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        className="draw-path"
        d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="appear-element" cx="50" cy="40" r="3" fill="#edc3bf" opacity="0" />
    </svg>
  )
})

const RoseSvg = memo(function RoseSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        className="draw-path"
        d="M50 30C50 30 45 20 50 15C55 20 50 30 50 30Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M50 30C50 30 60 25 65 30C60 35 50 30 50 30Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M50 30C50 30 55 40 50 45C45 40 50 30 50 30Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M50 30C50 30 40 25 35 30C40 35 50 30 50 30Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M50 45V70"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M45 55L55 55"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

const RingsSvg = memo(function RingsSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle className="draw-path" cx="40" cy="50" r="15" stroke="#d4af37" strokeWidth="1.5" />
      <circle className="draw-path" cx="60" cy="50" r="15" stroke="#d4af37" strokeWidth="1.5" />
    </svg>
  )
})

const SparklesSvg = memo(function SparklesSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        className="draw-path"
        d="M50 20L53 40L73 43L53 46L50 66L47 46L27 43L47 40L50 20Z"
        stroke="#d4af37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="appear-element" cx="50" cy="43" r="3" fill="#d4af37" opacity="0" />
    </svg>
  )
})

const OrnamentalLineSvg = memo(function OrnamentalLineSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path className="draw-path" d="M10 10H190" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
      <path
        className="draw-path"
        d="M30 5C30 5 35 10 40 10C45 10 50 5 50 5"
        stroke="#edc3bf"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M30 15C30 15 35 10 40 10C45 10 50 15 50 15"
        stroke="#edc3bf"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M150 5C150 5 155 10 160 10C165 10 170 5 170 5"
        stroke="#edc3bf"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M150 15C150 15 155 10 160 10C165 10 170 15 170 15"
        stroke="#edc3bf"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle className="appear-element" cx="100" cy="10" r="3" fill="#edc3bf" opacity="0" />
      <circle className="appear-element" cx="10" cy="10" r="2" fill="#edc3bf" opacity="0" />
      <circle className="appear-element" cx="190" cy="10" r="2" fill="#edc3bf" opacity="0" />
    </svg>
  )
})

// Memoized content sections
const DressCodeSection = memo(function DressCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Fix z-index issues for decorative elements
  // Add z-index: -1 to all decorative elements to ensure they stay behind content
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return

    const section = sectionRef.current
    const decorElements = decorRef.current.querySelectorAll(".draw-path")
    const appearElements = decorRef.current.querySelectorAll(".appear-element")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the section
    tl.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)

    // Animate the decorative elements
    decorElements.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.3,
      )
    })

    // Animate the appear elements
    tl.to(
      appearElements,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      1,
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="mb-12 relative overflow-hidden">
      {/* Change this in the return statement for all decorative elements
      Add z-index: -1 to all decorative containers */}
      <div
        ref={decorRef}
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-10 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <OrnamentalLineSvg className="w-full h-full" />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#edc3bf]/20 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 flex-shrink-0 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full svg-element"
              >
                <path
                  className="draw-path"
                  d="M50 20C50 20 30 30 30 50C30 70 50 80 50 80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className="draw-path"
                  d="M50 20C50 20 70 30 70 50C70 70 50 80 50 80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className="draw-path"
                  d="M30 40H70"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="1 3"
                />
                <path
                  className="draw-path"
                  d="M30 60H70"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="1 3"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-4">
              Código de Vestimenta
            </h3>
            <p className="text-foreground mb-4">
              Para hacer de este día algo especial, te pedimos que nos acompañes con vestimenta formal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-tertiary/30 p-3 rounded-lg">
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-1">Caballeros</h4>
                <p className="text-sm text-foreground">Traje formal o smoking, preferiblemente en tonos oscuros.</p>
              </div>
              <div className="bg-tertiary/30 p-3 rounded-lg">
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-1">Damas</h4>
                <p className="text-sm text-foreground">Vestido largo o cocktail, evitando el color blanco.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const AccommodationSection = memo(function AccommodationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Fix z-index issues for decorative elements
  // Add z-index: -1 to all decorative elements to ensure they stay behind content
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return

    const section = sectionRef.current
    const decorElements = decorRef.current.querySelectorAll(".draw-path")
    const appearElements = decorRef.current.querySelectorAll(".appear-element")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the section
    tl.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)

    // Animate the decorative elements
    decorElements.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.3,
      )
    })

    // Animate the appear elements
    tl.to(
      appearElements,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      1,
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="mb-12 relative overflow-hidden">
      {/* Change this in the return statement for all decorative elements
      Add z-index: -1 to all decorative containers */}
      <div
        ref={decorRef}
        className="absolute -top-10 right-0 w-32 h-32 pointer-events-none transform rotate-45"
        style={{ zIndex: -1 }}
      >
        <FlowerSvg className="w-full h-full" />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#edc3bf]/20 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 flex-shrink-0 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full svg-element"
              >
                <path
                  className="draw-path"
                  d="M20 80V40L50 20L80 40V80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M20 40L50 60L80 40"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M50 60V80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M35 70H65"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-4">Hospedaje</h3>
            <p className="text-foreground mb-4">
              Para nuestros invitados que vienen de fuera, hemos conseguido tarifas especiales en los siguientes
              hoteles:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-tertiary/30 p-4 rounded-lg">
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-1">
                  Hotel Las Palmas
                </h4>
                <p className="text-sm text-foreground mb-2">A 5 minutos del lugar de la ceremonia</p>
                <p className="text-sm text-foreground mb-2">
                  <span className="font-semibold">Dirección:</span> Av. Principal 123, Ciudad Jardín
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Teléfono:</span> (123) 456-7890
                </p>
                <p className="text-sm text-foreground mt-2">
                  <span className="font-semibold">Código de descuento:</span> BODAJP2025
                </p>
              </div>
              <div className="bg-tertiary/30 p-4 rounded-lg">
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-1">
                  Hotel Vista Hermosa
                </h4>
                <p className="text-sm text-foreground mb-2">A 10 minutos del lugar de la ceremonia</p>
                <p className="text-sm text-foreground mb-2">
                  <span className="font-semibold">Dirección:</span> Calle Secundaria 456, Ciudad Jardín
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Teléfono:</span> (123) 456-7891
                </p>
                <p className="text-sm text-foreground mt-2">
                  <span className="font-semibold">Código de descuento:</span> BODAJP2025
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-foreground italic">
                Menciona que vienes a nuestra boda al hacer tu reservación para obtener la tarifa especial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const GiftsSection = memo(function GiftsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Fix z-index issues for decorative elements
  // Add z-index: -1 to all decorative elements to ensure they stay behind content
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return

    const section = sectionRef.current
    const decorElements = decorRef.current.querySelectorAll(".draw-path")
    const appearElements = decorRef.current.querySelectorAll(".appear-element")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the section
    tl.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)

    // Animate the decorative elements
    decorElements.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.3,
      )
    })

    // Animate the appear elements
    tl.to(
      appearElements,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      1,
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="mb-12 relative overflow-hidden">
      {/* Change this in the return statement for all decorative elements
      Add z-index: -1 to all decorative containers */}
      <div
        ref={decorRef}
        className="absolute -top-10 left-0 w-32 h-32 pointer-events-none transform -rotate-15"
        style={{ zIndex: -1 }}
      >
        <RoseSvg className="w-full h-full" />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#edc3bf]/20 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 flex-shrink-0 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full svg-element"
              >
                <rect
                  className="draw-path"
                  x="20"
                  y="30"
                  width="60"
                  height="50"
                  rx="2"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                />
                <path
                  className="draw-path"
                  d="M30 30V20H70V30"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M50 20V80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M20 50H80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M50 20C50 20 45 15 50 10C55 15 50 20 50 20Z"
                  fill="#d4b08c"
                  stroke="#d4b08c"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-4">Mesa de Regalos</h3>
            <p className="text-foreground mb-4">
              Tu presencia es nuestro mejor regalo. Sin embargo, si deseas hacernos un obsequio, hemos registrado
              nuestra mesa de regalos en:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <Button variant="elegant" size="pill" glowEffect={true} className="group w-full">
                <span className="group-hover:mr-1 transition-all duration-300">Liverpool</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button variant="elegant" size="pill" glowEffect={true} className="group w-full">
                <span className="group-hover:mr-1 transition-all duration-300">Amazon</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button variant="elegant" size="pill" glowEffect={true} className="group w-full">
                <span className="group-hover:mr-1 transition-all duration-300">Sobre Digital</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
            <div className="bg-tertiary/30 p-4 rounded-lg">
              <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-2">
                Información Bancaria
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground mb-1">
                    <span className="font-semibold">Banco:</span> Banco Nacional
                  </p>
                  <p className="text-sm text-foreground mb-1">
                    <span className="font-semibold">Titular:</span> Jessica Rodríguez & Pablo Martínez
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Cuenta:</span> 1234 5678 9012 3456
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground mb-1">
                    <span className="font-semibold">CLABE:</span> 012 345 678 901 234 567
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Referencia:</span> BODAJP2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const TransportationSection = memo(function TransportationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Fix z-index issues for decorative elements
  // Add z-index: -1 to all decorative elements to ensure they stay behind content
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return

    const section = sectionRef.current
    const decorElements = decorRef.current.querySelectorAll(".draw-path")
    const appearElements = decorRef.current.querySelectorAll(".appear-element")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the section
    tl.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)

    // Animate the decorative elements
    decorElements.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.3,
      )
    })

    // Animate the appear elements
    tl.to(
      appearElements,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      1,
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="mb-12 relative overflow-hidden">
      {/* Change this in the return statement for all decorative elements
      Add z-index: -1 to all decorative containers */}
      <div
        ref={decorRef}
        className="absolute -top-10 right-10 w-32 h-32 pointer-events-none transform rotate-15"
        style={{ zIndex: -1 }}
      >
        <SparklesSvg className="w-full h-full" />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#edc3bf]/20 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 flex-shrink-0 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full svg-element"
              >
                <path
                  className="draw-path"
                  d="M15 60L20 30C20 30 25 25 50 25C75 25 80 30 80 30L85 60"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  className="draw-path"
                  x="10"
                  y="60"
                  width="80"
                  height="15"
                  rx="2"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                />
                <circle className="draw-path" cx="25" cy="75" r="5" stroke="#d4b08c" strokeWidth="1.5" />
                <circle className="draw-path" cx="75" cy="75" r="5" stroke="#d4b08c" strokeWidth="1.5" />
                <path className="draw-path" d="M35 45H65" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
                <path className="draw-path" d="M20 45H25" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
                <path className="draw-path" d="M75 45H80" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-4">Transporte</h3>
            <p className="text-foreground mb-4">
              Para mayor comodidad de nuestros invitados, hemos organizado transporte desde puntos estratégicos:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-tertiary/30 p-4 rounded-lg">
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-1">
                  Desde Hotel Las Palmas
                </h4>
                <p className="text-sm text-foreground mb-2">
                  <span className="font-semibold">Salida:</span> 14:30 hrs
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Regreso:</span> 01:00 hrs
                </p>
              </div>
              <div className="bg-tertiary/30 p-4 rounded-lg">
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-1">
                  Desde Hotel Vista Hermosa
                </h4>
                <p className="text-sm text-foreground mb-2">
                  <span className="font-semibold">Salida:</span> 14:45 hrs
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Regreso:</span> 01:15 hrs
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-foreground italic">
                Te recomendamos estar 15 minutos antes de la hora de salida. Los autobuses no esperarán a los invitados
                que lleguen tarde.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="gold" size="pill" glowEffect={true} className="group">
                <span className="group-hover:mr-1 transition-all duration-300">Reservar Transporte</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const SpecialConsiderationsSection = memo(function SpecialConsiderationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Fix z-index issues for decorative elements
  // Add z-index: -1 to all decorative elements to ensure they stay behind content
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return

    const section = sectionRef.current
    const decorElements = decorRef.current.querySelectorAll(".draw-path")
    const appearElements = decorRef.current.querySelectorAll(".appear-element")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the section
    tl.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)

    // Animate the decorative elements
    decorElements.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.3,
      )
    })

    // Animate the appear elements
    tl.to(
      appearElements,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      1,
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="mb-12 relative overflow-hidden">
      {/* Change this in the return statement for all decorative elements
      Add z-index: -1 to all decorative containers */}
      <div
        ref={decorRef}
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-10 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <OrnamentalLineSvg className="w-full h-full" />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#edc3bf]/20 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90">
        <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-4 text-center">
          Consideraciones Especiales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-tertiary/30 p-4 rounded-lg">
            <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-2 flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#d4b08c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 16V12" stroke="#d4b08c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8H12.01" stroke="#d4b08c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Clima
            </h4>
            <p className="text-sm text-foreground">
              La ceremonia y recepción serán al aire libre. Te recomendamos traer un abrigo ligero para la noche, ya que
              la temperatura puede descender.
            </p>
          </div>
          <div className="bg-tertiary/30 p-4 rounded-lg">
            <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-2 flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#d4b08c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 16V12" stroke="#d4b08c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8H12.01" stroke="#d4b08c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Fotografías
            </h4>
            <p className="text-sm text-foreground">
              Contaremos con fotógrafos profesionales. Te pedimos que evites usar flash durante la ceremonia y que
              compartas tus fotos con el hashtag #JessicaYPablo2025.
            </p>
          </div>
          <div className="bg-tertiary/30 p-4 rounded-lg">
            <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-2 flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#d4b08c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 16V12" stroke="#d4b08c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8H12.01" stroke="#d4b08c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Niños
            </h4>
            <p className="text-sm text-foreground">
              Amamos a los pequeños, pero para que todos puedan disfrutar de la celebración, hemos decidido que sea un
              evento solo para adultos. Gracias por tu comprensión.
            </p>
          </div>
          <div className="bg-tertiary/30 p-4 rounded-lg">
            <h4 className="font-['Cormorant_Garamond'] text-lg text-[#d4b08c] font-semibold mb-2 flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#d4b08c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 16V12" stroke="#d4b08c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8H12.01" stroke="#d4b08c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Estacionamiento
            </h4>
            <p className="text-sm text-foreground">
              El lugar cuenta con estacionamiento gratuito para nuestros invitados. Te recomendamos llegar con tiempo
              suficiente para encontrar lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default function InfoTabContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const parallaxElementsRef = useRef<HTMLElement[]>([])
  const animationsSetupRef = useRef(false)

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = clientX / window.innerWidth - 0.5
      const y = clientY / window.innerHeight - 0.5
      setMousePosition({ x, y })
    }, 16), // ~60fps
    [],
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || animationsSetupRef.current) return

    animationsSetupRef.current = true

    // Collect all parallax elements for better performance
    if (containerRef.current) {
      parallaxElementsRef.current = Array.from(
        containerRef.current.querySelectorAll("[data-parallax]"),
      ) as HTMLElement[]
    }

    // Add event listener for mouse movement
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
      })
    })

    // Add decorative floating elements
    const floatingElements = containerRef.current.querySelectorAll(".floating-element")

    floatingElements.forEach((element) => {
      gsap.to(element, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [handleMouseMove])

  // Apply parallax effect based on mouse position
  useEffect(() => {
    if (parallaxElementsRef.current.length === 0) return

    parallaxElementsRef.current.forEach((element) => {
      const depth = Number.parseFloat(element.dataset.parallax || "0.1")
      const moveX = mousePosition.x * depth * 50
      const moveY = mousePosition.y * depth * 50
      const rotateZ = mousePosition.x * depth * 10

      // Use transform for better performance
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`
    })
  }, [mousePosition])

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Background decorative elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 opacity-10 floating-element" data-parallax="0.2">
          <RingsSvg className="w-full h-full" />
        </div>

        <div className="absolute bottom-40 right-20 w-32 h-32 opacity-10 floating-element" data-parallax="0.15">
          <FlowerSvg className="w-full h-full" />
        </div>

        <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-10 floating-element" data-parallax="0.25">
          <SparklesSvg className="w-full h-full" />
        </div>

        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 opacity-10 floating-element" data-parallax="0.3">
          <RoseSvg className="w-full h-full" />
        </div>
      </div>

      {/* Title with decorative elements */}
      <div className="relative mb-8 text-center">
        <div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-10 pointer-events-none"
          style={{ zIndex: -1 }}
        >
          <OrnamentalLineSvg className="w-full h-full" />
        </div>

        <h2 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-semibold mb-2 relative inline-block">
          Información Importante
          <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></span>
        </h2>

        <p className="text-foreground mt-4 max-w-2xl mx-auto">
          Aquí encontrarás todos los detalles que necesitas saber para acompañarnos en nuestro día especial. Por favor,
          lee atentamente esta información para que puedas disfrutar al máximo de nuestra celebración.
        </p>
      </div>

      {/* Content sections */}
      <DressCodeSection />
      <AccommodationSection />
      <GiftsSection />
      <TransportationSection />
      <SpecialConsiderationsSection />

      {/* Final decorative element */}
      <div className="text-center relative mt-12">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10"
          data-parallax="0.2"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#d4b08c" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>
        <div className="inline-block relative">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20H70" stroke="#d4b08c" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
            <circle cx="40" cy="20" r="3" fill="#edc3bf" />
            <circle cx="10" cy="20" r="2" fill="#edc3bf" />
            <circle cx="70" cy="20" r="2" fill="#edc3bf" />
          </svg>
        </div>
        <p className="font-['Cormorant_Garamond'] text-xl text-[#d4b08c] mt-4">¡Esperamos verte pronto!</p>
      </div>
    </div>
  )
}
