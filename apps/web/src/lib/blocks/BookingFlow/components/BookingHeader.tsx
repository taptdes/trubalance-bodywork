const STEPS = ["Select Services", "Date & Time", "Patient Info", "Review"]

export function BookingHeader({ step }: { step: number }) {
  return (
    <div className="flex justify-between mb-10">
      {STEPS.map((s, i) => {
        const index = i + 1
        const active = index === step
        const completed = index < step

        return (
          <div key={s} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm
              ${completed ? "bg-black text-white" : active ? "border-black" : "border-gray-300"}`}
            >
              {completed ? "✓" : index}
            </div>
            <span
              className={`mt-2 text-xs ${
                active ? "font-semibold" : "text-gray-500"
              }`}
            >
              {s}
            </span>
          </div>
        )
      })}
    </div>
  )
}