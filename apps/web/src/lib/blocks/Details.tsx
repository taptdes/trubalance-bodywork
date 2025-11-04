import { Image } from "@/components/ui/image"
import { AnimatedSection } from "./AnimatedSection"
import { motion } from "framer-motion"
import { Leaf, Heart, Star, Users } from "lucide-react"

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
    icon: Star,
    title: "Expert Therapists",
    description: "Our certified professionals have years of experience in luxury spa treatments."
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
              At Serenity Spa, we believe that true wellness comes from harmony between mind, body, and spirit. 
              Our sanctuary offers a peaceful escape from the everyday, where you can reconnect with yourself 
              and experience profound relaxation.
            </p>
            <p className="text-muted-foreground mb-8">
              Founded with a passion for holistic wellness, we've created a space where ancient healing 
              traditions meet modern luxury. Every detail has been carefully designed to transport you 
              to a world of tranquility and restoration.
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
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
                  <div className="text-2xl font-medium text-primary">15+</div>
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