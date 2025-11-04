import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { HeroGalleryImage } from "@/lib/types"

interface HeroGalleryProps {
  images: HeroGalleryImage[]
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ images }) => {
  const { scrollY } = useScroll()

  const leftX = useTransform(scrollY, [0, 300], [0, -200])
  const rightX = useTransform(scrollY, [0, 300], [0, 200])
  const centerScale = useTransform(scrollY, [0, 300], [1, 1.5])

  return (
    <>
      {/* Far Left Image - Barely visible initially */}
      <motion.div
        className="absolute -left-66 top-1/3 w-1/4 max-w-76 aspect-4/5 rounded-2xl overflow-hidden shadow-lg z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        style={{ x: leftX }}
      >
        <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
      </motion.div>
      {/* Left Top */}
      <motion.div
        className="absolute left-1/16 top-1/6 w-1/4 max-w-76 aspect-4/5 rounded-2xl overflow-hidden shadow-lg z-10"
        style={{ x: leftX }}
      >
        <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
      </motion.div>

      {/* Left Bottom */}
      <motion.div
        className="absolute left-1/16 bottom-1/6 w-1/4 max-w-76 aspect-3/2 rounded-2xl overflow-hidden shadow-md z-10"
        style={{ x: leftX }}
      >
        <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
      </motion.div>
      {/* Far Right Image - Barely visible initially */}
      <motion.div
        className="absolute -right-66 top-1/3 w-1/4 max-w-76 aspect-4/5 rounded-2xl overflow-hidden shadow-lg z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
        style={{ x: rightX }}
      >
        <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
      </motion.div>

      {/* Center */}
      <motion.div
        className="absolute left-1/2 top-5/9 -translate-x-1/2 -translate-y-1/2 w-2/5 max-w-156 aspect-20/21 rounded-2xl overflow-hidden shadow-2xl z-20"
        style={{ scale: centerScale }}
      >
        <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
      </motion.div>

      {/* Right Top */}
      <motion.div
        className="absolute right-1/16 top-1/6 w-1/4 max-w-76 aspect-3/2 rounded-2xl overflow-hidden shadow-md z-10"
        style={{ x: rightX }}
      >
        <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover" />
      </motion.div>

      {/* Right Bottom */}
      <motion.div
        className="absolute right-1/16 bottom-1/6 w-1/4 max-w-76 aspect-4/5 rounded-2xl overflow-hidden shadow-lg z-10"
        style={{ x: rightX }}
      >
        <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover" />
      </motion.div>
    </>
  )
}