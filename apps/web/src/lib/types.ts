import type { OverlayVariant } from "./constants"
import type { PageType } from "@/components/ui/navigation/types"

// Responsive breakpoints
export type Breakpoint = "sm" | "md" | "lg"

// Background / Hero images
export interface BGProps {
  fixed?: boolean
  images?: Record<Breakpoint, string> // responsive images
  fallback?: string // fallback for single image
  alt?: string
  semiTransparentWhiteBg?: boolean
  blur?: boolean
  className?: string
}

// Generic feature section props (for services, etc.)
export interface FeatureProps {
  title: string
  description: string
  buttons?: { text: string; to: string }[]
  onNavigate: (page: PageType) => void  // ✅ PageType used here
}

// Hero component types
export type HeroHeight = "screen" | "md" | "sm"
export type HeroVariant = "fullscreen" | "split"
export type HeroAlignment = "center" | "left" | "right"
export type HeroLayout = "default" | "fullWidth"

// Hero Gallery
export interface HeroGalleryImage {
  src: string
  alt?: string
  type?: "image" | "video"
}

export interface HeroGalleryContent {
  images: HeroGalleryImage[]
  size?: "sm" | "md" | "lg"
}

// Hero buttons
export interface HeroButton {
  text: string
  onClick: () => void
}

// Hero content (central title, subheader, gallery, buttons)
export interface HeroContent {
  title: string
  subheader?: string
  badge?: string
  buttons?: HeroButton[]
  gallery?: HeroGalleryContent
  className?: string
  children?: React.ReactNode
  onNavigate?: (page: PageType) => void  // ✅ Optional navigation at content level
}

// Full Hero props
export interface HeroProps {
  variant?: HeroVariant
  fullHeight?: HeroHeight | string
  bg?: BGProps
  overlays?: OverlayVariant[]
  alignment?: HeroAlignment
  layout?: HeroLayout
  content?: HeroContent
  parallax?: boolean
  children?: React.ReactNode
}

export interface HomeHeroProps {
  onNavigate: (page: PageType) => void;
    onBookNow?: () => void;

}