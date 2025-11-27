import { useState, useEffect } from "react"
import type { HomeHeroProps } from "@/lib/types"
import { motion, useScroll, useTransform } from "framer-motion"
import { Hero } from '@/lib/blocks/Hero'
import { HeroGallery } from "@/lib/blocks/HeroGallery"
import imgFarLeft from "/static-images/imgHeroGalleryFL.webp"
import imgFarRight from "/static-images/imgHeroGalleryFR.webp"
import imgTopRight from "/static-images/imgHeroGalleryTR.webp"
import imgBottomRight from "/static-images/imgHeroGalleryBR.webp"
import imgTopLeft from "/static-images/imgHeroGalleryTL.webp"
import imgBottomLeft from "/static-images/imgHeroGalleryBL.webp"
import imgCenter from "/static-images/imgHeroGalleryC.webp"
import { Button } from "@/components/ui/button"

const galleryImages = [
  { src: imgFarLeft, type: "image" as const, alt: "Lily Pad" },
  { src: imgTopLeft, type: "image" as const, alt: "Hand Holding a Leaf" },
  { src: imgBottomLeft, type: "image" as const, alt: "Oil Drops" },
  { src: imgCenter, type: "image" as const, alt: "Sunset" },
  { src: imgTopRight, type: "image" as const, alt: "Plants" },
  { src: imgBottomRight, type: "image" as const, alt: "Oils" },
  { src: imgFarRight, type: "image" as const, alt: "Crystals" },
]

export function HomeHero({ onNavigate }: HomeHeroProps) {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll() // Framer Motion MotionValue

  const heroY = useTransform(scrollY, [0, 300], [0, -300]) // move up 100px over first 300px scroll
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Hero fullHeight="screen">
      {/* HeroGallery behind content */}
      <HeroGallery images={galleryImages} />

      {/* Central content */}
      <motion.div className="relative z-30 inset-y-0 text-center max-w-3xl mx-auto px-6" style={{ opacity: heroOpacity, y: heroY }}>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md h-screen md:h-auto rounded-[21px] -mx-4 -my-24 md:-my-8"></div>
        <div className="relative z-40 py-20 md:py-10 px-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-header mb-1">
            Your Wellness Journey
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-primary mb-4">
            Starts Now
          </h1>
          <p className="text-lg md:text-xl text-default mb-8 max-w-lg mx-auto leading-relaxed tracking-tight">
            Experience transformative healing through compassionate, trauma-informed bodywork and energy healing
          </p>
          <Button
            onClick={() => onNavigate("booking")}
            className="btn-gradient-primary hover:btn-gradient-primary text-white px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Book Your Session
          </Button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center text-stone-500 px-4 py-3">
          <span className="text-xs font-medium mb-2.5 tracking-tight">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-9 border-2 border-stone-400 rounded-full flex justify-center"
          >
            <div className="w-0.5 h-2.5 bg-stone-400 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </motion.div>
      
    </Hero>
  )
}