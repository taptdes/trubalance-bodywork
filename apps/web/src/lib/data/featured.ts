import imgCard1 from '@/assets/images/img_oceanVibes.jpg'
import imgCard2 from '@/assets/images/img_oceanVibes.jpg'
import imgCard3 from '@/assets/images/img_oceanVibes.jpg'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export interface Service {
  title: string
  description: string
  image: string
  price: string
  duration: string
  featured: boolean
}

export const featured: Service[] = [
  {
    title: "Therapeutic Massage",
    description: "Deep tissue and Swedish massage techniques for physical healing and relaxation",
    image: `${backendUrl}/images/services_swedish.webp`,
    price: "$50-125",
    duration: "30 - 90 min",
    featured: true,
  },
  {
    title: "Reiki Energy Healing",
    description: "Gentle energy work to restore balance and promote deep healing",
    image: `${backendUrl}/images/services_reiki.webp`,
    price: "$95",
    duration: "60 min",
    featured: false,
  },
  {
    title: "Trauma-Informed Care",
    description: "Safe, compassionate bodywork that honors your healing process",
    image: `${backendUrl}/images/services_clothed.webp`,
    price: "$95",
    duration: "60 min",
    featured: false,
  },
]

 