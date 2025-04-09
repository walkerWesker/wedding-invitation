"use client"

import { memo, useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { throttle } from "@/lib/utils"

interface TimelineItem {
  time: string
  title: string
  description: string
  icon:
    | "ceremony"
    | "cocktail"
    | "reception"
    | "presentation"
    | "toast"
    | "dinner"
    | "party"
    | "cake"
    | "dance"
    | "photo"
    | "gift"
    | "car"
    | "rings"
    | "flowers"
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

// Pre-render SVG icons to avoid recreating them on each render
const renderIconMemo = (() => {
  const iconCache: Record<string, JSX.Element> = {}

  return (icon: string): JSX.Element | null => {
    if (iconCache[icon]) return iconCache[icon]

    let result: JSX.Element | null = null

    switch (icon) {
      case "ceremony":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M15 30C15 30 13 25 13 20C13 15 15 10 20 10C25 10 27 15 27 20C27 25 25 30 25 30"
              stroke="#d4b08c"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M15 18H25" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="7" r="2" stroke="#d4b08c" strokeWidth="1.5" />
            <path d="M18 30L22 30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
        break
      case "cocktail":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M13 12H27L20 22V30"
              stroke="#d4b08c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M16 30H24" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 16H27" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="17" cy="14" r="1" fill="#d4b08c" />
            <circle cx="23" cy="14" r="1" fill="#d4b08c" />
          </svg>
        )
        break
      case "reception":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M10 30V17L20 10L30 17V30"
              stroke="#d4b08c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M17 30V23H23V30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 19H23" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 19V23" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 16C20 16 18 14 20 13C22 14 20 16 20 16Z" fill="#d4b08c" />
          </svg>
        )
        break
      case "presentation":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M15 25C15 25 13 20 15 15C17 10 23 10 25 15C27 20 25 25 25 25"
              stroke="#d4b08c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M15 18H25" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 25V30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 28L23 32" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M23 28L17 32" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
        break
      case "toast":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M13 30C13 30 10 25 10 20C10 15 13 13 15 13C17 13 18 15 20 15C22 15 23 13 25 13C27 13 30 15 30 20C30 25 27 30 27 30"
              stroke="#d4b08c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M13 20H27" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 13V10" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 13V10" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="17" r="1" fill="#d4b08c" />
          </svg>
        )
        break
      case "dinner":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="20" cy="20" r="10" stroke="#d4b08c" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="6" stroke="#d4b08c" strokeWidth="1.5" strokeDasharray="1 2" />
            <path d="M14 15L26 25" stroke="#d4b08c" strokeWidth="1" strokeLinecap="round" />
            <path d="M26 15L14 25" stroke="#d4b08c" strokeWidth="1" strokeLinecap="round" />
            <path d="M20 20C20 20 18 18 20 17C22 18 20 20 20 20Z" fill="#d4b08c" />
          </svg>
        )
        break
      case "party":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M10 30L10 20C10 15 15 10 20 10C25 10 30 15 30 20L30 30"
              stroke="#d4b08c"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M10 25L30 25" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 15L17 17" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 15L23 17" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 13V15" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 20H15" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M27 20H25" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 20C20 20 18 18 20 17C22 18 20 20 20 20Z" fill="#d4b08c" />
          </svg>
        )
        break
      case "cake":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 30V20H28V30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 30H30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 20V15H25V20" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 15V12H22V15" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 12V10" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 25H28" stroke="#d4b08c" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 2" />
            <circle cx="16" cy="22.5" r="1" fill="#d4b08c" />
            <circle cx="24" cy="22.5" r="1" fill="#d4b08c" />
            <circle cx="20" cy="27.5" r="1" fill="#d4b08c" />
          </svg>
        )
        break
      case "dance":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="15" cy="12" r="2" stroke="#d4b08c" strokeWidth="1.5" />
            <circle cx="25" cy="12" r="2" stroke="#d4b08c" strokeWidth="1.5" />
            <path d="M15 14L13 22L15 30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 14L27 22L25 30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 22H27" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 30H25" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
        break
      case "photo":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="10" y="13" width="20" height="17" rx="2" stroke="#d4b08c" strokeWidth="1.5" />
            <path d="M14 13V10H26V13" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="21" r="4" stroke="#d4b08c" strokeWidth="1.5" />
            <circle cx="24" cy="17" r="1" fill="#d4b08c" />
          </svg>
        )
        break
      case "gift":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="10" y="15" width="20" height="15" rx="1" stroke="#d4b08c" strokeWidth="1.5" />
            <path d="M15 15V10H25V15" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 10V30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 20H30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 10C20 10 17 7 20 5C23 7 20 10 20 10Z" fill="#d4b08c" />
          </svg>
        )
        break
      case "car":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M8 25L10 15C10 15 12 13 20 13C28 13 30 15 30 15L32 25"
              stroke="#d4b08c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="7" y="25" width="26" height="5" rx="1" stroke="#d4b08c" strokeWidth="1.5" />
            <circle cx="12" cy="30" r="2" stroke="#d4b08c" strokeWidth="1.5" />
            <circle cx="28" cy="30" r="2" stroke="#d4b08c" strokeWidth="1.5" />
            <path d="M15 20H25" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 20H12" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M28 20H30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
        break
      case "rings":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="15" cy="20" r="7" stroke="#d4b08c" strokeWidth="1.5" />
            <circle cx="25" cy="20" r="7" stroke="#d4b08c" strokeWidth="1.5" />
            <path d="M15 13V15" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 25V27" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 13V15" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 25V27" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
        break
      case "flowers":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M20 30C20 30 18 25 15 23C12 21 10 20 10 15C10 10 15 10 15 10C15 10 15 15 20 15C25 15 25 10 25 10C25 10 30 10 30 15C30 20 28 21 25 23C22 25 20 30 20 30Z"
              stroke="#d4b08c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M20 15V30" stroke="#d4b08c" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="15" cy="13" r="1" fill="#d4b08c" />
            <circle cx="25" cy="13" r="1" fill="#d4b08c" />
            <circle cx="20" cy="20" r="1" fill="#d4b08c" />
          </svg>
        )
        break
      default:
        return null
    }

    iconCache[icon] = result
    return result
  }
})()

