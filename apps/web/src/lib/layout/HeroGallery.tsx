import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface HeroGalleryProps {
  images: {
    src: string;
    alt?: string;
    type?: "image" | "video"
  }[]
  className?: string;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ images }) => {

  const { scrollY } = useScroll()

  // Animate side images outward
  const leftX = useTransform(scrollY, [0, 300], [0, -100])   // move left
  const rightX = useTransform(scrollY, [0, 300], [0, 100])   // move right

  // Animate center image scaling
  const centerScale = useTransform(scrollY, [0, 300], [1, 1.2])

  return (
    <div className="flex w-[120%] pt-60 absolute overflow-hidden z-20 gap-4 justify-center items-center">
      {/* Column 1 - Tall single */}
      <motion.div style={{ x: leftX }} className="flex w-1/4 justify-center items-center">
        <div className="h-80 w-full overflow-hidden rounded-xl">
          <img src={images[0].src} alt={images[0].alt} className="object-cover w-full h-full" />
        </div>
      </motion.div>

      {/* Column 2 - Stacked small */}
      <motion.div style={{ x: leftX }} className="flex w-1/4 flex-col gap-4">
        <div className="h-80 w-full overflow-hidden rounded-xl">
          <img src={images[1].src} alt={images[1].alt} className="object-cover w-full h-full" />
        </div>
        <div className="h-40 w-full overflow-hidden rounded-xl">
          <img src={images[2].src} alt={images[2].alt} className="object-cover w-full h-full" />
        </div>
      </motion.div>

      {/* Column 3 - Big with clip-path (video or image) */}
      <motion.div style={{ scale: centerScale }} className="flex pt-80 w-4/7 justify-center items-center">
        <div className="overflow-hidden w-full h-140 rounded-xl [clip-path:inset(0)]">
          {images[3].type === "video" ? (
            <video
              src={images[3].src}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          ) : (
            <img src={images[3].src} alt={images[3].alt} className="object-cover w-full h-full" />
          )}
        </div>
      </motion.div>

      {/* Column 4 - Stacked opposite */}
      <motion.div style={{ x: rightX }} className="flex w-1/4 flex-col gap-4">
        <div className="h-40 w-full overflow-hidden rounded-xl">
          <img src={images[4].src} alt={images[4].alt} className="object-cover w-full h-full" />
        </div>
        <div className="h-80 w-full overflow-hidden rounded-xl">
          <img src={images[5].src} alt={images[5].alt} className="object-cover w-full h-full" />
        </div>
      </motion.div>

      {/* Column 5 - Tall single */}
      <motion.div style={{ x: rightX }} className="flex w-1/4 justify-center items-center">
        <div className="h-80 w-full overflow-hidden rounded-xl">
          <img src={images[6].src} alt={images[6].alt} className="object-cover w-full h-full" />
        </div>
      </motion.div>
    </div>
  )
}
