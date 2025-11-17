import { useState } from "react"
import { BookingStepServices } from "./steps/BookingStepServices"
import { BookingStepDateTime } from "./steps/BookingStepDateTime"
import { BookingStepPatientInfo } from "./steps/BookingStepPatientInfo"
import { BookingStepReview } from "./steps/BookingStepReview"
import { BookingHeader } from "./components/BookingHeader"
// import type { BookingState, CartItem, FormData } from "./types"
import type { BookingState } from "./types"

export function BookingFlow() {
  const [state, setState] = useState<BookingState>({
    step: 1,
    cart: [],
    selectedDate: undefined,
    selectedTime: "",
    selectedDurations: {},
    patientType: "new",
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      chiefComplaint: "",
      painLevel: 0,
      painLocations: [],
      medications: "",
      allergies: "",
      medicalConditions: [],
      hipaaConsent: false,
      treatmentConsent: false,
      privacyConsent: false,
    },
  })

  const update = (patch: Partial<BookingState>) =>
    setState(prev => ({ ...prev, ...patch }))

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto">
        <BookingHeader step={state.step} />

        {state.step === 1 && (
          <BookingStepServices state={state} update={update} />
        )}

        {state.step === 2 && (
          <BookingStepDateTime state={state} update={update} />
        )}

        {state.step === 3 && (
          <BookingStepPatientInfo state={state} update={update} />
        )}

        {state.step === 4 && (
          <BookingStepReview state={state} update={update} />
        )}
      </div>
    </div>
  )
}