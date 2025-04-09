"use client"

import { memo } from "react"

interface InfoCardProps {
  icon: "calendar" | "clock" | "map-pin"
  title: string
  content: string
}

export const InfoCard = memo(function InfoCard({ icon, title, content }: InfoCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case "calendar":
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M8 2V5"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 2V5"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 9.09H20.5"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 13.7H12.01" stroke="#5e6e64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M8.29999 13.7H8.31"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.29999 17.7H8.31"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "clock":
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 8V13" stroke="#5e6e64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 2H15"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.5 16V22"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 19H22.5"
              stroke="#5e6e64"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "map-pin":
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z"
              stroke="#5e6e64"
              strokeWidth="1.5"
            />
            <path
              d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
              stroke="#5e6e64"
              strokeWidth="1.5"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-3">{renderIcon()}</div>
      <h4 className="font-['Cormorant_Garamond'] text-xl text-[#7d6a5b] font-semibold mb-1">{title}</h4>
      <p className="font-['Poppins'] text-[#5e6e64]">{content}</p>
    </div>
  )
})
