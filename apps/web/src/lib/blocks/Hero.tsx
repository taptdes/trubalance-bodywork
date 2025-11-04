'use client'

import React, { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { HeroProps } from "@/lib/types"
import { BackgroundImages } from "@/lib/blocks/BG"
import { HERO_VARIANT_STYLES, HERO_ALIGNMENT_STYLES, HERO_LAYOUT_STYLES, OVERLAY_STYLES } from "@/lib/styles"

export const Hero: React.FC<HeroProps> = ({
  variant = "fullscreen",
  fullHeight = "screen",
  bg,
  overlays,
  alignment = "center",
  layout = "default",
  content,
  parallax = false,
  children,
}) => {
const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll() // Framer Motion MotionValue
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const contentY = useTransform(scrollY, [0, 300], [0, -100])
  const heroY = useTransform(scrollY, [0, 300], [0, -scrollY.get() / 3]) // optional, or useMotionValue
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => setMounted(true), [])

  if (!mounted) return null


  return (
    <section
      className={`${HERO_VARIANT_STYLES[variant]} ${HERO_ALIGNMENT_STYLES[alignment]} ${fullHeight === "screen" ? "h-screen" : ""} relative flex w-full overflow-hidden`}
    >
      {/* Background images */}
      {bg && (
        <BackgroundImages
          images={bg.images}
          fallback={bg.fallback}
          alt={bg.alt}
          className={bg.className}
          fixed={parallax || bg.fixed}
        />
      )}

      {/* Overlays */}
      {overlays?.map((overlay, i) => (
        <div key={i} className={OVERLAY_STYLES[overlay]} />
      ))}

      {/* Foreground content */}
      {content && (
        <motion.div
          className={`${HERO_LAYOUT_STYLES[layout]} relative z-20`}
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {content.badge && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary text-black text-sm font-semibold mb-2">
              {content.badge}
            </span>
          )}

          {content.title && <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-default mb-1">{content.title}</h1>}

          {content.subheader && <p className="text-5xl md:text-6xl lg:text-7xl font-semibold text-primary mb-4">{content.subheader}</p>}

          {content.buttons?.length && (
            <div className="flex gap-4 justify-center mt-4">
              {content.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className="px-8 py-3 rounded-full bg-gradient-primary text-white hover:bg-gradient-primary-dark transition"
                >
                  {btn.text}
                </button>
              ))}
            </div>
          )}

          {content.children}
        </motion.div>
      )}

      {/* Full-bleed children */}
      {children && <motion.div className="absolute inset-0 flex flex-col align-center justify-center left-0 right-0">{children}</motion.div>}  {/* I turned this into a motion.div and added the styles */}
    </section>
  )
}