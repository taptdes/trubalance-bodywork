import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Sparkles, Leaf, Heart, ArrowRight, ArrowLeft, CheckCircle2, Clock, CalendarIcon } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { toast } from "sonner"

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const treatments = [
  {
    value: "spinal-harmony",
    label: "Gentle Spinal Harmony",
    duration: 60,
    price: "$95",
  },
  {
    value: "therapeutic-massage",
    label: "Therapeutic Touch Massage",
    duration: 75,
    price: "$110",
  },
  {
    value: "postural-restoration",
    label: "Postural Restoration",
    duration: 45,
    price: "$75",
  },
  {
    value: "athletic-recovery",
    label: "Athletic Recovery Sanctuary",
    duration: 90,
    price: "$130",
  },
  {
    value: "wellness-consultation",
    label: "Wellness Consultation",
    duration: 90,
    price: "$160",
  },
  {
    value: "maintenance",
    label: "Maintenance & Renewal",
    duration: 45,
    price: "$70",
  },
]

// Mock booked appointments by date
const mockBookedSlots: Record<string, string[]> = {
  // Format: "YYYY-MM-DD": ["HH:MM", ...]
  // Today + 1
  [new Date(Date.now() + 86400000).toISOString().split('T')[0]]: ["09:00", "10:30", "14:00"],
  // Today + 2
  [new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]]: ["09:00", "12:00", "15:30"],
  // Today + 5
  [new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]]: ["09:00", "10:30", "12:00", "14:00", "15:30"],
  // Today + 7
  [new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]]: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
}

// Closed dates (fully booked or closed)
const closedDates = [
  new Date(Date.now() + 86400000 * 7), // Today + 7 (fully booked)
  new Date(Date.now() + 86400000 * 14), // Today + 14 (closed)
]

// Generate time slots based on treatment duration
const generateTimeSlots = (duration: number, date: string) => {
  const slots: { value: string; label: string; available: boolean, sublabel: string; }[] = []
  const bookedTimes = mockBookedSlots[date] || []
  
  // Operating hours: 9 AM to 6 PM
  const startHour = 9
  const endHour = 18
  
  // Convert booked times to minutes for easier calculation
  const bookedMinutes = bookedTimes.map(time => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
  })
  
  // Generate slots every 30 minutes
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const totalMinutes = hour * 60 + minute
      const endMinutes = totalMinutes + duration
      
      // Don't create slot if treatment would end after closing
      if (endMinutes > endHour * 60) continue
      
      // Check if this slot conflicts with any booked appointments
      const isAvailable = !bookedMinutes.some(bookedStart => {
        const bookedEnd = bookedStart + duration // Assume same duration for simplicity
        // Check if slots overlap
        return (totalMinutes < bookedEnd && endMinutes > bookedStart)
      })
      
      const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const period = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      const displayMinute = minute.toString().padStart(2, '0')
      
      const timeLabels = [
        "Morning Serenity",
        "Mid-Morning Peace",
        "Midday Reset",
        "Afternoon Renewal",
        "Late Afternoon Calm",
        "Evening Restoration"
      ]
      
      const labelIndex = Math.floor((hour - startHour) / 2)
      const sublabel = timeLabels[Math.min(labelIndex, timeLabels.length - 1)]
      
      slots.push({
  value: timeValue,
  label: `${displayHour}:${displayMinute} ${period}`,
  sublabel,  // ← add this
  available: isAvailable
})
    }
  }
  
  return slots
}

