"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface EmiratesCarouselProps {
  category: string | string[]
  readTime: string
  images?: string[]
  labels?: string[]
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

export function EmiratesCarousel({ category, readTime, images, labels }: EmiratesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [categoryIndex, setCategoryIndex] = useState(0)

  // Advance slides based on the active images set; reset when images change
  useEffect(() => {
    setCurrentIndex(0)
    const slideCount = (images?.length ?? 0) > 0 ? images!.length : emirates.length
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount)
    }, 3000)
    return () => clearInterval(interval)
  }, [images?.length])

  // Clamp index if images shrink to avoid undefined frames
  useEffect(() => {
    const slideCount = (images?.length ?? 0) > 0 ? images!.length : emirates.length
    if (currentIndex >= slideCount) setCurrentIndex(0)
  }, [images?.length, currentIndex])

  useEffect(() => {
    if (Array.isArray(category) && category.length > 1) {
      const interval = setInterval(() => {
        setCategoryIndex((prev) => (prev + 1) % category.length)
      }, 2500)
      return () => clearInterval(interval)
    }
  }, [category])

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg">
        {images && images.length > 0 ? (
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={labels?.[currentIndex] || "Slide"}
            className="w-full h-48 object-cover transition-opacity duration-500"
          />
        ) : (
          <img
            src={emirates[currentIndex].image || "/placeholder.svg"}
            alt={`${emirates[currentIndex].name} - UAE Emirate`}
            className="w-full h-48 object-cover transition-opacity duration-500"
          />
        )}

        {/* Emirate name overlay */}
        {/* Top-left: Alternating category label */}
        <div className="absolute top-4 left-4">
          <Badge variant="default" className="bg-black/70 text-white backdrop-blur-sm">
            {Array.isArray(category) ? category[categoryIndex] : category}
          </Badge>
        </div>

        {/* Bottom-left: Emirate name only for default carousel (no custom images) */}
        {(!images || images.length === 0) && (
          <div className="absolute bottom-4 left-4">
            <Badge variant="default" className="bg-black/70 text-white backdrop-blur-sm">
              {emirates[currentIndex].name}
            </Badge>
          </div>
        )}

        {/* Progress indicators */}
        <div className="absolute bottom-4 right-4 flex space-x-1">
          {(images && images.length > 0 ? images : emirates).map((_: any, index: number) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Read time badge */}
      <div className="absolute top-4 right-4">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          {readTime}
        </Badge>
      </div>
    </div>
  )
}
