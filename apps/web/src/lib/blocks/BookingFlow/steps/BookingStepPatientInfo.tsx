import type { BookingState } from "../types"
import { PainSelector } from "../components/PainSelector"
import { PainLocationGrid } from "../components/PainLocationGrid"
import { MedicalConditionGrid } from "../components/MedicalConditionGrid"
import { BookingCart } from "../components/BookingCart"

export function BookingStepPatientInfo({
  state,
  update,
}: {
  state: BookingState
  update: (patch: Partial<BookingState>) => void
}) {
  const { formData } = state

  const set = (patch: Partial<typeof formData>) =>
    update({ formData: { ...formData, ...patch } })

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h3 className="font-semibold">Personal Info</h3>

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="First Name"
              value={formData.firstName}
              onChange={e => set({ firstName: e.target.value })}
              className="input"
            />
            <input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={e => set({ lastName: e.target.value })}
              className="input"
            />
          </div>

          <input
            placeholder="Email"
            value={formData.email}
            onChange={e => set({ email: e.target.value })}
            className="input"
          />

          <input
            placeholder="Phone"
            value={formData.phone}
            onChange={e => set({ phone: e.target.value })}
            className="input"
          />
        </div>

        <PainSelector
          value={formData.painLevel}
          onChange={level => set({ painLevel: level })}
        />

        <PainLocationGrid
          selected={formData.painLocations}
          onChange={loc => set({ painLocations: loc })}
        />

        <MedicalConditionGrid
          selected={formData.medicalConditions}
          onChange={mc => set({ medicalConditions: mc })}
        />
      </div>

      <BookingCart
        cart={state.cart}
        updateCart={cart => update({ cart })}
        onContinue={() => update({ step: 4 })}
        onBack={() => update({ step: 2 })}
      />
    </div>
  )
}