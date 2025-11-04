import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ctaVariants } from "@/lib/blocks/styles"
import type { CTAProps } from "@/lib/blocks/types"

export function CTA({
  title,
  subtitle,
  children,
  className,
  variant = "primary",
  alignment = "center",
  container = true,
  animation = true
}: CTAProps) {
  const content = (
    <div className="space-y-6">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
      )}
      {children && <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">{children}</div>}
    </div>
  )

  return animation ? (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(ctaVariants({ variant, alignment, container }), className)}
    >
      {container ? <div className="max-w-4xl mx-auto">{content}</div> : content}
    </motion.section>
  ) : (
    <section className={cn(ctaVariants({ variant, alignment, container }), className)}>
      {container ? <div className="max-w-4xl mx-auto">{content}</div> : content}
    </section>
  )
}
