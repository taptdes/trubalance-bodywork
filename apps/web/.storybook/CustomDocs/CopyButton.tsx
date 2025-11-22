import React, { useState, useEffect, useRef } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
  onCopy?: () => void
  copiedIcon?: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  onCopy,
  copiedIcon,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const timeoutRef = useRef<number | null>(null)

  const handleCopy = () => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not available')
      return
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true)
        timeoutRef.current = window.setTimeout(() => {
          setIsCopied(false)
        }, 2000)

        if (onCopy) {
          onCopy()
        }

        // keep a console trace for debugging
         
        console.log(`Copied to clipboard: ${text}`)
      })
      .catch(err => {
         
        console.error('Failed to copy text to clipboard:', err)
      })
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <button
      type="button"
      style={{
        position: 'absolute',
        cursor: 'pointer',
        padding: '4px 10px',
        top: 0,
        right: 0,
        borderLeft: '1px solid hsla(203, 50%, 30%, 0.15)',
        borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)',
        borderTop: 'none',
        borderRight: 'none',
        borderBottomLeftRadius: '4px',
        borderTopRightRadius: '4px',
        background: 'white',
        color: '#2E3438',
        fontSize: '12px',
        fontWeight: 700,
      }}
      onClick={handleCopy}
      aria-label={label}
    >
      {isCopied ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {copiedIcon && (
            <i className={`icon-${copiedIcon}`} aria-hidden style={{ color: 'white' }} />
          )}
          <span>Copied</span>
        </span>
      ) : (
        <span>{label}</span>
      )}
    </button>
  )
}
