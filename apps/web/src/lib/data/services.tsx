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
    title: "Therapeutic Massage",
    durations: [30, 60],
    prices: { 30: 50, 60: 95 },
    description: "Classic relaxation massage using flowing strokes to reduce stress and promote circulation. Perfect for first-time clients.",
    icon: <Waves className="w-6 h-6" />,
    image: `${backendUrl}/images/imgServicesMassage.webp`,
    modality: 'massage' as const,
    popularity: 1
  },
  {
    title: "TruBalance Massage",
    durations: [90],
    prices: { 90: 125 },
    description: "A more specialized and focused massage for those with chronic tension, targeting areas of discomfort while delivering a full-body experience.",
    icon: <Zap className="w-6 h-6" />,
    image: `${backendUrl}/images/imgServicesTBBMassage.webp`,
       modality: 'massage' as const,
    popularity: 2
  },
  {
    title: "Reiki Energy Healing",
     durations: [30, 60],
    prices: { 30: 50, 60: 95 },
    description: "Gentle hands-on energy work to promote balance, relaxation, and natural healing of mind, body, and spirit.",
    icon: <Sparkles className="w-6 h-6" />,
    image: `${backendUrl}/images/imgServicesReiki.webp`,
      modality: 'energy' as const,
    popularity: 3  },
  {
    title: "TruBalance Alignment Session",
    durations: [60, 90],
    prices: { 60: 90, 90: 130 },
    description: "Energy work that harmonizes your body and energy systems using intuitive techniques, sound healing, and breathwork.",
    icon: <Star className="w-6 h-6" />,
    image: `${backendUrl}/images/imgServicesTBBAlign.webp`,
      modality: 'energy' as const,
    popularity: 4  },
]