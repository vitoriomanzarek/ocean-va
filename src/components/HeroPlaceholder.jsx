import React from 'react'
import { ImageIcon } from 'lucide-react'

export default function HeroPlaceholder({ title, description }) {
  return (
    <div className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-ocean-600 to-ocean-500 flex items-center justify-center border-2 border-dashed border-white/30">
      <div className="text-center px-6">
        <ImageIcon className="w-16 h-16 text-white/60 mx-auto mb-4" />
        <p className="text-white/80 font-medium text-lg mb-2">
          {title}
        </p>
        <p className="text-white/60 text-sm max-w-md">
          {description}
        </p>
      </div>
    </div>
  )
}
