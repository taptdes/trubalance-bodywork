import type { PageType } from "./types"
import type { Socials } from "./types"

export const navitems: { text: string; page: PageType }[] = [
  { text: 'Home', page: 'home' },
  { text: 'About', page: 'our-story' },
  { text: 'Booking', page: 'booking' },
  { text: 'Resources', page: 'resources' },
  { text: 'Contact', page: 'contact' },
]

export const PHONE_NUMBER = "(801) 400-9242"

export const defaultSocials: Socials[] = [
  { platform: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { platform: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { platform: "Instagram", href: "https://instagram.com", icon: "instagram" },
]

export const moreLinks: { text: string; page: PageType }[] = [
  { text: 'Privacy', page: 'privacy' },
  { text: 'Terms', page: 'terms' },
  { text: 'Policies', page: 'policies' },
]

export const companyName = "Planting Roots Realty"
export const copyrightYear = new Date().getFullYear()
