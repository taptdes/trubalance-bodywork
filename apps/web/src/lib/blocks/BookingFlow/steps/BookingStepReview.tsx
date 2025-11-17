import type { BookingState } from "../types"

export function BookingStepReview({
  state,
}: {
  state: BookingState
  update: (patch: Partial<BookingState>) => void
}) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <h2 className="text-xl font-semibold mb-4">Review Your Booking</h2>

      <pre className="text-xs bg-gray-50 p-4 rounded-lg">
        {JSON.stringify(state, null, 2)}
      </pre>

      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
        onClick={() => alert("Booking complete!")}
      >
        Confirm Booking
      </button>
    </div>
  )
}