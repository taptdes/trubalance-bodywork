// BookingFlow/components/InfoCard.tsx
import React from "react"

export function InfoCard({
  children,
  title,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-blue-50 p-4 border border-blue-200 rounded-xl">
      <h4 className="font-semibold text-sm text-blue-900 mb-2">{title}</h4>
      <div className="text-xs text-blue-800 space-y-1">{children}</div>
    </div>
  )
}