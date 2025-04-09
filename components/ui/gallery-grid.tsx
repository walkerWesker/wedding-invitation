"use client"

import type React from "react"

import { useState, useCallback, memo, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

interface FormData {
  name: string
  email: string
  phone: string
  guests: string
  message: string
  attending: string
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  guests: "1",
  message: "",
  attending: "yes",
}

// Memoized form input component for better performance
const FormInput = memo(function FormInput({
  label,
  id,
  type,
  name,
  value,
  onChange,
  required = false,
  className = "",
}: {
  label: string
  id: string
  type: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  required?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
      />
    </div>
  )
})

// Memoized form select component
const FormSelect = memo(function FormSelect({
  label,
  id,
  name,
  value,
  onChange,
  options,
  className = "",
}: {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})

// Memoized form textarea component
const FormTextarea = memo(function FormTextarea({
  label,
  id,
  name,
  value,
  onChange,
  rows = 3,
  className = "",
}: {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
      ></textarea>
    </div>
  )
})

// Memoized radio group component
const RadioGroup = memo(function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  className = "",
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  options: { value: string; label: string }[]
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="text-accent"
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
})

// Success message component
const SuccessMessage = memo(function SuccessMessage() {
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!successRef.current) return

    // Animate success message
    gsap.fromTo(
      successRef.current,
      {
        y: 20,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
    )

    // Animate checkmark
    const checkmark = successRef.current.querySelector("svg path")
    if (checkmark) {
      gsap.fromTo(
        checkmark,
        {
          strokeDasharray: 100,
          strokeDashoffset: 100,
        },
        {
          strokeDashoffset: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
        },
      )
    }
  }, [])

  return (
    <div ref={successRef} className="text-center p-8 bg-tertiary/50 rounded-lg">
      <svg className="w-16 h-16 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <h3 className="font-['Cormorant_Garamond'] text-2xl text-secondary font-semibold mb-2">
        ¡Gracias por confirmar!
      </h3>
      <p className="text-foreground">Hemos recibido tu confirmación. ¡Nos vemos en la boda!</p>
    </div>
  )
})

export const RsvpForm = memo(function RsvpForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const formElementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!formRef.current) return

    // Collect form elements for animations
    formElementsRef.current = Array.from(formRef.current.querySelectorAll(".form-element")) as HTMLElement[]

    // Animate form elements on initial render
    gsap.fromTo(
      formElementsRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
    )

    return () => {
      gsap.killTweensOf(formElementsRef.current)
    }
  }, [])

  // Memoized change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  // Memoized submit handler
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // In a real app, you would submit this data to your backend
      console.log("Form submitted:", formData)

      // Animate form out before showing success message
      if (formRef.current) {
        gsap.to(formRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setIsSubmitted(true)
          },
        })
      } else {
        setIsSubmitted(true)
      }
    },
    [formData],
  )

  if (isSubmitted) {
    return <SuccessMessage />
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Nombre completo"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-element"
        />

        <FormInput
          label="Correo electrónico"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-element"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Teléfono"
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-element"
        />

        <FormSelect
          label="Número de invitados"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          options={[
            { value: "1", label: "1 persona" },
            { value: "2", label: "2 personas" },
            { value: "3", label: "3 personas" },
            { value: "4", label: "4 personas" },
          ]}
          className="form-element"
        />
      </div>

      <RadioGroup
        label="¿Asistirás?"
        name="attending"
        value={formData.attending}
        onChange={handleChange}
        options={[
          { value: "yes", label: "Sí, asistiré" },
          { value: "no", label: "No podré asistir" },
        ]}
        className="form-element"
      />

      <FormTextarea
        label="Mensaje para los novios (opcional)"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        className="form-element"
      />

      <div className="text-center form-element">
        <Button
          type="submit"
          variant="gold"
          size="pillLg"
          glowEffect={true}
          className="font-['Poppins'] transition-all duration-300 hardware-accelerated"
        >
          <span>Confirmar Asistencia</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </form>
  )
})

import Image from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { throttle } from "@/lib/utils"

