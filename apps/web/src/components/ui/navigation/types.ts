import React from "react"
import type { AvailableIcons } from '@/components/ui/Icon'

export type PageType =
  | 'home'
  | 'our-story'
  | 'booking'
  | 'resources'
  | 'blog'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'policies';

export interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  heroHeight?: number;
}

export interface Socials {
  platform: string;
  href: string;
  icon: AvailableIcons;
}

export interface FooterProps {
  socials?: Socials[];
  links?: { text: string; page: PageType }[];
  logo: React.ReactNode;
  name?: string;
  email?: string;
  phone?: string;
  licensing?: string;
  copyright?: number | string;
  privacy?: string;
  terms?: string;
  policy?: string;
}
