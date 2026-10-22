"use client"

import { dm_mono } from "@/lib/fonts"

const texts = [
  "Quality",
  "Style",
  "Design",
  "Premium",
  "Unique",
  "Modern",
  "Simple",
  "Fresh",
  "Quality",
  "Style",
  "Design",
  "Premium",
  "Unique",
  "Modern",
  "Simple",
  "Fresh",
]

export default function TextCarousel() {
  return (
    <div className="overflow-hidden w-full bg-black">
      <div className={`flex gap-10 animate-slide text-white ${dm_mono.className}`}>
        {[...texts, ...texts].map((text, i) => (
          <div key={i} className="flex items-center gap-10 text-gray-400">
            <p
              key={i}
              className="text-sm uppercase whitespace-nowrap p-2"
            >
              {text}
            </p>
            <span>
              •
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}