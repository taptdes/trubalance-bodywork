import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Heart, Instagram, Facebook, Mail, Phone, MapPin, FileText, HelpCircle } from 'lucide-react'
import logoImage from '/assets/branding/logo-mark.svg'

interface FooterProps {
  onSectionChange: (section: string) => void;
}

export function Footer({ onSectionChange }: FooterProps) {
  const quickLinks = [
    { id: 'about', label: 'About Brenden' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'contact', label: 'Contact Us' }
  ]

  const legalLinks = [
    { id: 'policies', label: 'Policies & Terms', icon: <FileText className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> }
  ]

  const services = [
    'Swedish Massage',
    'Deep Tissue Massage', 
    'Reiki Energy Healing',
    'Chakra Balancing',
    'Trauma-Informed Bodywork',
    'Sound Healing'
  ]

  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-linear-to-br from-teal-400 to-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 shadow-lg">
                <img
                  src={logoImage}
                  alt="TruBalance Bodywork Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-xl font-light tracking-wide">TruBalance</span>
                <div className="text-sm text-emerald-400 font-medium -mt-1">Bodywork</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Creating sacred spaces for healing and transformation through compassionate, 
              trauma-informed bodywork and energy healing.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-emerald-400">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onSectionChange(link.id)}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-4">
                <Button
                  onClick={() => onSectionChange('booking')}
                  className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Book Session
                </Button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-emerald-400">Healing Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => onSectionChange('services')}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-emerald-400">Connect With Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 text-emerald-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300">hello@trubalancebodywork.com</p>
                  <p className="text-gray-400 text-sm">We respond within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <Phone className="w-5 h-5 text-emerald-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300">(555) 123-4567</p>
                  <p className="text-gray-400 text-sm">Call or text for appointments</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300">
                    123 Healing Way<br />
                    Springfield, ST 12345
                  </p>
                  <p className="text-gray-400 text-sm">By appointment only</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <Separator className="bg-white/20 mb-8" />

        {/* Legal Links Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-emerald-400">Information & Policies</h3>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onSectionChange(link.id)}
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/10"
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400">
            © 2025 TruBalance Bodywork. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>for healing and wellness</span>
          </div>
        </div>

      </div>
    </footer>
  )
}