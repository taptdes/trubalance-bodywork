import { BookingCart } from "../components/BookingCart"
import { services } from "../../../data/services"
import type { BookingState } from "../types"

export function BookingStepServices({
  state,
  update,
}: {
  state: BookingState
  update: (patch: Partial<BookingState>) => void
}) {
  const { cart, selectedDurations } = state
  const typedSelectedDurations: Record<string, number> = selectedDurations

  const selectDuration = (serviceTitle: string, duration: number) => {
    update({
      selectedDurations: {
        ...selectedDurations,
        [serviceTitle]: duration,
      },
    })

    const service = services.find(s => s.title === serviceTitle)
    if (!service) return

    const exists = cart.find(
      item => item.service.name === serviceTitle && item.duration === duration
    )

    if (exists) {
      update({
        cart: cart.map(item =>
          item.service.name === serviceTitle && item.duration === duration
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      const mapToService = (s: any, duration: number) => ({
        id: s.title,
        name: s.title,
        price: s.prices[duration],
        duration,
        description: s.description,
        image: s.image,
        icon: s.icon,
        color: '#000000', // default color, adjust if needed
        iconColor: '#FFFFFF', // default icon color
        popular: s.popularity,
      })
      update({
        cart: [...cart, { service: mapToService(service, duration), duration, quantity: 1 }],
      })
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="grid gap-4">
          {services.map(service => {
            const selected = typedSelectedDurations[service.title]
            return (
              <div
                key={service.title}
                className="bg-white p-4 border rounded-xl shadow-sm"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold flex items-center gap-2">{service.icon}{service.title}</h3>
                  <span>${service.prices[service.durations[0]]}</span>
                </div>

                <p className="text-xs text-gray-500 mb-3">
                  {service.description}
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {service.durations.map(d => (
                    <button
                      key={d}
                      className={`text-xs p-2 rounded-lg border ${
                        selected === d
                          ? "bg-black text-white"
                          : "bg-gray-50 hover:border-gray-300"
                      }`}
                      onClick={() => selectDuration(service.title, d)}
                    >
                      {d} min
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BookingCart
        cart={state.cart}
        updateCart={cart => update({ cart })}
        onContinue={() => update({ step: 2 })}
      />
    </div>
  )
}