// Pre-render decorative elements to avoid recreating them on each render
const decorativeElements = [
  // Flower
  <svg key="flower" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 10C30 10 35 20 45 20C45 20 35 25 35 35C35 35 25 30 15 35C15 35 20 25 15 15C15 15 25 20 30 10Z"
      stroke="#edc3bf"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="30" cy="25" r="3" fill="#edc3bf" fillOpacity="0.6" />
  </svg>,

  // Rings
  <svg key="rings" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="30" r="10" stroke="#edc3bf" strokeWidth="1" />
    <circle cx="35" cy="30" r="10" stroke="#edc3bf" strokeWidth="1" />
  </svg>,

  // Sparkles
  <svg key="sparkles" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 15L32 25L42 27L32 29L30 39L28 29L18 27L28 25L30 15Z"
      stroke="#edc3bf"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="30" cy="27" r="2" fill="#edc3bf" fillOpacity="0.6" />
  </svg>,

  // Hearts
  <svg key="hearts" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 40C30 40 15 30 15 20C15 15 20 10 25 10C28 10 30 12 30 15C30 12 32 10 35 10C40 10 45 15 45 20C45 30 30 40 30 40Z"
      stroke="#edc3bf"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,

  // Dots
  <svg key="dots" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="2" fill="#edc3bf" />
    <circle cx="30" cy="30" r="2" fill="#edc3bf" />
    <circle cx="40" cy="40" r="2" fill="#edc3bf" />
    <circle cx="20" cy="40" r="2" fill="#edc3bf" />
    <circle cx="40" cy="20" r="2" fill="#edc3bf" />
  </svg>,

  // Fine lines
  <svg key="lines" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 30H50" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
    <path d="M30 10V50" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
    <circle cx="30" cy="30" r="2" fill="#edc3bf" />
  </svg>,

  // Butterfly
  <svg key="butterfly" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 20C30 20 20 10 15 20C10 30 25 35 30 45C35 35 50 30 45 20C40 10 30 20 30 20Z"
      stroke="#edc3bf"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M30 20V45" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" />
  </svg>,

  // Cake
  <svg key="cake" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 45V30H40V45" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 45H45" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
    <path d="M25 30V20H35V30" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 20V15H32V20" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 15V10" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
    <circle cx="30" cy="25" r="1" fill="#edc3bf" />
    <circle cx="25" cy="35" r="1" fill="#edc3bf" />
    <circle cx="35" cy="35" r="1" fill="#edc3bf" />
    <circle cx="30" cy="40" r="1" fill="#edc3bf" />
  </svg>,
]

