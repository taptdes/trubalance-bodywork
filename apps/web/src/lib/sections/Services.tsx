import { motion } from 'framer-motion'
import { Heart, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PageType } from "@/components/ui/navigation/types"
import { featured } from '@/lib/data'

export function Services({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <div className="relative shrink-0 w-full bg-white">
      <motion.section
        className="py-20 bg-white relative z-30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-stone-900 mb-6">
              Healing <span className="bg-linear-to-r from-sage-400 to-sage-700 bg-clip-text text-transparent font-medium">Modalities</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Each service is designed to support your unique healing journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featured
            .map((featured, index) => (
              <motion.div
                key={featured.title}
                className="bg-white/80 rounded-[21px] overflow-hidden shadow-[0px_10px_25px_-5px_rgba(107,68,35,0.1),0px_10px_10px_-5px_rgba(107,68,35,0.04)] hover:shadow-[0px_15px_30px_-5px_rgba(107,68,35,0.15)] transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Image Section */}
                <div className="relative h-[252px] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                  {/* Featured Badge */}
                  {featured.featured && (
                    <div className="absolute top-4 left-4 text-secondary bg-white/70 backdrop-blur-lg rounded-full px-4 py-1.5 flex items-center justify-center gap-2">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.35207 0.00778502C5.41885 0.017607 5.48428 0.037129 5.54595 0.065621L5.63543 0.114558L5.71851 0.176842C5.77019 0.221895 5.81585 0.27449 5.8538 0.33255L5.90493 0.42375L7.00745 2.75607C7.04584 2.83709 7.10255 2.90752 7.17256 2.96071C7.24261 3.01384 7.32444 3.04878 7.4101 3.06192L9.8751 3.43785L9.9741 3.46121C10.0712 3.49081 10.1625 3.54062 10.2404 3.60913C10.3184 3.67777 10.3814 3.76329 10.4258 3.85827L10.4641 3.95726L10.4886 4.05958C10.5063 4.16395 10.5035 4.27178 10.479 4.37545C10.4465 4.51327 10.3771 4.63883 10.2798 4.73803L8.49664 6.55094C8.43449 6.61417 8.38823 6.69279 8.36136 6.77894C8.33454 6.86502 8.32765 6.95664 8.34218 7.04587L8.76295 9.6051L8.7736 9.7107C8.77714 9.817 8.75982 9.9239 8.72141 10.0233C8.67023 10.1554 8.58359 10.2697 8.47321 10.3536C8.36269 10.4374 8.23129 10.4881 8.09505 10.4982C7.95869 10.5081 7.82161 10.4773 7.70091 10.4103L5.49908 9.20134C5.42264 9.15952 5.33717 9.13809 5.25088 9.13795C5.20759 9.13795 5.16371 9.1428 5.12198 9.15352L5.00161 9.20134L2.79871 10.4114L2.79765 10.4103C2.67746 10.4764 2.54221 10.507 2.40671 10.4971C2.27053 10.487 2.139 10.4374 2.02855 10.3536C1.91807 10.2697 1.83264 10.1544 1.78141 10.0222C1.7303 9.89 1.71521 9.7455 1.73881 9.6051L2.15851 7.04699L2.1649 6.9113C2.16177 6.86655 2.15377 6.82192 2.1404 6.77894C2.11356 6.69284 2.06721 6.61415 2.00511 6.55094L0.221914 4.73914L0.222979 4.73803C0.125364 4.63907 0.0546101 4.51442 0.0216501 4.37656C-0.0113299 4.23825 -0.00656585 4.09285 0.0354982 3.95726L0.0738461 3.85827C0.118476 3.76268 0.182773 3.67804 0.26133 3.60913L0.34335 3.54574C0.42885 3.48999 0.52517 3.45308 0.62564 3.43785L3.09059 3.06192C3.17618 3.0488 3.2592 3.0138 3.3292 2.96071C3.39916 2.90753 3.45596 2.83707 3.49431 2.75607L4.59576 0.42487C4.65611 0.29769 4.7498 0.189447 4.86526 0.114558L4.95581 0.065621C5.04834 0.022988 5.149 0 5.25088 0L5.35207 0.00778502Z" fill="currentColor" />
                      </svg>


                      <span className="text-[10.5px] font-semibold">Most Loved</span>
                    </div>
                  )}

                  {/* Heart Button */}
                  <button
                    className="absolute top-[196px] right-4 w-[42px] h-[42px] bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <Heart className="w-5 h-5 text-primary" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-[17.5px] tracking-[0.4375px] text-gray-900 mb-1.5">{featured.title}</h3>
                    <p className="text-[14px] leading-[22.75px] text-gray-600">{featured.description}</p>
                  </div>

                  {/* Duration & Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-600" />
                      <span className="text-[12.25px] text-gray-600">{featured.duration}</span>
                    </div>
                    <span className="text-[21px] leading-7 tracking-[-0.525px] text-primary">{featured.price}</span>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => onNavigate('booking')}
                    className="w-full btn-gradient-primary hover:btn-gradient-primary text-white py-3 rounded-full shadow-[0px_8px_20px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0px_10px_25px_-12px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2.5"
                  >
                    <span className="text-[15.75px] font-semibold tracking-[-0.2922px]">Book Your Session</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.38138 0.256283C6.72309 -0.0854276 7.27698 -0.0854276 7.61869 0.256283L13.7437 6.38131C14.0854 6.72302 14.0854 7.27691 13.7437 7.61862L7.61869 13.7437C7.27698 14.0854 6.72309 14.0854 6.38138 13.7437C6.03967 13.4019 6.03967 12.8481 6.38138 12.5063L11.0127 7.87497H0.875004C0.391753 7.87497 0 7.48322 0 6.99997C0 6.51672 0.391753 6.12496 0.875004 6.12496H11.0127L6.38138 1.49359C6.03967 1.15188 6.03967 0.597993 6.38138 0.256283Z" fill="white" />
                    </svg>

                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate('services')}
              className="bg-white border border-stone-500 text-black hover:bg-secondary hover:text-white px-8 py-3 rounded-full"
            >
              View All Services
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}