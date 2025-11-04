import React from "react"
import clsx from "clsx"
import { OVERLAY_STYLES } from "@/lib/styles"
import type { OverlayProps } from "@/lib/types"
import type { OverlayVariant } from "@/lib/constants"

export const Overlay: React.FC<OverlayProps> = ({ variants = "none", className }) => {
  const variantArray = Array.isArray(variants) ? variants : [variants]

  const overlayClass = clsx(
    ...variantArray.map((v: OverlayVariant) => OVERLAY_STYLES[v]),
    className
  )

  return <div className={overlayClass} />
}