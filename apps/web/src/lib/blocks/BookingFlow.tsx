"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/context/authContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Activity, 
  Heart, 
  Zap, 
  Target, 
  Shield, 
  Users,
  ShoppingCart,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Minus,
  Check,
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'

// Service definitions
const services = [
  {
    id: 'spinal-adjustment',
    icon: Activity,
    title: "Spinal Adjustments",
    description: "Precise manual adjustments to restore proper spinal alignment and reduce pain.",
    duration: "30 minutes",
    price: 85,
    color: "blue"
  },
  {
    id: 'sports-injury',
    icon: Heart,
    title: "Sports Injury Treatment", 
    description: "Specialized care for athletes and active individuals.",
    duration: "45 minutes",
    price: 110,
    color: "red"
  },
  {
    id: 'physical-therapy',
    icon: Zap,
    title: "Physical Therapy",
    description: "Comprehensive rehabilitation programs.",
    duration: "60 minutes",
    price: 125,
    color: "purple"
  },
  {
    id: 'pain-management',
    icon: Target,
    title: "Pain Management",
    description: "Targeted treatments for chronic pain conditions.",
    duration: "45 minutes",
    price: 95,
    color: "green"
  },
  {
    id: 'wellness',
    icon: Shield,
    title: "Wellness Check",
    duration: "20 minutes",
    description: "Preventive care and maintenance visit.",
    price: 65,
    color: "amber"
  },
  {
    id: 'initial-consultation',
    icon: Users,
    title: "Initial Consultation",
    description: "Comprehensive evaluation for new patients.",
    duration: "45 minutes",
    price: 125,
    color: "indigo"
  }
]

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
]

const medicalConditions = [
  'Diabetes', 'High Blood Pressure', 'Heart Disease', 'Arthritis',
  'Osteoporosis', 'Depression/Anxiety', 'Fibromyalgia', 'Migraines',
  'Previous Spinal Surgery', 'Disc Problems', 'Scoliosis', 'Other'
]

const painLocations = [
  'Neck', 'Upper Back', 'Lower Back', 'Shoulders', 'Arms',
  'Hips', 'Legs', 'Headaches', 'Other'
]

interface CartItem {
  serviceId: string
  quantity: number
}

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  emergencyContact: string
  emergencyPhone: string
  
  // Insurance Information
  insuranceProvider: string
  policyNumber: string
  groupNumber: string
  
  // Chief Complaint
  chiefComplaint: string
  painLevel: string
  painLocation: string[]
  whenDidPainStart: string
  painDescription: string
  
  // Medical History
  previousChiropracticCare: string
  currentMedications: string
  allergies: string
  surgeries: string
  medicalConditions: string[]
  
  // Lifestyle
  occupation: string
  exerciseFrequency: string
  sleepQuality: string
  stressLevel: string
  
  // Consent
  hipaaConsent: boolean
  treatmentConsent: boolean
  privacyPolicy: boolean
  
  // Appointment
  isNewPatient: string
}

