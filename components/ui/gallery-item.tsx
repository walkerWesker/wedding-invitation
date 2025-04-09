"use client"

import { memo, useState } from "react"
import Image from "next/image"

interface GalleryItemProps {
  image: string
  title: string
  date: string
}

export const GalleryItem = memo(function GalleryItem({ image, title, date }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-70"}`}
        ></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold">{title}</h4>
          <p className="text-sm opacity-80">{date}</p>
        </div>
      </div>
    </div>
  )
})