export const Timeline = memo(function Timeline({ items, className = "" }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const svgLinesRef = useRef<(SVGPathElement | null)[]>([])
  const decorElementsRef = useRef<(HTMLDivElement | null)[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState<number | null>(null)
  const animationsSetupRef = useRef(false)
  const parallaxElementsRef = useRef<HTMLElement[]>([])
  const scrollTriggersRef = useRef<gsap.core.ScrollTrigger[]>([])
  const timelineAnimationsRef = useRef<gsap.core.Tween[]>([])

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
    if (!timelineRef.current || animationsSetupRef.current) return

    gsap.registerPlugin(ScrollTrigger)
    animationsSetupRef.current = true

    // Collect all parallax elements for better performance
    if (timelineRef.current) {
      parallaxElementsRef.current = Array.from(timelineRef.current.querySelectorAll("[data-parallax]")) as HTMLElement[]
    }

    // Animate the main vertical line drawing
    const mainLine = timelineRef.current.querySelector(".timeline-main-line") as SVGPathElement
    if (mainLine) {
      const length = mainLine.getTotalLength()

      gsap.set(mainLine, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      const mainLineTween = gsap.to(mainLine, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      })

      timelineAnimationsRef.current.push(mainLineTween)
    }

    // Add parallax effect to background elements - using a single animation for all elements
    const bgElements = timelineRef.current.querySelectorAll(".parallax-bg-element")
    bgElements.forEach((element) => {
      const depth = Number.parseFloat((element as HTMLElement).dataset.depth || "0.1")

      const trigger = ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(element, {
            y: self.progress * 100 * depth,
            duration: 0.5,
            overwrite: "auto",
          })
        },
      })

      scrollTriggersRef.current.push(trigger)
    })

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      scrollTriggersRef.current.forEach((trigger) => trigger.kill())
      timelineAnimationsRef.current.forEach((tween) => tween.kill())
    }
  }, [handleMouseMove])

  // Setup item animations when items change
  useEffect(() => {
    if (!timelineRef.current || !animationsSetupRef.current) return

    // Clear previous animations
    scrollTriggersRef.current.forEach((trigger) => trigger.kill())
    timelineAnimationsRef.current.forEach((tween) => tween.kill())
    scrollTriggersRef.current = []
    timelineAnimationsRef.current = []

    // Animate each timeline item - using a single animation for all items
    itemsRef.current.forEach((item, index) => {
      if (!item) return

      // Group animations for better performance
      const contentElement = item.querySelector(".timeline-content")
      const nodeElement = item.querySelector(".timeline-node")
      const iconElement = item.querySelector(".timeline-icon")

      // Create a timeline for this item
      const itemTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        paused: true,
      })

      // Add all animations to the timeline
      if (contentElement) {
        itemTimeline.fromTo(
          contentElement,
          {
            opacity: 0,
            x: index % 2 === 0 ? -30 : 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          0,
        )
      }

      if (nodeElement) {
        itemTimeline.fromTo(
          nodeElement,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
          },
          0.1,
        )
      }

      if (iconElement) {
        itemTimeline.fromTo(
          iconElement,
          {
            scale: 0,
            opacity: 0,
            rotation: -30,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          },
          0.2,
        )
      }

      // Animate SVG connecting lines
      if (svgLinesRef.current[index]) {
        const path = svgLinesRef.current[index]
        if (path) {
          const length = path.getTotalLength ? path.getTotalLength() : 100

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })

          itemTimeline.to(
            path,
            {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0.3,
          )
        }
      }

      // Animate decorative elements
      if (decorElementsRef.current[index]) {
        const decorElement = decorElementsRef.current[index]
        if (decorElement) {
          itemTimeline.fromTo(
            decorElement,
            {
              opacity: 0,
              scale: 0.5,
              y: 20,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            0.4,
          )
        }
      }

      // Play the timeline
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => itemTimeline.play(),
      })

      scrollTriggersRef.current.push(trigger)
      timelineAnimationsRef.current.push(itemTimeline)
    })

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill())
      timelineAnimationsRef.current.forEach((tween) => tween.kill())
    }
  }, [items])

  // Apply parallax effect based on mouse position - optimized to only update when mouse moves
  useEffect(() => {
    if (parallaxElementsRef.current.length === 0) return

    parallaxElementsRef.current.forEach((element) => {
      const depth = Number.parseFloat(element.dataset.parallax || "0.1")
      const moveX = mousePosition.x * depth * 50
      const moveY = mousePosition.y * depth * 50
      const rotateZ = mousePosition.x * depth * 10

      // Use transform for better performance instead of gsap for mouse movement
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`
    })
  }, [mousePosition])

  // Memoized handler for hover state
  const handleMouseEnter = useCallback((index: number) => {
    setIsHovering(index)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(null)
  }, [])

  // Render decorative element with memoization
  const renderDecorativeElement = useCallback((index: number) => {
    return decorativeElements[index % decorativeElements.length]
  }, [])

  return (
    <div ref={timelineRef} className={`relative py-8 ${className}`}>
      {/* Background decorative elements with parallax - reduced number for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-bg-element absolute top-20 left-20 w-32 h-32 opacity-10" data-depth="0.2">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#d4b08c" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>

        <div className="parallax-bg-element absolute top-40 right-20 w-40 h-40 opacity-10" data-depth="0.3">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20L80 80M20 80L80 20" stroke="#d4b08c" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        <div className="parallax-bg-element absolute bottom-20 left-1/4 w-24 h-24 opacity-10" data-depth="0.15">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 20C50 20 65 35 65 50C65 65 50 80 35 65C20 50 35 35 50 20Z"
              stroke="#d4b08c"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Main vertical line - using CSS for better performance */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-transparent">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M0.5,0 L0.5,1000"
            stroke="#edc3bf"
            strokeWidth="2"
            strokeDasharray="1 3"
            className="timeline-main-line"
          />
        </svg>
      </div>

      {/* Decorative element that follows mouse - using CSS transform for better performance */}
      <div
        className="absolute w-40 h-40 opacity-20 pointer-events-none"
        style={{
          left: `calc(${50 + mousePosition.x * 20}% - 20px)`,
          top: `calc(${50 + mousePosition.y * 20}% - 20px)`,
          transform: `rotate(${mousePosition.x * 10}deg)`,
          transition: "left 0.5s ease-out, top 0.5s ease-out",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="#edc3bf" strokeWidth="0.5" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="20" stroke="#edc3bf" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" stroke="#edc3bf" strokeWidth="0.5" strokeDasharray="1 2" />
        </svg>
      </div>

      {/* Timeline items - using CSS will-change for better performance */}
      <div className="relative z-10">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`relative mb-16 last:mb-0 ${index % 2 === 0 ? "timeline-item-left" : "timeline-item-right"}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Connecting line to node - using SVG for better animation */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <path
                ref={(el) => (svgLinesRef.current[index] = el)}
                d={
                  index % 2 === 0
                    ? `M${window.innerWidth > 768 ? "50%" : "50%"},10 H70% Q85%,10 85%,25 V50%`
                    : `M${window.innerWidth > 768 ? "50%" : "50%"},10 H30% Q15%,10 15%,25 V50%`
                }
                stroke="#edc3bf"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                className="connecting-line"
              />
            </svg>

            {/* Heart node on the timeline - using CSS for hover effects */}
            <div
              className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 timeline-node transition-all duration-300 ${isHovering === index ? "scale-125" : ""}`}
            >
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  d="M20 30C20 30 10 22 10 15C10 12 12 10 15 10C17 10 19 12 20 14C21 12 23 10 25 10C28 10 30 12 30 15C30 22 20 30 20 30Z"
                  fill="#edc3bf"
                  stroke="#d4b08c"
                  strokeWidth="1"
                  className={`transition-all duration-500 ${isHovering === index ? "fill-[#d4af37]" : ""}`}
                />
              </svg>
            </div>

            {/* Content - using CSS transforms for better performance */}
            <div
              className={`timeline-content relative ${
                index % 2 === 0
                  ? "md:ml-auto md:mr-0 md:pr-8 md:pl-16 md:text-right"
                  : "md:mr-auto md:ml-0 md:pl-8 md:pr-16 md:text-left"
              } mx-auto px-12 w-full md:w-1/2 transition-all duration-300 will-change-transform ${isHovering === index ? "transform -translate-y-2" : ""}`}
              data-parallax="0.05"
            >
              {/* Time */}
              <div className="mb-2">
                <span
                  className={`inline-block bg-gradient-to-r from-[#d4b08c] to-[#edc3bf] text-white px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${isHovering === index ? "shadow-lg from-[#d4af37] to-[#edc3bf]" : ""}`}
                >
                  {item.time}
                </span>
              </div>

              {/* Icon - using memoized icons for better performance */}
              <div
                className={`absolute ${
                  index % 2 === 0 ? "right-0 md:left-auto" : "left-0 md:right-auto"
                } top-0 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md timeline-icon transition-all duration-300 ${isHovering === index ? "bg-white shadow-lg scale-110" : ""}`}
              >
                {renderIconMemo(item.icon)}
              </div>

              {/* Content box - using CSS for hover effects */}
              <div
                className={`bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-[#edc3bf]/30 
                transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90 ${isHovering === index ? "border-[#d4af37]/50 shadow-lg" : ""}`}
              >
                <h4 className="font-['Cormorant_Garamond'] text-xl text-[#d4b08c] font-semibold mb-1">{item.title}</h4>
                <p className="text-[#5e6e64] text-sm">{item.description}</p>
              </div>

              {/* Decorative element - using memoized elements for better performance */}
              <div
                ref={(el) => (decorElementsRef.current[index] = el)}
                className={`absolute ${
                  index % 2 === 0 ? "left-12 md:right-12 md:left-auto" : "right-12 md:left-12 md:right-auto"
                } bottom-0 w-12 h-12 opacity-60 pointer-events-none transition-all duration-500 ${isHovering === index ? "opacity-100 scale-125" : ""}`}
                data-parallax={0.1 + (index % 3) * 0.05}
              >
                {renderDecorativeElement(index)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final decorative element - using CSS animation for better performance */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20 opacity-80 animate-float"
        data-parallax="0.2"
      >
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40 20C40 20 30 30 30 40C30 50 40 60 50 50C60 40 50 30 40 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40 20C40 20 50 30 50 40C50 50 40 60 30 50C20 40 30 30 40 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="40" r="3" fill="#edc3bf" />
        </svg>
      </div>

      {/* Confetti elements that appear on hover - using CSS for better performance */}
      {isHovering !== null && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#edc3bf]/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 3}s infinite ease-in-out ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
})
