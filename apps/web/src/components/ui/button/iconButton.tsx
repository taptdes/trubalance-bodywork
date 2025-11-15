'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { sizeClasses, type IconButtonProps } from '@/components/ui/button'

export const IconButton = ({
  name,
  size = 'md',
  count = 0,
  expandable,
  expandedContent,
  isHero,
  isScrolled,
  className,
  onClick,
  ...props
}: IconButtonProps) => {
  const [expanded, setExpanded] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (expandable) setExpanded(!expanded)
    onClick?.(e)
  }

  const state = isHero && !isScrolled ? 'hero' : 'scrolled'
  const buttonClasses = cn(sizeClasses({ size, state }), className)

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleClick}
        className={buttonClasses}
        {...props}
      >
        <Icon name={name} size={size} className="pointer-events-none" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FDB913] text-white text-xs font-bold rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {expandable && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="origin-left inline-flex ml-2 overflow-hidden"
            >
              {expandedContent ?? (
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-2 rounded-md border border-neutral-300/30 focus:outline-none text-sm"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}