// Memoized gallery item component
const GalleryItem = memo(function GalleryItem({
  image,
  title,
  date,
  index,
  onHover,
}: {
  image: string
  title: string
  date: string
  index: number
  onHover: (index: number | null) => void
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Optimized hover handlers
  const handleMouseEnter = useCallback(() => {
    onHover(index)
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [index, onHover])

  const handleMouseLeave = useCallback(() => {
    onHover(null)
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [onHover])

  return (
    <div
      ref={itemRef}
      className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer will-change-transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-square">
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-100 opacity-70"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
          <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold">{title}</h4>
          <p className="text-sm opacity-80">{date}</p>
        </div>
      </div>
    </div>
  )
})

// Decorative SVG components
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

export function GalleryGrid() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const decorElementsRef = useRef<HTMLElement[]>([])
  const galleryItems = [
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Nuestro Primer Encuentro",
      date: "Junio 2020",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "La Propuesta",
      date: "Diciembre 2024",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Compromiso",
      date: "Enero 2025",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Sesión Pre-Boda",
      date: "Marzo 2025",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Despedida de Solteros",
      date: "Julio 2025",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Ensayo de Boda",
      date: "Julio 2025",
    },
  ]

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

    if (!containerRef.current) return

    // Collect all decorative elements for better performance
    decorElementsRef.current = Array.from(containerRef.current.querySelectorAll("[data-parallax]")) as HTMLElement[]

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

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          ease: "power2.inOut",
        })
      })

      const appearElements = element.querySelectorAll(".appear-element")

      gsap.to(appearElements, {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        ease: "back.out(1.7)",
      })
    })

    // Animate gallery items
    const galleryItems = containerRef.current.querySelectorAll(".gallery-item")

    galleryItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none none",
          },
          ease: "power2.out",
        },
      )
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [handleMouseMove])

  // Apply parallax effect based on mouse position
  useEffect(() => {
    if (decorElementsRef.current.length === 0) return

    decorElementsRef.current.forEach((element) => {
      const depth = Number.parseFloat(element.dataset.parallax || "0.1")
      const moveX = mousePosition.x * depth * 50
      const moveY = mousePosition.y * depth * 50
      const rotateZ = mousePosition.x * depth * 10

      // Use transform for better performance
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`
    })
  }, [mousePosition])

  // Memoized hover handler
  const handleHover = useCallback((index: number | null) => {
    setHoveredItem(index)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Decorative elements */}
      <div
        className="absolute -top-10 right-10 w-24 h-24 opacity-20 pointer-events-none svg-element"
        data-parallax="0.2"
      >
        <SparklesSvg className="w-full h-full" />
      </div>

      <div
        className="absolute -bottom-10 left-10 w-24 h-24 opacity-20 pointer-events-none svg-element"
        data-parallax="0.15"
      >
        <FlowerSvg className="w-full h-full" />
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryItems.map((item, index) => (
          <div key={index} className="gallery-item">
            <GalleryItem image={item.image} title={item.title} date={item.date} index={index} onHover={handleHover} />
          </div>
        ))}
      </div>

      {/* Floating decorative element that follows hovered item */}
      {hoveredItem !== null && (
        <div
          className="absolute w-40 h-40 pointer-events-none transition-all duration-300 ease-out"
          style={{
            top: `${Math.floor(hoveredItem / 3) * 300 + 150}px`,
            left: `${(hoveredItem % 3) * 33.33 + 16.67}%`,
            opacity: 0.1,
            transform: `translate(-50%, -50%) rotate(${mousePosition.x * 30}deg)`,
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="20" stroke="#d4af37" strokeWidth="1" />
            <circle cx="50" cy="50" r="10" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>
      )}

      {/* View more button */}
      <div className="mt-8 text-center">
        <button className="bg-white/80 backdrop-blur-sm border border-[#edc3bf] text-[#7d6a5b] hover:bg-[#edc3bf]/20 shadow-sm hover:shadow-md px-6 py-2 rounded-full transition-all duration-300 group">
          <span className="group-hover:mr-1 transition-all duration-300">Ver más fotos</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-300"
          >
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M12 5L19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
