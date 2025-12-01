import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/Icon' // HeartFilled / HeartOutlined wrapper

interface LikeButtonProps {
  articleId: string
  initialLiked?: boolean
  onToggle: () => void // parent handles counter
}

export function LikeButton({ articleId, initialLiked = false, onToggle }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [loading, setLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (loading) return

    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/articles/${articleId}/like`, {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Failed to like article')

      // Success: toggle local state
      setLiked(prev => !prev)

      // Inform parent to update counter
      onToggle()
    } catch (err) {
      console.error('Error liking article:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      disabled={loading}
      className="text-red-500 hover:text-red-600"
    >
      {liked ? <Icon name="heartFilled" className="w-5 h-5" /> : <Icon name="heartOutlined" className="w-5 h-5" />}
    </Button>
  )
}