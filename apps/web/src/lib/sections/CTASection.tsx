import { motion } from "framer-motion"
import type { PageType } from "@/components/ui/navigation/types"
import { Button } from "@/components/ui/button"

export function CTA({ onNavigate }: { onNavigate: (page: PageType) => void }) {

  return (
    <motion.section
      className="py-20 bg-white relative z-30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-gray-900 mb-6">
          Ready to Begin Your <span className="text-emerald-600 font-medium">Healing Journey?</span>
        </h2>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Take the first step towards wellness and transformation.
          Book your personalized session today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => onNavigate("booking")}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Book Your Session
          </Button>
          <Button
            onClick={() => onNavigate('about')}
            variant="outlined"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-full"
          >
            Learn About Brenden
          </Button>
        </div>
      </div>
    </motion.section>
  )
}