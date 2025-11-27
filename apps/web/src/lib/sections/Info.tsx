import { Card, CardContent } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import {
  Award,
  GraduationCap,
  MapPin,
  Clock,
  Heart
} from 'lucide-react'

const values = [
  {
    title: "Patient-Centered Care",
    description: "Every treatment plan is tailored to your unique needs and goals.",
    icon: Heart
  },
  {
    title: "Evidence-Based Treatment",
    description: "We use proven techniques backed by the latest research.",
    icon: GraduationCap
  },
  {
    title: "Holistic Approach",
    description: "We treat the whole person, not just the symptoms.",
    icon: Award
  }
]

const openDirections = (url: string) => {
  window.open(url, "_blank")
}

export default function Info() {
  return (
    <section id="about" className="relative py-20 bg-white w-full" style={{ zIndex: 20 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Our Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl mb-4 text-gray-900">Our Values</h3>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-xl">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-xl mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Clinic Information */}
        <Card className="bg-gray-50">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl mb-6">Visit Our Clinic</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h5 className="mb-1">Location</h5>
                      <p className="text-gray-600">
                        388 W Center St<br />
                        Orem, Ut 84057<br />
                        (Inside Etherios Therapy)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h5 className="mb-1">Hours</h5>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday: 8:30 AM - 7:00 PM</p>
                        <p>Tuesday: 8:30 AM - 5:30 PM</p>
                        <p>Wednesday: 1:00 PM - 7:00 PM</p>
                        <p>Thursday: 8:30 PM - 5:30 PM</p>
                        <p>Friday: 8:30 PM - 3:30 PM</p>
                        <p>Saturday: 9:00 AM - 3:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button onClick={() => openDirections("https://share.google/PU4H1IOu4aYjYUIWu")}>
                    Get Directions
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl mb-6">What to Expect</h3>
                <div className="space-y-4">
                  <div>
                    <h5 className="mb-2">Your First Visit</h5>
                    <p className="text-gray-600 text-sm">
                      We'll conduct a comprehensive evaluation including your health history,
                      physical examination, and discuss your treatment goals.
                    </p>
                  </div>
                  <div>
                    <h5 className="mb-2">Treatment Plans</h5>
                    <p className="text-gray-600 text-sm">
                      Each treatment plan is customized to your specific needs and may include
                      adjustments, exercises, and lifestyle recommendations.
                    </p>
                  </div>
                  <div>
                    <h5 className="mb-2">Follow-up Care</h5>
                    <p className="text-gray-600 text-sm">
                      We'll monitor your progress and adjust your treatment plan as needed
                      to ensure the best possible outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}