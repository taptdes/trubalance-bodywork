import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  Calendar,
  Info,
  Car,
  Train,
  AlertCircle
} from 'lucide-react'

const businessHours = [
  { day: 'Monday', hours: '8:00 AM - 6:00 PM', isToday: false },
  { day: 'Tuesday', hours: '8:00 AM - 6:00 PM', isToday: false },
  { day: 'Wednesday', hours: '8:00 AM - 6:00 PM', isToday: false },
  { day: 'Thursday', hours: '8:00 AM - 6:00 PM', isToday: false },
  { day: 'Friday', hours: '8:00 AM - 5:00 PM', isToday: false },
  { day: 'Saturday', hours: '9:00 AM - 2:00 PM', isToday: true },
  { day: 'Sunday', hours: 'Closed', isToday: false }
]

const parkingDirections = [
  "Free parking available in our lot behind the building",
  "Street parking available on Main Street (metered)",
  "Accessible parking spaces available near main entrance"
]

const publicTransit = [
  "Bus Routes 12, 45, 67 stop at Main St & 2nd Ave (2 min walk)",
  "Metro Red Line - Downtown Station (5 min walk)",
  "Bike racks available at building entrance"
]

export default function ClinicInfo() {
  const today = new Date().getDay()
  const todayHours = businessHours[today === 0 ? 6 : today - 1]

  return (
    <section id="clinic-info" className="relative pt-20 pb-24 bg-white" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <Badge variant="outlined" className="text-sm px-4 py-1">
              Visit Us
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6">
            Clinic Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're conveniently located in downtown with easy access to parking and public transportation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden flex-col border-0 shadow-lg h-full">
              <CardHeader className="bg-linear-to-r from-blue-50 to-green-50">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Interactive Map */}
                <div className="relative h-96 bg-gray-100">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4194%2C37.7749%2C-122.4094%2C37.7849&layer=mapnik&marker=37.7799,-122.4144"
                    className="w-full h-full border-0"
                    title="Clinic Location Map"
                    loading="lazy"
                  />
                  <Button 
                    className="absolute bottom-4 right-4 shadow-lg"
                    size="sm"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
                
                {/* Address Details */}
                <div className="p-6 bg-gray-50 border-t">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="text-lg">123 Main Street, Suite 200</p>
                      <p className="text-gray-600">San Francisco, CA 94102</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <a href="tel:+14155551234" className="text-primary hover:underline">
                          (415) 555-1234
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <a href="mailto:info@wellnesschiropracti.com" className="text-primary hover:underline">
                          info@wellnesschiro.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hours Section */}
          <div className="space-y-6">
            <Card className="border-0 flex-col shadow-lg">
              <CardHeader className="bg-linear-to-r from-blue-50 to-green-50">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Hours of Operation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Current Status */}
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-800">Open Now</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Today: {todayHours.hours}
                  </p>
                </div>

                {/* Weekly Hours */}
                <div className="space-y-3">
                  {businessHours.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center pb-3 border-b last:border-0 ${
                        item.isToday ? 'font-medium text-primary' : 'text-gray-600'
                      }`}
                    >
                      <span>{item.day}</span>
                      <span className={item.hours === 'Closed' ? 'text-gray-400' : ''}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6" variant="outlined">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Important Info */}
            <Card className="border-0 flex-col shadow-lg bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <AlertCircle className="h-5 w-5" />
                  Important Info
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-800 space-y-2">
                <p>• Please arrive 10 minutes early for new patient appointments</p>
                <p>• Bring a valid ID and insurance card</p>
                <p>• Wear comfortable clothing</p>
                <p>• COVID-19 safety protocols in place</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Directions Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Parking */}
          <Card className="border-0 flex-col shadow-lg">
            <CardHeader className="bg-linear-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Parking Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {parkingDirections.map((direction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{direction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Public Transit */}
          <Card className="border-0 shadow-lg flex-col">
            <CardHeader className="bg-linear-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Train className="h-5 w-5 text-primary" />
                Public Transportation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {publicTransit.map((transit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{transit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
