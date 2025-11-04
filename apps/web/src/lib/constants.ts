import type { HeroVariant, HeroAlignment, HeroLayout } from "./types"

export type OverlayVariant = "light" | "dark" | "gradient"

export const BREAKPOINTS: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
}

export const DEFAULT_BACKGROUND_ALT = "Background image"

export const DEFAULT_HERO_VARIANT: OverlayVariant = "light"

export const HERO_VARIANTS: HeroVariant[] = ["fullscreen", "split"]
export const HERO_ALIGNMENTS: HeroAlignment[] = ["center", "left", "right"]
export const HERO_LAYOUTS: HeroLayout[] = ["default", "fullWidth"]