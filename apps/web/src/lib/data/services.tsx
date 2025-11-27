import { Waves, Zap, Sparkles, Star } from 'lucide-react'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export interface ServicePage {
  title: string
  durations: number[]
  prices: Record<number, number>
  description: string
  icon: React.ReactElement
  image: string
  modality: string
  popularity: number
}

export const services: ServicePage[] = [
  {
    title: "Swedish Massage",
    durations: [60, 90],
    prices: { 60: 90, 90: 130 },
    description: "Classic relaxation massage using flowing strokes to reduce stress and promote circulation. Perfect for first-time clients.",
    icon: <Waves className="w-6 h-6" />,
    image: `${backendUrl}/static-images/services_swedish.webp`,
    modality: 'massage' as const,
    popularity: 1
  },
  {
    title: "Deep Tissue Massage",
    durations: [60, 90],
    prices: { 60: 90, 90: 130 },
    description: "Targeted work on chronic tension and knots using deeper pressure and specific techniques for lasting relief.",
    icon: <Zap className="w-6 h-6" />,
    image: `${backendUrl}/static-images/services_dt.webp`,
       modality: 'massage' as const,
    popularity: 2
  },
  {
    title: "Reiki Energy Healing",
     durations: [60, 90],
    prices: { 60: 90, 90: 130 },
    description: "Gentle hands-on energy work to promote balance, relaxation, and natural healing of mind, body, and spirit.",
    icon: <Sparkles className="w-6 h-6" />,
    image: `${backendUrl}/static-images/services_reiki.webp`,
      modality: 'energy' as const,
    popularity: 3  },
  {
    title: "TruBalance Alignment Session",
    durations: [60, 90],
    prices: { 60: 90, 90: 130 },
    description: "Energy alignment session using crystals, tuning forks, and guided visualization to restore harmony.",
    icon: <Star className="w-6 h-6" />,
    image: `${backendUrl}/static-images/services_clothed.webp`,
      modality: 'trauma' as const,
    popularity: 4  },
]