"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface EmiratesCarouselProps {
  category: string
  readTime: string
}

const emirates = [
  {
    name: "Abu Dhabi",
    image: "/abu-dhabi-skyline.png",
  },
  {
    name: "Dubai",
    image: "/dubai-skyline-with-burj-khalifa-and-modern-archite.jpg",
  },
  {
    name: "Sharjah",
    image: "/sharjah-cultural-landmarks-and-traditional-archite.jpg",
  },
  {
    name: "Ras Al Khaimah",
    image: "/ras-al-khaimah-mountains-and-coastal-landscape.jpg",
  },
  {
    name: "Fujairah",
    image: "/fujairah-mountains-and-eastern-coast-of-uae.jpg",
  },
  {
    name: "Umm Al Quwain",
    image: "/umm-al-quwain-lagoons-and-traditional-fishing-boat.jpg",
  },
  {
    name: "Ajman",
    image: "/ajman-beach-and-modern-cityscape.jpg",
  },
]

export function EmiratesCarousel({ category, readTime }: EmiratesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % emirates.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={emirates[currentIndex].image || "/placeholder.svg"}
          alt={`${emirates[currentIndex].name} - UAE Emirate`}
          className="w-full h-48 object-cover transition-opacity duration-500"
        />

        {/* Emirate name overlay */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="default" className="bg-black/70 text-white backdrop-blur-sm">
            {emirates[currentIndex].name}
          </Badge>
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-4 right-4 flex space-x-1">
          {emirates.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category and read time badges */}
      <div className="absolute top-4 left-4">
        <Badge variant="secondary">{category}</Badge>
      </div>
      <div className="absolute top-4 right-4">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          {readTime}
        </Badge>
      </div>
    </div>
  )
}
