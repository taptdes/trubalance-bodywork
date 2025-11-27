import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedSection } from "./AnimatedSection"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin } from "lucide-react"

export function Contact() {
  return (
    <section id="testimonials" className="relative w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Book Your Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to begin your journey to wellness? Contact us to schedule your appointment or learn more about our services.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <AnimatedSection>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Schedule Your Appointment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input type="email" placeholder="Email Address" />
                  <Input type="tel" placeholder="Phone Number" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="signature-massage">Signature Massage Therapy</SelectItem>
                      <SelectItem value="facial">Rejuvenating Facial</SelectItem>
                      <SelectItem value="aromatherapy">Aromatherapy & Body Wraps</SelectItem>
                      <SelectItem value="couples">Couples Retreat Package</SelectItem>
                      <SelectItem value="wellness-day">Wellness Day Package</SelectItem>
                      <SelectItem value="hot-stone">Hot Stone Therapy</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input type="date" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Preferred Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea placeholder="Special requests or preferences..." rows={3} />
                  <Button
                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="lg"
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatedSection>

          {/* Contact Information */}
          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-muted-foreground">801-691-6657</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-muted-foreground">brenden.heywood.lmt@gmail.com</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-muted-foreground">
                          388 W Center St<br />
                          Orem, Ut 84057
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <Card className="bg-linear-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">First Visit?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    New clients receive 15% off their first treatment. Please arrive 15 minutes early to complete your wellness consultation.
                  </p>
                  <Button
                    variant="outlined"
                    className="border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}