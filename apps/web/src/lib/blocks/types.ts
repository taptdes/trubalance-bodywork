import type { ReactNode } from "react"

export interface CTAProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "transparent"
  alignment?: "left" | "center" | "right"
  container?: boolean
  animation?: boolean // whether to animate with framer-motion
}