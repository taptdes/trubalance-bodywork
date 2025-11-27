const galleryImages = [
  { src: `${import.meta.env.VITE_BACKEND_URL}/static-images/imgServicesMassage.webp`, type: "image" as const, alt: "Therapeutic Massage" },
  { src: `${import.meta.env.VITE_BACKEND_URL}/static-images/imgServicesReiki.webp`, type: "image" as const, alt: "Reiki" },
  { src: `${import.meta.env.VITE_BACKEND_URL}/static-images/imgServicesTBBAlign.webp`, type: "image" as const, alt: "TruBalance Alignment Session" },
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
  title: ["Therapeutic Massage", "Reiki Energy Healing", "TruBalance Alignment Session"][i],
  description: [
    "Classic relaxation massage using flowing strokes to effectively reduce stress and promote circulation.",
    "Gentle energy work fosters balance and relaxation, promoting natural healing for mind, body, and spirit.",
    "Energy work that aligns your body and energy systems through a blend of intuitive techniques.",
  ][i],
  image: img.src,
  price: ["$50-125", "$50-120", "$125"][i],
  duration: ["30 - 90 min", "30 - 60 min", "60 min"][i],
  featured: i === 0,
}))