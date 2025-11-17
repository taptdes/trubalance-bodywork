import type { CartItem } from "../types"

export function BookingCart({
  cart,
  // updateCart,
  onContinue,
  onBack,
}: {
  cart: CartItem[]
  updateCart: (items: CartItem[]) => void
  onContinue: () => void
  onBack?: () => void
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.service.price,
    0
  )

  return (
    <div className="bg-white p-4 border rounded-xl shadow-sm sticky top-20">
      <h3 className="font-semibold mb-2">Your Cart</h3>

      {cart.length === 0 && (
        <p className="text-sm text-gray-500">No services selected.</p>
      )}

      {cart.map(item => (
        <div key={item.service.id} className="flex justify-between text-sm">
          <span>
            {item.service.name} × {item.quantity}
          </span>
          <span>${item.quantity * item.service.price}</span>
        </div>
      ))}

      <div className="border-t mt-3 pt-3 flex justify-between">
        <span className="font-semibold">Total:</span>
        <span className="font-semibold">${total}</span>
      </div>

      {onBack && (
        <button
          className="w-full mt-3 py-2 border rounded-lg text-sm"
          onClick={onBack}
        >
          Back
        </button>
      )}

      <button
        className="w-full mt-2 py-2 bg-black text-white rounded-lg text-sm"
        onClick={onContinue}
        disabled={cart.length === 0}
      >
        Continue
      </button>
    </div>
  )
}