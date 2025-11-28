import { Waves, Sparkles, Star } from 'lucide-react'
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
    durations: [30, 60, 90],
    prices: { 30: 50, 60: 95, 90: 125 },
    description: "Classic relaxation massage using flowing strokes to reduce stress and promote circulation.",
    icon: <Waves className="w-6 h-6" />,
    image: `${backendUrl}/static-images/imgServicesMassage.webp`,
    modality: 'massage' as const,
    popularity: 1
  },
  {
    title: "Reiki Energy Healing",
     durations: [30, 60],
    prices: { 30: 50, 60: 120 },
    description: "Gentle energy work fosters balance and relaxation, promoting natural healing for mind, body, and spirit.",
    icon: <Sparkles className="w-6 h-6" />,
    image: `${backendUrl}/static-images/imgServicesReiki.webp`,
      modality: 'energy' as const,
    popularity: 3  },
  {
    title: "TruBalance Alignment Session",
    durations: [60],
    prices: { 60: 125},
    description: "Energy work that aligns your body and energy systems through a blend of intuitive techniques.",
    icon: <Star className="w-6 h-6" />,
    image: `${backendUrl}/static-images/imgServicesTBBAlign.webp`,
      modality: 'energy' as const,
    popularity: 4  },
]