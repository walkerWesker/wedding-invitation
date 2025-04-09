"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Envelope from "@/components/envelope"
import Content from "@/components/content"
import DecorativeElements from "@/components/decorative-elements"
import MusicPlayer from "@/components/music-player"
import ParallaxContainer from "@/components/parallax-container"
import ElegantDecorations from "@/components/ui/elegant-decorations"
import FloatingPetals from "@/components/ui/floating-petals"
import { useWindowSize } from "@/hooks/use-window-size"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // We'll use native browser scrolling instead of GSAP scrollTo
    // to avoid the type error
    if (mainRef.current && contentRef.current) {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 80%",
        onEnter: () => {
          // Use native browser scrollTo instead
          window.scrollTo({
            top: contentRef.current?.offsetTop ? contentRef.current.offsetTop - 80 : 0,
            behavior: "smooth",
          })
        },
        once: true,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [showContent])

  const toggleEnvelope = () => {
    setIsOpen(!isOpen)

    // Show content after a delay when opening
    if (!isOpen) {
      setTimeout(() => {
        setShowContent(true)

        // Scroll to content after it appears
        setTimeout(() => {
          if (contentRef.current) {
            window.scrollTo({
              top: contentRef.current.offsetTop - 80,
              behavior: "smooth",
            })
          }
        }, 500)
      }, 1500) // Longer delay to match the enhanced envelope opening animation
    } else {
      setShowContent(false)

      // Scroll back to top when closing
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  // Adjust petal count based on screen size
  const getPetalCount = () => {
    return width < 640 ? 8 : width < 768 ? 12 : 15
  }

  return (
    <main
      ref={mainRef}
      className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-hidden"
      style={{ backgroundColor: "white" }}
    >
      <ParallaxContainer>
        <DecorativeElements isOpen={isOpen} />

        {/* Add the new decorative components */}
        <ElegantDecorations />
        <FloatingPetals count={getPetalCount()} />

        <div className="container mx-auto px-4 sm:px-6 z-10 relative flex items-center justify-center min-h-screen">
          <Envelope isOpen={isOpen} toggleEnvelope={toggleEnvelope} />
        </div>

        {showContent && (
          <div ref={contentRef} className="w-full">
            <Content />
          </div>
        )}

        <div className={`fixed ${width < 640 ? "bottom-4 right-4" : "bottom-8 right-8"} z-20`}>
          <MusicPlayer />
        </div>
      </ParallaxContainer>
    </main>
  )
}
