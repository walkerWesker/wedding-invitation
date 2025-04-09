"use client"

import { useEffect, useRef, useState, useCallback, memo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "@/components/ui/timeline"
import { GalleryGrid } from "@/components/ui/gallery-grid"
import { RsvpForm } from "@/components/ui/rsvp-form"
import InfoTabContent from "@/components/ui/info-tab-content"
import { throttle } from "@/lib/utils"

// Reemplazar el componente WeddingInfoSection con esta versión mejorada
const WeddingInfoSection = memo(function WeddingInfoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const coupleRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Efecto parallax para el título
    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current || !coupleRef.current || !quoteRef.current) return

      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2 // -1 a 1
      const y = (clientY / window.innerHeight - 0.5) * 2 // -1 a 1

      // Movimiento suave del título
      gsap.to(titleRef.current, {
        x: x * 15,
        y: y * 10,
        rotationY: x * 5,
        rotationX: -y * 5,
        duration: 1,
        ease: "power2.out",
      })

      // Movimiento de los nombres
      gsap.to(coupleRef.current.querySelectorAll(".couple-card"), {
        y: y * 8,
        x: (i) => x * (i === 0 ? -10 : i === 2 ? 10 : 0),
        rotationY: x * 3,
        rotationX: -y * 3,
        duration: 1.2,
        ease: "power2.out",
      })

      // Movimiento de las citas
      gsap.to(quoteRef.current.querySelectorAll(".quote-card"), {
        y: (i) => y * (5 + i * 2),
        rotationY: x * 2,
        duration: 1.5,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section ref={sectionRef} className="content-section mb-16 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute -top-20 -left-20 w-40 h-40 opacity-5">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
        </svg>
      </div>

      <div className="absolute -bottom-20 -right-20 w-40 h-40 opacity-5">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
        </svg>
      </div>

      {/* Título con efecto 3D */}
      <div className="relative mb-12 perspective-1000">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-64 h-16">
          <svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
            <path d="M40 30H200" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
            <path d="M20 30H35" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" />
            <path d="M205 30H220" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="120" cy="30" r="4" fill="#edc3bf" />
            <circle cx="20" cy="30" r="2" fill="#edc3bf" />
            <circle cx="220" cy="30" r="2" fill="#edc3bf" />
          </svg>
        </div>

        <h2
          ref={titleRef}
          className="font-['Cormorant_Garamond'] text-5xl md:text-7xl text-secondary text-center font-semibold relative transform-gpu transition-transform duration-300"
          style={{
            textShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            transformStyle: "preserve-3d",
          }}
        >
          <span className="relative inline-block px-4 py-2">
            ¡Nos casamos!
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></span>
            {/* Destellos decorativos */}
            <span className="absolute -top-6 -left-6 w-12 h-12 opacity-70">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill="#d4af37" fillOpacity="0.3" />
              </svg>
            </span>
            <span className="absolute -bottom-6 -right-6 w-12 h-12 opacity-70">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill="#d4af37" fillOpacity="0.3" />
              </svg>
            </span>
          </span>
        </h2>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>

          {/* Nombres de la pareja con efecto 3D */}
          <div
            ref={coupleRef}
            className="flex flex-col md:flex-row justify-between items-center gap-8 relative perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Tarjeta Jessica */}
            <div className="couple-card w-full md:w-2/5 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl border border-rose/10">
              <div className="text-center">
                <h3 className="font-['Cormorant_Garamond'] text-4xl text-secondary font-semibold mb-3">Jessica</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mb-3"></div>
                <p className="text-foreground/80 font-light">Hija de María y José</p>
              </div>
            </div>

            {/* Símbolo & */}
            <div className="text-gold text-6xl font-light z-10 relative transform-gpu transition-all duration-500 hover:scale-110">
              <div className="absolute -inset-6 bg-white/50 rounded-full blur-md -z-10"></div>
              <span className="relative inline-block">&</span>
            </div>

            {/* Tarjeta Pablo */}
            <div className="couple-card w-full md:w-2/5 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl border border-rose/10">
              <div className="text-center">
                <h3 className="font-['Cormorant_Garamond'] text-4xl text-secondary font-semibold mb-3">Pablo</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mb-3"></div>
                <p className="text-foreground/80 font-light">Hijo de Ana y Carlos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Citas con efecto parallax */}
        <div ref={quoteRef} className="space-y-6 perspective-1000">
          <div className="quote-card bg-gradient-to-r from-tertiary/20 via-tertiary/40 to-tertiary/20 rounded-xl p-8 shadow-inner relative overflow-hidden transform-gpu transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>

            {/* Elemento decorativo */}
            <div className="absolute -top-4 -left-4 w-16 h-16 opacity-10">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 30C30 30 20 20 30 10C40 20 30 30 30 30Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M30 30C30 30 40 20 50 30C40 40 30 30 30 30Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M30 30C30 30 20 40 30 50C40 40 30 30 30 30Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M30 30C30 30 40 40 50 30C40 20 30 30 30 30Z" stroke="#d4af37" strokeWidth="1" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="w-10 h-10 mx-auto mb-4 opacity-70">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.5 8C9.5 8 9 9.5 9 11.5C9 13.5 10 15 12 15C14 15 15 13.5 15 11.5C15 9.5 14 8 12 8C10 8 9.5 8 9.5 8Z"
                    stroke="#d4af37"
                    strokeWidth="1"
                  />
                  <path d="M12 15V19" stroke="#d4af37" strokeWidth="1" />
                  <path d="M10 17H14" stroke="#d4af37" strokeWidth="1" />
                  <circle cx="12" cy="12" r="9" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
                </svg>
              </div>

              <p className="font-['Poppins'] text-foreground text-center text-lg italic relative">
                "El amor no se mide por la perfección, sino por la verdad que habita en cada gesto, en cada mirada y en
                cada promesa que nace del alma"
              </p>
            </div>
          </div>

          <div className="quote-card bg-gradient-to-r from-tertiary/20 via-tertiary/40 to-tertiary/20 rounded-xl p-8 shadow-inner relative overflow-hidden transform-gpu transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>

            {/* Elemento decorativo */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-10">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M70 70C70 70 60 60 70 50C80 60 70 70 70 70Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M70 70C70 70 80 60 90 70C80 80 70 70 70 70Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M70 70C70 70 60 80 70 90C80 80 70 70 70 70Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M70 70C70 70 80 80 90 70C80 60 70 70 70 70Z" stroke="#d4af37" strokeWidth="1" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="w-10 h-10 mx-auto mb-4 opacity-70">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 21C12 21 3 17.5 3 10C3 7.5 5 5 7.5 5C9 5 10.5 6 11 7C11.5 6 13 5 14.5 5C17 5 19 7.5 19 10C19 17.5 12 21 12 21Z"
                    stroke="#d4af37"
                    strokeWidth="1"
                  />
                  <path d="M12 7V13" stroke="#d4af37" strokeWidth="1" />
                  <path d="M9 10H15" stroke="#d4af37" strokeWidth="1" />
                </svg>
              </div>

              <p className="font-['Poppins'] text-foreground text-center text-lg italic relative">
                "Nuestra historia nació sin aviso, como esas estrellas que aparecen cuando menos lo esperas… y en medio
                del tiempo, cuando no buscábamos nada, nos encontramos todo. Fue ahí, justo en ese instante perfecto que
                no sabíamos que existía"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

// Reemplazar el componente EventDetailsSection con esta versión mejorada
const EventDetailsSection = memo(function EventDetailsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    // Efecto parallax para las tarjetas
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return

      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2 // -1 a 1
      const y = (clientY / window.innerHeight - 0.5) * 2 // -1 a 1

      // Movimiento de las tarjetas
      gsap.to(cardsRef.current.querySelectorAll(".info-card"), {
        y: (i) => y * (5 + i * 2),
        x: (i) => x * (5 + i * 2),
        rotationY: x * 3,
        rotationX: -y * 3,
        duration: 1,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section ref={sectionRef} className="content-section mb-16 relative">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 50C20 50 30 20 50 20C70 20 80 50 80 50" stroke="#d4af37" strokeWidth="1" />
          <path d="M20 50C20 50 30 80 50 80C70 80 80 50 80 50" stroke="#d4af37" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 50C20 50 30 20 50 20C70 20 80 50 80 50" stroke="#d4af37" strokeWidth="1" />
          <path d="M20 50C20 50 30 80 50 80C70 80 80 50 80 50" stroke="#d4af37" strokeWidth="1" />
        </svg>
      </div>

      {/* Título con decoración */}
      <div className="relative mb-10 perspective-1000">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-10">
          <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
            <path d="M30 20H130" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
            <path d="M10 20H25" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" />
            <path d="M135 20H150" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="80" cy="20" r="3" fill="#edc3bf" />
          </svg>
        </div>

        <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-secondary text-center font-semibold relative transform-gpu transition-transform duration-300">
          <span className="relative inline-block px-4 py-2">
            Detalles del Evento
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></span>
          </span>
        </h2>
      </div>

      {/* Tarjetas de información con efecto 3D */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-12">
        <div
          ref={cardsRef}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-rose/10 relative overflow-hidden perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>

          <div className="absolute top-10 left-10 w-20 h-20 opacity-5">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
            </svg>
          </div>

          <div className="absolute bottom-10 right-10 w-20 h-20 opacity-5">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fecha */}
            <div className="info-card bg-white/80 rounded-lg p-6 shadow-md transform-gpu transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-rose/5">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="3" y="6" width="18" height="15" rx="2" stroke="#d4af37" strokeWidth="1" />
                  <path d="M3 10H21" stroke="#d4af37" strokeWidth="1" />
                  <path d="M8 3V7" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" />
                  <path d="M16 3V7" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" />
                  <rect x="6" y="14" width="4" height="4" rx="0.5" stroke="#d4af37" strokeWidth="1" />
                </svg>
              </div>
              <h4 className="font-['Cormorant_Garamond'] text-xl text-secondary font-semibold mb-2 text-center">
                Fecha
              </h4>
              <p className="text-foreground/80 text-center">Sábado 02 de agosto del 2025</p>
            </div>

            {/* Hora */}
            <div className="info-card bg-white/80 rounded-lg p-6 shadow-md transform-gpu transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-rose/5">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="12" cy="12" r="9" stroke="#d4af37" strokeWidth="1" />
                  <path
                    d="M12 7V12L15 15"
                    stroke="#d4af37"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-['Cormorant_Garamond'] text-xl text-secondary font-semibold mb-2 text-center">
                Hora
              </h4>
              <p className="text-foreground/80 text-center">18:00 hrs</p>
            </div>

            {/* Lugar */}
            <div className="info-card bg-white/80 rounded-lg p-6 shadow-md transform-gpu transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-rose/5">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="#d4af37"
                    strokeWidth="1"
                  />
                  <path
                    d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z"
                    stroke="#d4af37"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <h4 className="font-['Cormorant_Garamond'] text-xl text-secondary font-semibold mb-2 text-center">
                Lugar
              </h4>
              <p className="text-foreground/80 text-center">Jardín Bella Vista</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dirección y botón */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-rose/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>

          <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-4">Dirección</h3>
          <p className="font-['Poppins'] text-foreground/80 mb-6">Av. de las Flores 123, Ciudad Jardín</p>

          <Button
            variant="gold"
            size="pillLg"
            glowEffect={true}
            className="font-['Poppins'] transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:mr-2 transition-all duration-300">Ver ubicación</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 group-hover:scale-125 transition-all duration-300"
            >
              <path
                d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M10 14L21 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Efecto de brillo al pasar el cursor */}
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></span>
          </Button>
        </div>
      </div>
    </section>
  )
})

// Memoized tab content components
const ScheduleTabContent = memo(function ScheduleTabContent() {
  return (
    <div className="bg-tertiary/30 rounded-xl p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
      <div className="absolute top-10 left-10 w-20 h-20 opacity-10" data-mouse-parallax="0.1">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#d4b08c" strokeWidth="1" strokeDasharray="1 3" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 w-20 h-20 opacity-10" data-mouse-parallax="0.15">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20L80 80M20 80L80 20" stroke="#d4b08c" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Title with decorative elements */}
      <div className="relative mb-8">
        <h3 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-semibold mb-2 text-center">
          <span className="relative inline-block">
            Itinerario
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></span>
          </span>
        </h3>
        <p className="text-center text-[#5e6e64] italic">
          ¡Prepárense para una boda llena de colores! Dejen el blanco para la novia
        </p>
      </div>

      {/* Timeline component */}
      <Timeline
        items={[
          {
            time: "15:30 - 17:00",
            title: "Ceremonia",
            description: "Pérgola Hotel",
            icon: "ceremony",
          },
          {
            time: "17:00 - 18:00",
            title: "Cóctel",
            description: "Terrasse Félix",
            icon: "cocktail",
          },
          {
            time: "18:00 - 18:30",
            title: "Recepción",
            description: "Félix-Leclerc",
            icon: "reception",
          },
          {
            time: "18:30 - 18:45",
            title: "Presentaciones",
            description: "Bienvenida a los novios",
            icon: "presentation",
          },
          {
            time: "18:45 - 19:00",
            title: "Brindis",
            description: "Celebración con champagne",
            icon: "toast",
          },
          {
            time: "19:00 - 22:00",
            title: "Cena",
            description: "Menú de gala",
            icon: "dinner",
          },
          {
            time: "22:00 - 02:00",
            title: "Barra libre",
            description: "Fiesta y celebración",
            icon: "party",
          },
        ]}
        className="mt-10"
      />

      {/* Final decorative element */}
      <div className="mt-12 text-center relative">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10"
          data-mouse-parallax="0.2"
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
        <p className="font-['Cormorant_Garamond'] text-xl text-[#d4b08c] mt-4">¡Los esperamos para celebrar juntos!</p>
      </div>
    </div>
  )
})

const GalleryTabContent = memo(function GalleryTabContent() {
  return (
    <div className="bg-tertiary/30 rounded-xl p-6">
      <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-6 text-center">
        Nuestra Historia
      </h3>

      <GalleryGrid />

      <p className="text-center mt-6 text-foreground">
        Comparte tus fotos del evento usando el hashtag{" "}
        <span className="font-semibold text-accent">#JessicaYPablo2025</span>
      </p>
    </div>
  )
})

const RsvpTabContent = memo(function RsvpTabContent() {
  return (
    <div className="bg-tertiary/30 rounded-xl p-6">
      <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-6 text-center">
        Confirma tu Asistencia
      </h3>
      <p className="text-center text-foreground mb-6">Por favor confirma tu asistencia antes del 15 de julio de 2025</p>

      <RsvpForm />
    </div>
  )
})

const FooterSection = memo(function FooterSection() {
  return (
    <section className="content-section text-center">
      <div className="w-32 h-0.5 bg-gold mx-auto mb-8 opacity-80"></div>
      <p className="font-['Cormorant_Garamond'] text-3xl text-secondary mb-4">Jessica & Pablo</p>
      <p className="font-['Poppins'] text-foreground mt-2 text-lg">
        ¡Te esperamos para celebrar este día tan especial!
      </p>
      <div className="w-32 h-0.5 bg-gold mx-auto mt-8 opacity-80"></div>
    </section>
  )
})

export default function Content() {
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("info")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const parallaxElementsRef = useRef<HTMLElement[]>([])
  const scrollTriggersRef = useRef<gsap.core.ScrollTrigger[]>([])
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

  // Setup animations once
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!contentRef.current || !sectionsRef.current || animationsSetupRef.current) return

    animationsSetupRef.current = true

    // Collect all parallax elements for better performance
    if (contentRef.current) {
      parallaxElementsRef.current = Array.from(
        contentRef.current.querySelectorAll("[data-mouse-parallax]"),
      ) as HTMLElement[]
    }

    // Handle mouse movement for parallax effect
    window.addEventListener("mousemove", handleMouseMove)

    // Initial animation for the main content container - only once
    gsap.fromTo(
      contentRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      },
    )

    // Animate each section when scrolled into view
    const sections = sectionsRef.current.querySelectorAll(".content-section")

    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            section,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.1 * index,
              ease: "power2.out",
            },
          )
        },
      })

      scrollTriggersRef.current.push(trigger)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      scrollTriggersRef.current.forEach((trigger) => trigger.kill())
    }
  }, [handleMouseMove])

  // Apply parallax effect based on mouse position - optimized to only update when mouse moves
  useEffect(() => {
    if (parallaxElementsRef.current.length === 0) return

    parallaxElementsRef.current.forEach((element) => {
      const depth = Number.parseFloat(element.dataset.mouseParallax || "0.1")
      const moveX = mousePosition.x * depth * 50
      const moveY = mousePosition.y * depth * 50
      const rotateZ = mousePosition.x * depth * 10

      // Use transform for better performance instead of gsap for mouse movement
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`
    })
  }, [mousePosition])

  // Handle tab change with animation - memoized
  const handleTabChange = useCallback((value: string) => {
    const tabContent = document.querySelector(`[data-tab="${value}"]`)

    if (tabContent) {
      gsap.fromTo(
        tabContent,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            // Add confetti effect when switching to schedule tab
            if (value === "schedule") {
              createConfetti()
            }
          },
        },
      )
    }

    setActiveTab(value)
  }, [])

  // Create confetti effect - optimized
  const createConfetti = useCallback(() => {
    if (!contentRef.current) return

    const container = contentRef.current
    const confettiCount = 30 // Reduced count for better performance
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.className = "absolute w-2 h-2 pointer-events-none z-50 will-change-transform"

      // Random color
      const colors = ["#edc3bf", "#d4b08c", "#d4af37", "#f5efe7"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      // Random shape
      const shapes = ["rounded-full", "rounded-sm", "rounded"]
      const shape = shapes[Math.floor(Math.random() * shapes.length)]

      confetti.classList.add(shape)
      confetti.style.backgroundColor = color
      confetti.style.opacity = "0"
      confetti.style.position = "absolute"
      confetti.style.top = "0"
      confetti.style.left = `${Math.random() * 100}%`

      fragment.appendChild(confetti)
    }

    container.appendChild(fragment)

    // Batch animations for better performance
    const confettiElements = container.querySelectorAll(".z-50")

    gsap.to(confettiElements, {
      y: (i) => `${300 + Math.random() * 300}px`,
      x: (i) => `${(Math.random() - 0.5) * 200}px`,
      rotation: (i) => `${Math.random() * 360}deg`,
      opacity: 0.8,
      duration: (i) => 1 + Math.random() * 2,
      ease: "power1.out",
      stagger: 0.02,
      onComplete: () => {
        gsap.to(confettiElements, {
          opacity: 0,
          duration: 0.5,
          stagger: 0.01,
          onComplete: () => {
            // Remove all confetti elements at once
            confettiElements.forEach((el) => {
              if (container.contains(el)) {
                container.removeChild(el)
              }
            })
          },
        })
      },
    })
  }, [])

  return (
    <div
      ref={contentRef}
      className="mt-12 mb-20 w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
    >
      {/* Background decorative elements with parallax - reduced for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-20 left-20 w-32 h-32 opacity-5" data-mouse-parallax="0.2">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#d4b08c" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>

        <div className="absolute bottom-40 right-1/4 w-36 h-36 opacity-5" data-mouse-parallax="0.25">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30 40C30 40 15 30 15 20C15 15 20 10 25 10C28 10 30 12 30 15C30 12 32 10 35 10C40 10 45 15 45 20C45 30 30 40 30 40Z"
              stroke="#d4b08c"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div ref={sectionsRef}>
        <WeddingInfoSection />
        <EventDetailsSection />

        <section className="content-section mb-16">
          <Tabs defaultValue="info" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="info" data-tab="info" className="group">
                <span className="group-data-[state=active]:text-[#d4af37] transition-colors duration-300">
                  Información
                </span>
              </TabsTrigger>
              <TabsTrigger value="schedule" data-tab="schedule" className="group">
                <span className="group-data-[state=active]:text-[#d4af37] transition-colors duration-300">
                  Cronograma
                </span>
              </TabsTrigger>
              <TabsTrigger value="gallery" data-tab="gallery" className="group">
                <span className="group-data-[state=active]:text-[#d4af37] transition-colors duration-300">Galería</span>
              </TabsTrigger>
              <TabsTrigger value="rsvp" data-tab="rsvp" className="group">
                <span className="group-data-[state=active]:text-[#d4af37] transition-colors duration-300">RSVP</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" data-tab="info" className="space-y-6">
              <InfoTabContent />
            </TabsContent>

            <TabsContent value="schedule" data-tab="schedule" className="space-y-6">
              <ScheduleTabContent />
            </TabsContent>

            <TabsContent value="gallery" data-tab="gallery" className="space-y-6">
              <GalleryTabContent />
            </TabsContent>

            <TabsContent value="rsvp" data-tab="rsvp" className="space-y-6">
              <RsvpTabContent />
            </TabsContent>
          </Tabs>
        </section>

        <FooterSection />
      </div>
    </div>
  )
}
