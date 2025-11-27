import { Image } from "@/components/ui/image"
import { AnimatedSection } from "./AnimatedSection"
import { motion } from "framer-motion"
import { Leaf, Heart, Gem, Users } from "lucide-react"
const backendUrl = import.meta.env.VITE_BACKEND_URL
const image = `${backendUrl}/static-images/imgHomeDetails.webp`

const features = [
  {
    icon: Leaf,
    title: "Natural & Organic",
    description: "We use only the finest organic products and natural ingredients in all our treatments."
  },
  {
    icon: Heart,
    title: "Holistic Wellness",
    description: "Our approach focuses on healing the whole person - body, mind, and spirit."
  },
  {
    icon: Gem,
    title: "Transparent Pricing",
    description: "No hidden fees or unexpected costs, ensuring you can relax without worries."
  },
  {
    icon: Users,
    title: "Personalized Care",
    description: "Every treatment is customized to meet your unique needs and preferences."
  }
]

export function Details() {
  return (
    <section id="about" className="relative w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Where Wellness Meets Luxury</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At TruBalance Bodywork, we pride ourselves on offering exceptional quality and personalized care in every session. Each massage is tailored to your individual needs, utilizing techniques such as cupping, aromatherapy, and advanced bodywork—ensuring no hidden fees or unexpected costs. 
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Gratuity is already included, so the price you see is the total price you pay—providing you with complete transparency. This allows you to fully relax and focus on your healing journey without any concerns.

            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-linear-to-r from-purple-100 to-pink-100 p-2 rounded-lg">
                      <feature.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="z-10"
              >
                <Image 
                  src={image}
                  alt="Peaceful spa interior with natural elements"
                  className="w-full h-96 z-10 object-cover rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 z-30 bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-center z-30">
                  <div className="text-2xl font-medium text-primary">13+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}