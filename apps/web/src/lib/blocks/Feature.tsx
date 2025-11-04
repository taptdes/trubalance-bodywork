import type { PageType } from "@/components/ui/navigation/types"
import type { FeatureProps } from "@/lib/types"
import { useNavigate } from "react-router-dom"

export function Feature({ title, description, buttons, onNavigate }: FeatureProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold font-merriweather">{title}</h2>
      <hr className="w-16 border-t-4 border-gray-300" />
      <p className="text-lg leading-relaxed text-gray-700">
        {description}
      </p>
      {buttons && buttons.length > 0 && (
        <div className="flex gap-4">
          {buttons.map((btn, idx) => {
            const pageFromTo = (btn.to.startsWith("/") ? btn.to.slice(1) : btn.to) as PageType
            return (
              <button
                key={idx}
                type="button"
                className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-primary-dark transition"
                onClick={() => {
                  onNavigate(pageFromTo)
                  navigate(btn.to)
                }}
              >
                {btn.text}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
