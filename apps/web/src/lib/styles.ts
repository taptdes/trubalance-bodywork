import type { OverlayVariant } from "./constants"

export const bgStyles = {
  lg: "fixed z-0 inset-0 object-cover hidden lg:block",
  md: "fixed z-0 inset-0 object-cover hidden md:block lg:hidden",
  sm: "fixed z-0 inset-0 object-cover block md:hidden",
}

export const HERO_VARIANT_STYLES = {
  fullscreen: "relative w-full flex flex-col overflow-hidden",
  split: "relative w-full flex flex-row overflow-hidden",
}

export const HERO_ALIGNMENT_STYLES = {
  center: "items-center justify-center text-center",
  left: "items-start justify-start text-left",
  right: "items-end justify-end text-right",
}

export const HERO_LAYOUT_STYLES = {
  default: "relative flex flex-col items-center",
  fullWidth: "relative flex flex-row w-full",
}

export const HERO_CONTENT_STYLES = {
  container: "relative z-20 flex flex-col items-center justify-center",
  title: "text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4",
  subheader: "text-lg md:text-xl text-gray-600 mb-6",
  buttons: "flex gap-4 justify-center mt-4",
  button: "px-8 py-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition",
}

export const OVERLAY_STYLES: Record<OverlayVariant, string> = {
  light: "absolute inset-0 bg-white/40",
  dark: "absolute inset-0 bg-black/40",
  gradient: "absolute inset-0 bg-gradient-to-b from-black/50 to-transparent",
}

export const GALLERY_SIZE_STYLES = {
  sm: "w-72 h-48",
  md: "w-96 h-64",
  lg: "w-[600px] h-[400px]",
}