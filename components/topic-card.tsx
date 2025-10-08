"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TopicCardProps {
  title: string
  image: string
  isSelected?: boolean
  onClick?: () => void
}

export function TopicCard({ title, image, isSelected, onClick }: TopicCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105",
        "h-32 bg-cover bg-center",
        isSelected && "ring-2 ring-primary",
      )}
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex items-end p-4">
        <h3 className="text-white font-semibold text-base sm:text-lg text-balance">{title}</h3>
      </div>
    </Card>
  )
}
