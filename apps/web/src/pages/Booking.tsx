import { BookingFlow } from '@/lib/blocks/BookingFlow/BookingFlow'

export function Booking() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      <BookingFlow />
    </div>
  )
}
