import { BGImage } from "@/components/ui/image"
import { bgStyles } from "@/lib/styles"
import { DEFAULT_BACKGROUND_ALT } from "@/lib/constants"
import type { BGProps, Breakpoint } from "@/lib/types"

export function BackgroundImages({
  images,
  fallback,
  alt = DEFAULT_BACKGROUND_ALT,
  className,
  fixed,
}: BGProps) {
  // If no responsive images are provided, use fallback
  const finalImages: Record<Breakpoint, string> = images ?? {
    sm: fallback ?? "",
    md: fallback ?? "",
    lg: fallback ?? "",
  }

  return (
    <>
      {/* Large screens */}
      <BGImage
        alt={alt}
        src={finalImages.lg}
        loading="lazy"
        className={`${bgStyles.lg} ${className ?? ""}`}
        style={fixed ? { position: "fixed" } : undefined}
      />

      {/* Tablets */}
      <BGImage
        alt={alt}
        src={finalImages.md}
        loading="lazy"
        className={`${bgStyles.md} ${className ?? ""}`}
        style={fixed ? { position: "fixed" } : undefined}
      />

      {/* Mobile — eager load */}
      <BGImage
        alt={alt}
        src={finalImages.sm}
        loading="eager"
        className={`${bgStyles.sm} ${className ?? ""}`}
        style={fixed ? { position: "fixed" } : undefined}
      />
    </>
  )
}