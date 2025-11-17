export type Service = {
  id: number
  name: string
  price: number
  duration: number
  description: string
  icon: any
  color: string
  iconColor: string
  popular: boolean
}

export type CartItem = {
  service: Service
  duration: number
  quantity: number
}

export type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  streetAddress: string
  city: string
  state: string
  zipCode: string

  chiefComplaint: string
  painLevel: number
  painLocations: string[]
  medications: string
  allergies: string
  medicalConditions: string[]

  hipaaConsent: boolean
  treatmentConsent: boolean
  privacyConsent: boolean
}

export type BookingState = {
  step: number
  cart: CartItem[]
  selectedDate?: Date
  selectedTime: string
  selectedDurations: Record<number, number>
  patientType: "new" | "returning"
  formData: FormData
}