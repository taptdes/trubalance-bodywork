export function PainSelector({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="font-semibold mb-3">Pain Level (0–10)</h3>
      <div className="flex gap-2">
        {[...Array(11)].map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`w-8 h-8 rounded-lg border ${
              value === i ? "bg-black text-white" : "bg-white"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  )
}