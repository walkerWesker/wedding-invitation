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
