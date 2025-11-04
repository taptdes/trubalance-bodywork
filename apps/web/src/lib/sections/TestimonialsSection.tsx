import { Card, CardContent } from "@/components/ui/card/card"
import { Image } from "@/components/ui/image/image"
import { motion } from 'framer-motion'
import { Testimonials } from "@/components/testimonials"
const img1 = `${import.meta.env.VITE_API_URL}/assets/images/imgReviewsRochaIvan.webp`
const img2 = `${import.meta.env.VITE_API_URL}/assets/images/imgReviewsBainterBaxter.webp`
const img3 = `${import.meta.env.VITE_API_URL}/assets/images/imgReviewsFunkJessica.webp`
const img4 = `${import.meta.env.VITE_API_URL}/assets/images/imgReviewsNielsenTrev.webp`
const img5 = `${import.meta.env.VITE_API_URL}/assets/images/imgReviewsRigbyTiffany.webp`
const img6 = `${import.meta.env.VITE_API_URL}/assets/images/imgReviewsHerbertDerren.webp`

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ivan De Souza Rocha",
      location: "Salt Lake City, UT",
      text: "I couldn't be happier with how Brittany and her team treated me and my property when it came time to sell. She made me as much as a priority as she would anyone. And it saved me so much time having her taking care of the whole selling process. I would definitely recommend her!",
      rating: 5,
      image: img1,
      link: "https://www.facebook.com/plantingrootsrealty/reviews"
    },
    {
      name: "Baxter Bainter",
      location: "Spanish Fork, UT",
      text: "It was phenomenal working with Brittany as our agent. She was definitely on our side and was looking out for our best interests. Brittany walked us through the process as an expert and had the answer to all our questions. Whenever we are ready for our next move, Brittany will be our definite choice!!",
      rating: 5,
      image: img2,
      link: "https://www.facebook.com/plantingrootsrealty/reviews"
    },
    {
      name: "Jessica Funk",
      location: "Clawson, UT",
      text: "We bought a house and had fun throughout the whole process! BrittanyH is the coolest and knows her stuff! Thanks Brittany",
      rating: 5,
      image: img3,
      link: "https://www.facebook.com/plantingrootsrealty/reviews"
    },
    {
      name: "Trev Nielsen",
      location: "Salt Lake City, UT",
      text: "Brittany did all in her power to get us into a place and make everything perfect. Cannot recommend her enough!",
      rating: 5,
      image: img4,
      link: "https://www.facebook.com/plantingrootsrealty/reviews"
    },
    {
      name: "Tiffany Rigby",
      location: "Payson, UT",
      text: "Brittany is the best! She listens to you, she respects decisions, if you give her a list of things you like or dislike she will do her absolute best to make sure you are happy! I would 1000% recommend!!",
      rating: 5,
      image: img5,
      link: "https://www.facebook.com/plantingrootsrealty/reviews"
    },
    {
      name: "Derren Herbert",
      location: "Provo, UT",
      text: "Brittany is one of a kind. She really care about her clients. She puts her heart and soul into making buying and seeking your home a great experience.",
      rating: 5,
      image: img6,
      link: "https://www.facebook.com/plantingrootsrealty/reviews"
    }
  ]

  const handleCardClick = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  }

  return (
      <motion.section 
        className="py-20 w-full bg-gradient-to-br from-moss-100 to-mint-100 relative z-30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Healing <span className="text-emerald-600 font-medium">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from our wellness community
            </p>
          </div>
          <Testimonials onBookNow={() => { }}/>
        </div>
      </motion.section>
  )
}