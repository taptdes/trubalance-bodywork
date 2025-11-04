import { cn } from "@/lib/utils"

export const ctaVariants = ({ variant, alignment, container }: { variant?: string; alignment?: "left" | "center" | "right"; container?: boolean }) => {
  const base = "py-16 px-4 sm:px-6 lg:px-8"
  const alignClasses =
    alignment === "left" ? "text-left" :
    alignment === "right" ? "text-right" :
    "text-center"
  
  const variantClasses =
    variant === "primary" ? "bg-blue-600 text-white" :
    variant === "secondary" ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100" :
    "bg-transparent"

  const containerClass = container ? "max-w-7xl mx-auto" : ""
  
  return cn(base, alignClasses, variantClasses, containerClass)
}