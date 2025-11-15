"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, Phone } from 'lucide-react'
import { toast } from 'sonner'

const appointmentTypes = [
  {
    name: "Initial Consultation",
    duration: "45 minutes",
    description: "Comprehensive evaluation and examination for new patients",
    price: "$125"
  },
  {
    name: "Follow-up Treatment",
    duration: "30 minutes", 
    description: "Ongoing treatment for existing patients",
    price: "$85"
  },
  {
    name: "Wellness Check",
    duration: "20 minutes",
    description: "Preventive care and maintenance visit",
    price: "$65"
  },
  {
    name: "Emergency Visit",
    duration: "30 minutes",
    description: "Urgent care for acute pain or injury",
    price: "$110"
  }
]

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
]

export default function BookingForm() {
  const [selectedAppointmentType, setSelectedAppointmentType] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    appointmentType: "",
    preferredDate: "",
    preferredTime: "",
    reasonForVisit: "",
    insuranceProvider: "",
    isNewPatient: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedAppointmentType || !selectedDate || !selectedTime) {
      toast.error("Please select an appointment type, date, and time.")
      return
    }

    // Mock booking submission
    toast.success("Appointment request submitted! We'll call you within 2 hours to confirm.")
  }

  const getNextAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip Sundays (0) 
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    
    return dates
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const availableDates = getNextAvailableDates()

  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary">Book Online</Badge>
          <h2 className="text-3xl lg:text-4xl mb-6 text-gray-900">
            Schedule Your Appointment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your preferred appointment type and time. We'll confirm your booking 
            within 2 hours and send you appointment details.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Appointment Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Select Appointment Type
                </CardTitle>
                <CardDescription>
                  Choose the type of visit that best fits your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointmentTypes.map((type, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAppointmentType === type.name 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedAppointmentType(type.name)
                      setBookingData(prev => ({ ...prev, appointmentType: type.name }))
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg">{type.name}</h4>
                      <Badge variant="filled">{type.price}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{type.duration}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Select Date & Time
                </CardTitle>
                <CardDescription>
                  Choose your preferred appointment date and time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Preferred Date</Label>
                  <Select onValueChange={(value) => {
                    setSelectedDate(value)
                    setBookingData(prev => ({ ...prev, preferredDate: value }))
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a date" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDates.map(date => (
                        <SelectItem key={date} value={date}>
                          {formatDate(date)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDate && (
                  <div>
                    <Label>Available Times</Label>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {timeSlots.map(time => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "filled" : "outlined"}
                          size="sm"
                          onClick={() => {
                            setSelectedTime(time)
                            setBookingData(prev => ({ ...prev, preferredTime: time }))
                          }}
                          className="text-sm"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                We'll use this information to confirm your appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bookingFirstName">First Name *</Label>
                    <Input 
                      id="bookingFirstName" 
                      required 
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookingLastName">Last Name *</Label>
                    <Input 
                      id="bookingLastName" 
                      required 
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bookingPhone">Phone Number *</Label>
                  <Input 
                    id="bookingPhone" 
                    type="tel" 
                    required 
                    value={bookingData.phone}
                    onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="bookingEmail">Email Address *</Label>
                  <Input 
                    id="bookingEmail" 
                    type="email" 
                    required 
                    value={bookingData.email}
                    onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Are you a new patient?</Label>
                  <Select onValueChange={(value) => setBookingData(prev => ({ ...prev, isNewPatient: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I'm a new patient</SelectItem>
                      <SelectItem value="no">No, I'm an existing patient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bookingInsurance">Insurance Provider (Optional)</Label>
                  <Input 
                    id="bookingInsurance" 
                    placeholder="e.g., Blue Cross Blue Shield"
                    value={bookingData.insuranceProvider}
                    onChange={(e) => setBookingData(prev => ({ ...prev, insuranceProvider: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="bookingReason">Reason for Visit</Label>
                  <Textarea 
                    id="bookingReason" 
                    placeholder="Briefly describe your symptoms or reason for the appointment..."
                    value={bookingData.reasonForVisit}
                    onChange={(e) => setBookingData(prev => ({ ...prev, reasonForVisit: e.target.value }))}
                  />
                </div>

                {/* Appointment Summary */}
                {selectedAppointmentType && selectedDate && selectedTime && (
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="mb-3">Appointment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span>{selectedAppointmentType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{formatDate(selectedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>
                          {appointmentTypes.find(type => type.name === selectedAppointmentType)?.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  Request Appointment
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy and consent to be contacted 
                  regarding your appointment via phone, text, or email.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact Info */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-primary" />
                <h4>Need Urgent Care?</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                For same-day appointments or urgent concerns, please call us directly.
              </p>
              <Button variant="outlined" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call (555) 123-4567
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}