export default function BookingDialog({ isOpen, onClose, preselectedService }: BookingDialogProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: preselectedService || "",
    date: undefined as Date | undefined,
    time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }))
    }
  }, [preselectedService])

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setFormData(prev => ({ 
        ...prev, 
        date: undefined, 
        time: "" 
      }))
    }
  }, [isOpen])

  // Reset time when service or date changes (duration affects available times)
  useEffect(() => {
    setFormData(prev => ({ ...prev, time: "" }))
  }, [formData.service, formData.date])

  const selectedTreatment = treatments.find((t) => t.value === formData.service)

  const availableTimeSlots = useMemo(() => {
    if (!formData.date || !selectedTreatment) return []
    const dateString = formData.date.toISOString().split('T')[0]
    return generateTimeSlots(selectedTreatment.duration, dateString)
  }, [formData.date, selectedTreatment])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (step === 1 && !formData.service) {
      toast.error("Please select a treatment")
      return
    }
    if (step === 2 && (!formData.date || !formData.time)) {
      toast.error("Please select both date and time")
      return
    }
    if (step === 3 && (!formData.name || !formData.email || !formData.phone)) {
      toast.error("Please fill in all required fields")
      return
    }
    
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    const selectedTime = availableTimeSlots.find(t => t.value === formData.time)
    
    toast.success("Your wellness journey is confirmed!", {
      description: `We'll see you on ${formData.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${selectedTime?.label}`,
      duration: 5000,
    })
    
    setTimeout(() => {
      setFormData({
        service: "",
        date: undefined,
        time: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      })
      setStep(1)
      onClose()
    }, 2000)
  }

  // Check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Disable past dates
    if (date < today) return true
    
    // Disable closed dates
    if (closedDates.some(closedDate => 
      closedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    )) return true
    
    return false
  }

  // Get modifiers for the calendar
  const modifiers = {
    booked: closedDates,
    limited: Object.keys(mockBookedSlots)
      .filter(dateStr => {
        const bookedCount = mockBookedSlots[dateStr].length
        return bookedCount > 0 && bookedCount < 6 // Show as limited if some slots booked
      })
      .map(dateStr => new Date(dateStr))
  }

  const modifiersStyles = {
    booked: { 
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      textDecoration: 'line-through'
    },
    limited: { 
      backgroundColor: '#fef3c7',
      color: '#92400e',
      fontWeight: 'bold'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[85vh] p-0 gap-0 rounded-3xl border-0 warm-shadow flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-amber-200/50 px-6 pt-6 pb-4">
          <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-3xl text-center text-primary tracking-wide mb-6">
            {step === 4 ? "Journey Confirmed!" : "Reserve Your Sanctuary"}
          </h2>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    s < step
                      ? "bg-linear-to-br from-emerald-500 to-emerald-600 text-white"
                      : s === step
                      ? "bg-linear-to-br from-amber-600 to-amber-700 text-white"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 h-0.5 transition-all duration-300 ${
                      s < step ? "bg-emerald-500" : "bg-amber-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xl text-primary">Choose Your Healing Journey</h3>
                </div>
                <p className="text-muted-foreground">
                  Select the treatment that resonates with your wellness needs
                </p>
              </div>

              <div className="space-y-3">
                {treatments.map((treatment) => (
                  <button
                    key={treatment.value}
                    onClick={() => handleInputChange("service", treatment.value)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      formData.service === treatment.value
                        ? "border-amber-600 bg-amber-50/50 warm-shadow"
                        : "border-amber-200/50 hover:border-amber-400 hover:bg-amber-50/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Leaf className="w-4 h-4 text-amber-600" />
                          <p className="text-primary">{treatment.label}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {treatment.duration} min
                          </span>
                          <span className="text-amber-700">{treatment.price}</span>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.service === treatment.value
                            ? "border-amber-600 bg-amber-600"
                            : "border-amber-300"
                        }`}
                      >
                        {formData.service === treatment.value && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xl text-primary">Choose Your Sacred Time</h3>
                </div>
                <p className="text-muted-foreground">
                  Select an available date and time for your {selectedTreatment?.label}
                </p>
              </div>

              <div className="bg-amber-50/50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Selected Treatment</p>
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-lg text-primary">{selectedTreatment?.label}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{selectedTreatment?.duration} min</span>
                  <span className="text-amber-700">{selectedTreatment?.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-amber-600" />
                    Select Your Date *
                  </Label>
                  
                  <div className="bg-white rounded-2xl border-2 border-amber-200/50 p-4">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => handleInputChange("date", date)}
                      disabled={isDateDisabled}
                      modifiers={modifiers}
                      modifiersStyles={modifiersStyles}
                      className="mx-auto"
                    />
                    
                    <div className="mt-4 pt-4 border-t border-amber-200/50 space-y-2">
                      <p className="text-xs text-muted-foreground">Availability Legend:</p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-amber-50 border-2 border-amber-600"></div>
                          <span className="text-muted-foreground">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-amber-100"></div>
                          <span className="text-muted-foreground">Limited</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-red-100 line-through"></div>
                          <span className="text-muted-foreground">Fully Booked</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {formData.date && (
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      Available Times ({availableTimeSlots.filter(s => s.available).length} slots) *
                    </Label>
                    
                    {availableTimeSlots.filter(s => s.available).length === 0 ? (
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                        <p className="text-red-800">No available times for this date. Please select another date.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
  {availableTimeSlots.map((slot) => (
    <button
      key={slot.value}
      onClick={() => slot.available && handleInputChange("time", slot.value)}
      disabled={!slot.available}
      className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
        formData.time === slot.value
          ? "border-amber-600 bg-amber-50/50 warm-shadow"
          : slot.available
          ? "border-amber-200/50 hover:border-amber-400 hover:bg-amber-50/30"
          : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
      }`}
    >
      <p className={`text-sm ${slot.available ? 'text-primary' : 'text-gray-400'}`}>
        {slot.label}
      </p>
      {/* Render sublabel */}
      <p className="text-xs text-muted-foreground">{slot.sublabel}</p>
      {!slot.available && (
        <p className="text-xs text-red-600 mt-1">Booked</p>
      )}
    </button>
  ))}
</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Personal Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xl text-primary">Share Your Details</h3>
                </div>
                <p className="text-muted-foreground">
                  Help us create a personalized experience just for you
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="What shall we call you?"
                    className="rounded-full py-6 px-6 border-amber-200/50 focus:border-amber-400 bg-white/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="rounded-full py-6 px-6 border-amber-200/50 focus:border-amber-400 bg-white/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-amber-600" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="rounded-full py-6 px-6 border-amber-200/50 focus:border-amber-400 bg-white/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-amber-600" />
                    Share Your Wellness Goals
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us about your wellness journey or any special requests..."
                    rows={4}
                    className="rounded-2xl py-4 px-6 border-amber-200/50 focus:border-amber-400 bg-white/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-linear-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl text-primary">Your Journey Awaits</h3>
                  <p className="text-muted-foreground">
                    Please review your appointment details before confirming
                  </p>
                </div>
              </div>

              <div className="bg-linear-to-br from-amber-50/50 via-orange-50/30 to-rose-50/40 rounded-2xl p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between pb-3 border-b border-amber-200/50">
                    <div>
                      <p className="text-sm text-muted-foreground">Treatment</p>
                      <p className="text-lg text-primary mt-1">{selectedTreatment?.label}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedTreatment?.duration} min • {selectedTreatment?.price}
                      </p>
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>

                  <div className="flex items-start justify-between pb-3 border-b border-amber-200/50">
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="text-lg text-primary mt-1">
                        {formData.date?.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {availableTimeSlots.find(t => t.value === formData.time)?.label}
                      </p>
                    </div>
                    <CalendarIcon className="w-5 h-5 text-amber-600" />
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Information</p>
                      <p className="text-lg text-primary mt-1">{formData.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{formData.email}</p>
                      <p className="text-sm text-muted-foreground">{formData.phone}</p>
                    </div>
                    <Heart className="w-5 h-5 text-amber-600" />
                  </div>

                  {formData.message && (
                    <div className="pt-3 border-t border-amber-200/50">
                      <p className="text-sm text-muted-foreground">Your Message</p>
                      <p className="text-sm text-primary mt-1">{formData.message}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Please note:</strong> A confirmation email will be sent to {formData.email}. 
                  We'll reach out within 24 hours to finalize your appointment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Footer with Navigation */}
        <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-amber-200/50 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {step > 1 && step < 4 && (
              <Button
                variant="outlined"
                onClick={prevStep}
                className="rounded-full px-6 border-amber-200/50 hover:border-amber-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            
            {step === 1 && <div></div>}
            
            {step < 4 ? (
              <Button
                onClick={nextStep}
                className="bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 ml-auto"
              >
                {step === 3 ? "Review Booking" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Confirm My Journey
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
