import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator/separator"
import type { PageType } from "@/components/ui/navigation/types"

export function Footer({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <footer className="relative shrink-0 w-full bg-[#1a1a1a] text-white">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-start px-2.5 py-[80px] relative w-full">
          <div className="max-w-[1140px] relative shrink-0 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-['Merriweather:Bold',_sans-serif] text-[24px] font-bold mb-4">
                    Planting Roots Realty
                  </h3>
                  <p className="font-['Karla:Regular',_sans-serif] text-white/80 text-[16px] leading-relaxed">
                    Your trusted Utah County real estate expert, helping families find their perfect home with nearly 6 years of experience.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-['Karla:Medium',_sans-serif] text-white font-medium">Brittni Bingham</p>
                  <p className="font-['Karla:Regular',_sans-serif] text-white/80 text-[14px]">Licensed Real Estate Agent</p>
                  <p className="font-['Karla:Regular',_sans-serif] text-white/80 text-[14px]">Utah County & Surrounding Areas</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="font-['Merriweather:Bold',_sans-serif] text-[20px] font-bold">Quick Links</h4>
                <div className="space-y-3">
                  {[
                    { text: 'Home', page: 'home' as PageType },
                    { text: 'Our Story', page: 'our-story' as PageType },
                    { text: 'Listings', page: 'listings' as PageType },
                    { text: 'Blog', page: 'blogs' as PageType },
                    { text: 'Contact', page: 'contact' as PageType }
                  ].map((link, index) => (
                    <button
                      key={index}
                      onClick={() => onNavigate(link.page)}
                      className="block font-['Karla:Regular',_sans-serif] text-white/80 hover:text-white transition-colors text-[16px] text-left"
                    >
                      {link.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="space-y-6">
                <h4 className="font-['Merriweather:Bold',_sans-serif] text-[20px] font-bold">Services</h4>
                <div className="space-y-3">
                  {[
                    'Home Buying',
                    'Home Selling', 
                    'Investment Properties',
                    'Market Analysis',
                    'First-Time Buyers',
                    'Relocation Services'
                  ].map((service, index) => (
                    <p key={index} className="font-['Karla:Regular',_sans-serif] text-white/80 text-[16px]">
                      {service}
                    </p>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h4 className="font-['Merriweather:Bold',_sans-serif] text-[20px] font-bold">Get In Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[20px]">📱</span>
                    <a href="tel:+18014009242" className="font-['Karla:Regular',_sans-serif] text-white/80 hover:text-white transition-colors">
                      (801) 400-9242
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[20px]">📧</span>
                    <a href="mailto:brittni@plantingrootsrealty.com" className="font-['Karla:Regular',_sans-serif] text-white/80 hover:text-white transition-colors">
                      brittni@plantingrootsrealty.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[20px]">📍</span>
                    <span className="font-['Karla:Regular',_sans-serif] text-white/80">
                      Utah County, UT
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  <h5 className="font-['Karla:Medium',_sans-serif] text-white font-medium">Follow Me</h5>
                  <div className="flex gap-3">
                    {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((platform, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        size="sm"
                        className="border-white/30 text-white/80 hover:bg-white/10 hover:text-white"
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/20 mb-8" />

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="font-['Karla:Regular',_sans-serif] text-white/60 text-[14px]">
                © 2024 Planting Roots Realty. All rights reserved.
              </div>
              <div className="flex gap-6">
                <button className="font-['Karla:Regular',_sans-serif] text-white/60 hover:text-white/80 transition-colors text-[14px]">
                  Privacy Policy
                </button>
                <button className="font-['Karla:Regular',_sans-serif] text-white/60 hover:text-white/80 transition-colors text-[14px]">
                  Terms of Service
                </button>
                <button className="font-['Karla:Regular',_sans-serif] text-white/60 hover:text-white/80 transition-colors text-[14px]">
                  Equal Housing Opportunity
                </button>
              </div>
            </div>

            {/* License Info */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="font-['Karla:Regular',_sans-serif] text-white/60 text-[12px] text-center leading-relaxed">
                Brittni Bingham - Licensed Real Estate Agent in Utah. 
                All information deemed reliable but not guaranteed. 
                Equal Housing Opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}