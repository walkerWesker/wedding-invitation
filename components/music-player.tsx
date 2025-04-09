"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    // Create audio element
    audioRef.current = new Audio("/wedding-song.mp3")
    audioRef.current.loop = true

    // Animation for the button
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <button
      ref={buttonRef}
      onClick={togglePlay}
      className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white transition-colors duration-300 focus:outline-none"
      aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
    >
      {isPlaying ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 9V15" stroke="#5e6e64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 9V15" stroke="#5e6e64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#5e6e64"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#5e6e64"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 8.96533C9.5 8.48805 9.5 8.24941 9.59974 8.11618C9.68666 8.00007 9.81971 7.92744 9.96438 7.9171C10.1304 7.90525 10.3311 8.03429 10.7326 8.29235L15.4532 11.3271C15.8016 11.551 15.9758 11.663 16.0359 11.8054C16.0885 11.9298 16.0885 12.0702 16.0359 12.1946C15.9758 12.337 15.8016 12.449 15.4532 12.6729L10.7326 15.7076C10.3311 15.9657 10.1304 16.0948 9.96438 16.0829C9.81971 16.0726 9.68666 15.9999 9.59974 15.8838C9.5 15.7506 9.5 15.512 9.5 15.0347V8.96533Z"
            stroke="#5e6e64"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