export default function BookingFlow() {
  const { isAuthenticated } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    chiefComplaint: '',
    painLevel: '',
    painLocation: [],
    whenDidPainStart: '',
    painDescription: '',
    previousChiropracticCare: '',
    currentMedications: '',
    allergies: '',
    surgeries: '',
    medicalConditions: [],
    occupation: '',
    exerciseFrequency: '',
    sleepQuality: '',
    stressLevel: '',
    hipaaConsent: false,
    treatmentConsent: false,
    privacyPolicy: false,
    isNewPatient: ''
  })

  const steps = [
    { number: 1, title: "Select Services", icon: ShoppingCart },
    { number: 2, title: "Date & Time", icon: Calendar },
    { number: 3, title: "Patient Information", icon: FileText },
    { number: 4, title: "Review & Confirm", icon: CheckCircle }
  ]

  // Cart functions
  const addToCart = (serviceId: string) => {
    const existingItem = cart.find(item => item.serviceId === serviceId)
    if (existingItem) {
      setCart(cart.map(item => 
        item.serviceId === serviceId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { serviceId, quantity: 1 }])
    }
    toast.success("Service added to cart")
  }

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter(item => item.serviceId !== serviceId))
    toast.success("Service removed from cart")
  }

  const updateQuantity = (serviceId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.serviceId === serviceId) {
        const newQuantity = item.quantity + change
        return { ...item, quantity: Math.max(1, newQuantity) }
      }
      return item
    }))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const service = services.find(s => s.id === item.serviceId)
      return total + (service?.price || 0) * item.quantity
    }, 0)
  }



  const handleConditionChange = (condition: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: checked 
        ? [...prev.medicalConditions, condition]
        : prev.medicalConditions.filter(c => c !== condition)
    }))
  }

  const handlePainLocationChange = (location: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      painLocation: checked 
        ? [...prev.painLocation, location]
        : prev.painLocation.filter(l => l !== location)
    }))
  }

  const canProceedToNextStep = () => {
    switch(currentStep) {
      case 1:
        return cart.length > 0
      case 2:
        return selectedDate && selectedTime
      case 3:
        if (formData.isNewPatient === 'yes') {
          return formData.firstName && formData.lastName && formData.email && 
                 formData.phone && formData.chiefComplaint && formData.painLevel &&
                 formData.hipaaConsent && formData.treatmentConsent && formData.privacyPolicy
        } else {
          return formData.firstName && formData.lastName && formData.email && formData.phone
        }
      default:
        return true
    }
  }

  const handleNext = () => {
    if (!canProceedToNextStep()) {
      toast.error("Please complete all required fields before continuing")
      return
    }
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    toast.success("Booking confirmed! We'll send you a confirmation email shortly.", {
      description: `Your appointment on ${selectedDate?.toLocaleDateString()} at ${selectedTime}`
    })
    // Reset form
    setTimeout(() => {
      setCurrentStep(1)
      setCart([])
      setSelectedDate(undefined)
      setSelectedTime("")
    }, 2000)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50",
      red: "text-red-600 bg-red-50", 
      purple: "text-purple-600 bg-purple-50",
      green: "text-green-600 bg-green-50",
      amber: "text-amber-600 bg-amber-50",
      indigo: "text-indigo-600 bg-indigo-50"
    }
    return colors[color as keyof typeof colors] || "text-gray-600 bg-gray-50"
  }

  // If not authenticated, show message
  if (!isAuthenticated) {
    return (
      <section id="booking-flow" className="relative py-20 bg-gray-50" style={{ zIndex: 20 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-12">
            <AlertCircle className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl mb-4">Sign In Required</h2>
            <p className="text-xl text-gray-600 mb-8">
              Please sign in or create an account to book an appointment
            </p>
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Sign In / Sign Up
            </Button>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="booking-flow" className="relative py-20 bg-gray-50" style={{ zIndex: 20 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary">Online Booking</Badge>
          <h2 className="text-3xl lg:text-4xl mb-6 text-gray-900">
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete booking process in 4 simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                    ${currentStep > step.number 
                      ? 'bg-primary border-primary text-white' 
                      : currentStep === step.number 
                        ? 'border-primary text-primary bg-primary/10'
                        : 'border-gray-300 text-gray-400 bg-white'
                    }
                  `}>
                    {currentStep > step.number ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className={`mt-2 text-sm hidden sm:block ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-24 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Services</CardTitle>
                    <CardDescription>Select the services you'd like to book</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {services.map((service) => {
                        const IconComponent = service.icon
                        const colorClasses = getColorClasses(service.color)
                        const inCart = cart.find(item => item.serviceId === service.id)
                        
                        return (
                          <div 
                            key={service.id}
                            className={`p-4 border rounded-lg transition-all ${
                              inCart ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-lg ${colorClasses} flex-shrink-0`}>
                                <IconComponent className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="mb-1">{service.title}</h4>
                                    <p className="text-sm text-gray-600">{service.description}</p>
                                  </div>
                                  <Badge variant="filled" className="ml-2">${service.price}</Badge>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>{service.duration}</span>
                                  </div>
                                  <Button 
                                    size="sm"
                                    onClick={() => addToCart(service.id)}
                                    variant={inCart ? "filled" : "outlined"}
                                  >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cart Sidebar */}
              <div>
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Your Cart ({cart.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No services selected</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 mb-4">
                          {cart.map(item => {
                            const service = services.find(s => s.id === item.serviceId)
                            if (!service) return null
                            
                            return (
                              <div key={item.serviceId} className="pb-4 border-b last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-sm">{service.title}</h4>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => removeFromCart(item.serviceId)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outlined"
                                      size="sm"
                                      className="h-7 w-7 p-0"
                                      onClick={() => updateQuantity(item.serviceId, -1)}
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                                    <Button
                                      variant="outlined"
                                      size="sm"
                                      className="h-7 w-7 p-0"
                                      onClick={() => updateQuantity(item.serviceId, 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <span className="text-sm">${service.price * item.quantity}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex justify-between items-center mb-4">
                          <span>Total:</span>
                          <span className="text-2xl">${getCartTotal()}</span>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          onClick={handleNext}
                          disabled={cart.length === 0}
                        >
                          Continue to Date & Time
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Select Date & Time
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred appointment date and time slot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selected Services Summary */}
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="mb-3">Selected Services:</h4>
                    <div className="space-y-2">
                      {cart.map(item => {
                        const service = services.find(s => s.id === item.serviceId)
                        return (
                          <div key={item.serviceId} className="flex justify-between text-sm">
                            <span>{service?.title} x {item.quantity}</span>
                            <span>${(service?.price || 0) * item.quantity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <Label>Select Date</Label>
                    <div className="flex justify-center mt-3">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md border"
                      />
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <Label>Available Time Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                        {timeSlots.map(time => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "filled" : "outlined"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 mb-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>Appointment Scheduled</span>
                      </div>
                      <p className="text-sm text-green-700">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button variant="outlined" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1" disabled={!selectedDate || !selectedTime}>
                      Continue to Patient Info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Patient Information */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* New vs Existing Patient */}
              <Card>
                <CardHeader>
                  <CardTitle>Patient Type</CardTitle>
                  <CardDescription>Are you a new or returning patient?</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={formData.isNewPatient}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, isNewPatient: value }))}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="yes" id="new-yes" className="peer sr-only" />
                      <Label 
                        htmlFor="new-yes" 
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                      >
                        <Users className="h-8 w-8 mb-2 text-primary" />
                        <span>New Patient</span>
                        <span className="text-xs text-gray-500 mt-1">First time visiting</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="no" id="new-no" className="peer sr-only" />
                      <Label 
                        htmlFor="new-no"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                      >
                        <CheckCircle className="h-8 w-8 mb-2 text-primary" />
                        <span>Returning Patient</span>
                        <span className="text-xs text-gray-500 mt-1">Existing patient</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {formData.isNewPatient && (
                <>
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Basic contact and demographic information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            required 
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            required 
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                          <Input 
                            id="dateOfBirth" 
                            type="date" 
                            required 
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Gender *</Label>
                          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            required 
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input 
                          id="address" 
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state" 
                            value={formData.state}
                            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input 
                            id="zipCode" 
                            value={formData.zipCode}
                            onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Chief Complaint */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Chief Complaint</CardTitle>
                      <CardDescription>Tell us about your current condition</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="chiefComplaint">What brings you in today? *</Label>
                        <Textarea 
                          id="chiefComplaint" 
                          placeholder="Describe your main concern..."
                          required
                          value={formData.chiefComplaint}
                          onChange={(e) => setFormData(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label>Pain Level (0-10) *</Label>
                        <RadioGroup 
                          className="flex flex-wrap gap-3 mt-2"
                          onValueChange={(value) => setFormData(prev => ({ ...prev, painLevel: value }))}
                        >
                          {[0,1,2,3,4,5,6,7,8,9,10].map(level => (
                            <div key={level} className="flex items-center">
                              <RadioGroupItem value={level.toString()} id={`pain-${level}`} className="peer sr-only" />
                              <Label 
                                htmlFor={`pain-${level}`}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white"
                              >
                                {level}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label>Pain Location (select all that apply)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                          {painLocations.map(location => (
                            <div key={location} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`location-${location}`}
                                checked={formData.painLocation.includes(location)}
                                onCheckedChange={(checked) => handlePainLocationChange(location, checked as boolean)}
                              />
                              <Label htmlFor={`location-${location}`}>{location}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Medical History (Simplified) */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical History</CardTitle>
                      <CardDescription>Brief medical background</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="currentMedications">Current Medications</Label>
                        <Textarea 
                          id="currentMedications" 
                          placeholder="List any medications you're taking..."
                          value={formData.currentMedications}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentMedications: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="allergies">Allergies</Label>
                        <Input 
                          id="allergies" 
                          placeholder="Any allergies?"
                          value={formData.allergies}
                          onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label>Medical Conditions (check all that apply)</Label>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {medicalConditions.slice(0, 6).map(condition => (
                            <div key={condition} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`condition-${condition}`}
                                checked={formData.medicalConditions.includes(condition)}
                                onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                              />
                              <Label htmlFor={`condition-${condition}`} className="text-sm">{condition}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Consent Forms */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Consent & Privacy</CardTitle>
                      <CardDescription>Required agreements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="hipaaConsent"
                          checked={formData.hipaaConsent}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hipaaConsent: checked as boolean }))}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="hipaaConsent" className="text-sm">
                            HIPAA Privacy Notice *
                          </Label>
                          <p className="text-xs text-gray-500">
                            I acknowledge receipt of the Notice of Privacy Practices
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="treatmentConsent"
                          checked={formData.treatmentConsent}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, treatmentConsent: checked as boolean }))}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="treatmentConsent" className="text-sm">
                            Consent for Treatment *
                          </Label>
                          <p className="text-xs text-gray-500">
                            I consent to chiropractic examination and treatment
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="privacyPolicy"
                          checked={formData.privacyPolicy}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, privacyPolicy: checked as boolean }))}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="privacyPolicy" className="text-sm">
                            Privacy Policy *
                          </Label>
                          <p className="text-xs text-gray-500">
                            I agree to the privacy policy
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Returning Patient - Simplified Form */}
              {formData.isNewPatient === 'no' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Verify your contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          required 
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          required 
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reasonForVisit">Reason for Visit</Label>
                      <Textarea 
                        id="reasonForVisit" 
                        placeholder="Brief description of today's visit..."
                        value={formData.chiefComplaint}
                        onChange={(e) => setFormData(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button variant="outlined" onClick={handleBack} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1" disabled={!canProceedToNextStep()}>
                  Review Booking
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Review Your Booking
                  </CardTitle>
                  <CardDescription>
                    Please review all details before confirming your appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Services Summary */}
                  <div>
                    <h4 className="mb-3">Selected Services</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {cart.map(item => {
                        const service = services.find(s => s.id === item.serviceId)
                        return (
                          <div key={item.serviceId} className="flex justify-between items-center">
                            <div>
                              <p>{service?.title}</p>
                              <p className="text-sm text-gray-600">
                                {service?.duration} • Quantity: {item.quantity}
                              </p>
                            </div>
                            <span className="text-lg">${(service?.price || 0) * item.quantity}</span>
                          </div>
                        )
                      })}
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>Total Amount:</span>
                        <span className="text-2xl">${getCartTotal()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div>
                    <h4 className="mb-3">Appointment Details</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span>{selectedTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Patient Information */}
                  <div>
                    <h4 className="mb-3">Patient Information</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="text-gray-600">Email:</span> {formData.email}</p>
                      <p><span className="text-gray-600">Phone:</span> {formData.phone}</p>
                      <p><span className="text-gray-600">Patient Type:</span> {formData.isNewPatient === 'yes' ? 'New Patient' : 'Returning Patient'}</p>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-blue-900 mb-2">Important Information</h4>
                        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                          <li>A confirmation email will be sent to {formData.email}</li>
                          <li>Please arrive 10 minutes early for your appointment</li>
                          <li>Bring a valid ID and insurance card if applicable</li>
                          <li>Our cancellation policy requires 24 hours notice</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outlined" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1" size="lg">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirm Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
