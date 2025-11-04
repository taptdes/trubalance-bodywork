import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from '@/components/ui/card/card'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

interface TestimonialsProps {
  onBookNow: () => void;
}

export function Testimonials({ onBookNow }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah M.",
      service: "Swedish Massage",
      text: "Brenden created such a safe and nurturing space for healing. I've been dealing with chronic tension for years, and after just one session, I felt more relaxed than I have in months. The trauma-informed approach made all the difference.",
      rating: 5
    },
    {
      name: "Michael R.",
      service: "Deep Tissue & Reiki",
      text: "I was skeptical about energy work, but the combination of deep tissue massage and Reiki was transformative. Brenden's intuitive touch and calming presence helped me release tension I didn't even know I was holding.",
      rating: 5
    },
    {
      name: "Jennifer L.",
      service: "Chakra Balancing",
      text: "The sound healing session with tuning forks was incredible. I could feel the vibrations working through my body, and I left feeling completely balanced and renewed. Highly recommend for anyone seeking holistic healing.",
      rating: 5
    },
    {
      name: "David T.",
      service: "Trauma-Informed Bodywork",
      text: "As someone with PTSD, finding a practitioner who truly understands trauma-informed care has been life-changing. Brenden's gentle approach and respect for boundaries made me feel completely safe throughout the session.",
      rating: 5
    },
    {
      name: "Maria C.",
      service: "Reiki Energy Healing",
      text: "I came in feeling emotionally drained and left feeling like a weight had been lifted off my shoulders. The energy work was subtle but powerful - I slept better that night than I had in weeks.",
      rating: 5
    },
    {
      name: "Robert K.",
      service: "Swedish Massage Package",
      text: "I've been seeing Brenden monthly for the past year as part of my wellness routine. Each session is tailored to exactly what my body needs that day. The consistency and quality of care is outstanding.",
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-emerald-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">Client Testimonials</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our clients about their healing journeys and transformative experiences
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative mb-16">
          <Card className="max-w-4xl mx-auto bg-white shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <Quote className="w-12 h-12 text-emerald-600 mx-auto mb-6" />

                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="text-center">
                  <div className="font-medium text-gray-900">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-600">{testimonials[currentIndex].service}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="outlined"
              size="sm"
              onClick={prevTestimonial}
              className="p-2 rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outlined"
              size="sm"
              onClick={nextTestimonial}
              className="p-2 rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-medium text-emerald-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-medium text-emerald-600 mb-2">10+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-medium text-emerald-600 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-8 text-center">More Client Stories</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="text-center border-t pt-4">
                    <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-gray-600 text-xs">{testimonial.service}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>



      </div>
    </div>
  )
}