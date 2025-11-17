import { BookingCart } from "../components/BookingCart"
import type { BookingState } from "../types"

const TIME_SLOTS = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
]

export function BookingStepDateTime({
  state,
  update,
}: {
  state: BookingState
  update: (patch: Partial<BookingState>) => void
}) {
  const { selectedDate, selectedTime } = state

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">

        {/* Calendar placeholder */}
        <div className="bg-white p-6 rounded-xl border">Calendar Component</div>

        {/* Time Slots */}
        {selectedDate && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Choose a Time</h4>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map(t => (
                <button
                  key={t}
                  onClick={() => update({ selectedTime: t })}
                  className={`p-2 rounded-lg text-sm border ${
                    selectedTime === t
                      ? "bg-black text-white"
                      : "bg-white hover:border-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <BookingCart
        cart={state.cart}
        updateCart={cart => update({ cart })}
        onContinue={() => update({ step: 3 })}
        onBack={() => update({ step: 1 })}
      />
    </div>
  )
}