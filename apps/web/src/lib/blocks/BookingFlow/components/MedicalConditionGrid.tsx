const CONDITIONS = [
  "Diabetes",
  "Heart Disease",
  "Arthritis",
  "Osteoporosis",
  "Hypertension",
  "Depression/Anxiety",
]

export function MedicalConditionGrid({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (conditions: string[]) => void
}) {
  const toggle = (cond: string) => {
    onChange(
      selected.includes(cond)
        ? selected.filter(c => c !== cond)
        : [...selected, cond]
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="font-semibold mb-3">Medical Conditions</h3>
      <div className="grid grid-cols-2 gap-2">
        {CONDITIONS.map(cond => (
          <button
            key={cond}
            onClick={() => toggle(cond)}
            className={`p-2 text-xs border rounded-lg ${
              selected.includes(cond)
                ? "bg-black text-white"
                : "bg-white hover:border-gray-300"
            }`}
          >
            {cond}
          </button>
        ))}
      </div>
    </div>
  )
}