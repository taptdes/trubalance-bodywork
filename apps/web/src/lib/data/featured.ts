const galleryImages = [
  { src: `${import.meta.env.VITE_BACKEND_URL}/images/services_swedish.webp`, type: "image" as const, alt: "Waxing" },
  { src: `${import.meta.env.VITE_BACKEND_URL}/images/services_clothed.webp`, type: "image" as const, alt: "Film still" },
  { src: `${import.meta.env.VITE_BACKEND_URL}/images/services_oil.webp`, type: "image" as const, alt: "Nails" },
]

export interface Service {
  title: string
  description: string
  image: string
  price: string
  duration: string
  featured: boolean
}

export const featured: Service[] = galleryImages.map((img, i) => ({
  title: ["Therapeutic Massage", "Reiki Energy Healing", "Trauma-Informed Care"][i],
  description: [
    "Deep tissue and Swedish massage techniques for physical healing and relaxation",
    "Gentle energy work to restore balance and promote deep healing",
    "Safe, compassionate bodywork that honors your healing process",
  ][i],
  image: img.src,
  price: ["$50-125", "$95", "$95"][i],
  duration: ["30 - 90 min", "60 min", "60 min"][i],
  featured: i === 0,
}))