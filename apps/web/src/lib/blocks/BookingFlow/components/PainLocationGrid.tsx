const LOCATIONS = [
  "Neck",
  "Upper Back",
  "Lower Back",
  "Shoulders",
  "Arms",
  "Hips",
  "Legs",
  "Headaches",
  "Other",
]

export function PainLocationGrid({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (locations: string[]) => void
}) {
  const toggle = (loc: string) => {
    onChange(
      selected.includes(loc)
        ? selected.filter(l => l !== loc)
        : [...selected, loc]
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="font-semibold mb-3">Pain Locations</h3>
      <div className="grid grid-cols-3 gap-2">
        {LOCATIONS.map(loc => (
          <button
            key={loc}
            onClick={() => toggle(loc)}
            className={`p-2 text-xs border rounded-lg ${
              selected.includes(loc)
                ? "bg-black text-white"
                : "bg-white hover:border-gray-300"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  )
}