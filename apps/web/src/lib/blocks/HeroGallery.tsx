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
        className="absolute hidden md:block -left-66 top-1/3 w-1/4 max-w-76 aspect-4/5 rounded-2xl overflow-hidden shadow-lg z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        style={{ x: leftX }}
      >
        <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
      </motion.div>
      {/* Left Container */}
      <div className="absolute hidden left-1/16 top-1/6 md:flex flex-col gap-8 w-1/4 sm:w-1/4 max-w-76 z-10">

        {/* Left Top */}
        <motion.div
          className="aspect-4/5 rounded-2xl overflow-hidden shadow-lg"
          style={{ x: leftX }}
        >
          <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
        </motion.div>

        {/* Left Bottom */}
        <motion.div
          className="aspect-3/2 rounded-2xl overflow-hidden shadow-md"
          style={{ x: leftX }}
        >
          <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
        </motion.div>
      </div>
      {/* Far Right Image - Barely visible initially */}
      <motion.div
        className="absolute hidden md:block -right-66 top-1/3 w-1/4 max-w-76 aspect-4/5 rounded-2xl overflow-hidden shadow-lg z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
        style={{ x: rightX }}
      >
        <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
      </motion.div>

      {/* Center */}
      <motion.div
        className="absolute left-1/2 top-5/9 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/5 md:max-w-156 aspect-2/3 md:aspect-20/21 rounded-2xl overflow-hidden shadow-2xl z-20"
        style={{ scale: centerScale }}
      >
        <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
      </motion.div>
      {/* Right Container */}
      <div className="absolute hidden right-1/16 top-1/6 w-1/4 md:flex flex-col gap-8 max-w-76 z-10">

        {/* Right Top */}
        <motion.div
          className="aspect-3/2 rounded-2xl overflow-hidden shadow-md"
          style={{ x: rightX }}
        >
          <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover" />
        </motion.div>

        {/* Right Bottom */}
        <motion.div
          className="aspect-4/5 rounded-2xl overflow-hidden shadow-lg"
          style={{ x: rightX }}
        >
          <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </>
  )
}