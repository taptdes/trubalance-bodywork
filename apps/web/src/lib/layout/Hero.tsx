'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { HeroProps } from '@/lib/types'
import type { OverlayVariant } from '@/lib/constants'
import {
  HERO_VARIANT_STYLES,
  HERO_ALIGNMENT_STYLES,
  HERO_CONTENT_STYLES,
  HERO_LAYOUT_STYLES,
  OVERLAY_STYLES,
  GALLERY_SIZE_STYLES,
} from '@/lib/styles'
import { BackgroundImages } from '@/lib/layout/BG'
import { HeroGallery } from '@/lib/layout/HeroGallery'

export const Hero: React.FC<HeroProps> = ({
  variant = 'fullscreen',
  fullHeight = 'screen',
  bg,
  overlays,
  alignment = 'center',
  layout = 'default',
  content,
  parallax = false,
  children,
}) => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()

  // Content scroll animations
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const contentY = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section
      className={`${HERO_VARIANT_STYLES[variant]} ${HERO_ALIGNMENT_STYLES[alignment]} ${
        fullHeight === 'screen' ? 'h-screen' : ''
      } relative flex flex-col w-full overflow-hidden`}
    >
      {/* Background images */}
      {bg && (
        <BackgroundImages
          images={bg.images}
          fallback={bg.fallback}
          alt={bg.alt}
          className={bg.className || ''}
          fixed={parallax || bg.fixed}
        />
      )}

      {/* Overlays */}
      {overlays?.map((overlay: OverlayVariant, i) => (
        <div key={i} className={OVERLAY_STYLES[overlay]} />
      ))}

      {/* Floating Image Collage */}
      {content?.gallery?.images && (
        <motion.div className="relative w-screen overflow-visible z-8 inset-0 flex items-center justify-center" style={{ opacity: 0.7 }}>
          <HeroGallery images={content.gallery.images} className={GALLERY_SIZE_STYLES[content.gallery.size || 'md']} />
        </motion.div>
      )}

      {/* Foreground content */}
      {content && (
        <motion.div
          className={`${HERO_CONTENT_STYLES.container} ${HERO_ALIGNMENT_STYLES[alignment]} ${HERO_LAYOUT_STYLES[layout]} ${content.className || ''}`}
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* White blur background behind content */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-lg rounded-3xl -mx-32 -my-16 z-10" />

          <div className="relative z-20 py-12 px-8 text-center">
            {content.badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-black text-sm font-semibold mb-2">
                {content.badge}
              </span>
            )}
            <h1 className={HERO_CONTENT_STYLES.title}>{content.title}</h1>
            {content.subheader && <p className={HERO_CONTENT_STYLES.subheader}>{content.subheader}</p>}

            {content.buttons && content.buttons.length > 0 && (
              <div className={HERO_CONTENT_STYLES.buttons}>
                {content.buttons.map((btn, idx) => (
                  <button key={idx} onClick={btn.onClick} className={HERO_CONTENT_STYLES.button}>
                    {btn.text}
                  </button>
                ))}
              </div>
            )}

            {content.children}
          </div>
        </motion.div>
      )}

      {/* Full-bleed children */}
      <div className="absolute bottom-0 left-0 right-0">{children}</div>
    </section>
  )
}