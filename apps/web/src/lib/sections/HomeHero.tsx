import type { PageType } from "@/components/ui/navigation/types"
import { Hero } from '@/lib/layout/Hero'

import imgOceanVibes from "@/assets/images/img_oceanVibes.jpg"
import imgOceanYoga from "@/assets/images/img_oceanYoga.jpg"
import imgOilDrops from "@/assets/images/img_oilsDrop.jpg"
import imgStones from "@/assets/images/img_stones.jpg"
import imgWaterRipple from "@/assets/images/img_waterRipples.jpg"
import imgYoga from "@/assets/images/img_yoga.jpg"
import imgRoom from "@/assets/images/img_room.jpg"
import bgImgSM from "@/assets/images/bg_whiteTexture.webp"
import bgImgMD from "@/assets/images/bg_whiteTexture.webp"
import bgImgLG from "@/assets/images/bg_whiteTexture.webp"

{/*
const heroImages = {
  sm: `${import.meta.env.VITE_API_URL}/assets/images/bgHomeHero-sm.webp`,
  md: `${import.meta.env.VITE_API_URL}/assets/images/bgHomeHero-md.webp`,
  lg: `${import.meta.env.VITE_API_URL}/assets/images/bgHomeHero-lg.webp`,
}
*/}

const heroImages = {
  sm: bgImgSM,
    md: bgImgMD,
  lg: bgImgLG

}

const galleryImages = [
  { src: imgOceanVibes, type: "image" as const, alt: "Ocean Vibes" },
  { src: imgOceanYoga, type: "image" as const, alt: "Ocean Yoga" },
  { src: imgOilDrops, type: "image" as const, alt: "Oil Drops" },
  { src: imgStones, type: "image" as const, alt: "Stones" },
  { src: imgWaterRipple, type: "image" as const, alt: "Water Ripple" },
  { src: imgYoga, type: "image" as const, alt: "Yoga" },
  { src: imgRoom, type: "image" as const, alt: "Room" },
]

{/*
const galleryImages = [
  { src: `${import.meta.env.VITE_API_URL}/assets/images/img_oceanVibes.jpg`, type: "image" as const, alt: "Waxing" },
  { src: `${import.meta.env.VITE_API_URL}/assets/images/img_oceanYoga.jpg`, type: "image" as const, alt: "Film still" },
  { src: `${import.meta.env.VITE_API_URL}/assets/images/img_oilDrops.jpg`, type: "image" as const, alt: "Nails" },
  { src: `${import.meta.env.VITE_API_URL}/assets/images/img_stones.jpg`, type: "image" as const, alt: "stones" },
  { src: `${import.meta.env.VITE_API_URL}/assets/images/img_waterRipple.jpg`, type: "image" as const, alt: "Shower" },
  { src: `${import.meta.env.VITE_API_URL}/assets/images/img_yoga.jpg`, type: "image" as const, alt: "Neck Pillow" },
  { src: `${import.meta.env.VITE_API_URL}/assets/images/img_room.jpg`, type: "image" as const, alt: "Massage Table" },
]
*/}

export function HomeHero({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <Hero
      variant="fullscreen"
      fullHeight="screen"
      alignment="center"
      layout="default"
      parallax
      bg={{
        fixed: true,
        images: heroImages,
        alt: "Modern home with large windows",
        semiTransparentWhiteBg: true,
        blur: true,
        className: "z-0"
      }}
      content={{
        title: "Renew Your Energy",
        subheader: "Holistic Massage Experience",
        buttons: [
          {
            text: "Book now",
            onClick: () => onNavigate("booking"),
          }
        ],
        gallery: { images: galleryImages }
      }}
    >
    </Hero>
  )
}