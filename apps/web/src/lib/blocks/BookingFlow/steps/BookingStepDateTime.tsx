import { BookingCalendar } from '../components/BookingCalendar'
import { BookingCart } from '../components/BookingCart'
import type { BookingState } from '../types'

const TIME_SLOTS = [
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
]

export function BookingStepDateTime({
  state,
  update,
}: {
  state: BookingState
  update: (patch: Partial<BookingState>) => void
}) {
  const { selectedDate, selectedTime, selectedDuration, isRecurring } = state

  const handleNextAvailableDate = () => {
    // Find the next available date (for now, just select tomorrow)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    update({ selectedDate: tomorrow })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <BookingCalendar
          selectedDate={selectedDate}
          onSelectDate={(date) => update({ selectedDate: date })}
          duration={selectedDuration}
          onDurationChange={(duration) => update({ selectedDuration: duration })}
          isRecurring={isRecurring}
          onRecurringChange={(recurring) => update({ isRecurring: recurring })}
          onNextAvailableDate={handleNextAvailableDate}
        />

        {/* Time Slots */}
        {selectedDate && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold mb-4 text-gray-900">
              Available Time Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map(t => (
                <button
                  key={t}
                  onClick={() => update({ selectedTime: t })}
                  className={`text-xs p-2 rounded-lg border ${
                    selectedTime === t
                      ? 'bg-black text-white'
                      : 'bg-gray-50 hover:border-gray-300'
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
        updateCart={(cart) => update({ cart })}
        onContinue={() => update({ step: 3 })}
        onBack={() => update({ step: 1 })}
      />
    </div>
  )
}
