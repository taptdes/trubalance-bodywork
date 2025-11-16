import { useEffect, useState } from "react"
import { useAuth } from "@/lib/context/authContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from "axios"

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://trubalance-bodywork.onrender.com"

export default function ProfilePage() {
  const { user, fetchUser, signOut } = useAuth()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load user on mount
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        address: user.address || "",
      })
      setLoading(false)
    } else {
      fetchUser().then(() => setLoading(false))
    }
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem("authToken")
      const uid = localStorage.getItem("uid")

      await axios.patch(
        `${API_URL}/auth/profile/${uid}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      await fetchUser()
      alert("Profile updated successfully.")
    } catch (err) {
      console.error("Update failed:", err)
      alert("Failed to update profile.")
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return <div className="p-8 text-center text-lg font-medium">Loading profile…</div>

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 bg-white shadow-md rounded-xl space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <Label>First Name</Label>
          <Input
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        {/* Last Name */}
        <div>
          <Label>Last Name</Label>
          <Input
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        {/* Email (readonly) */}
        <div className="md:col-span-2">
          <Label>Email (cannot be changed)</Label>
          <Input value={user?.email || ""} readOnly className="opacity-70" />
        </div>

        {/* Phone */}
        <div>
          <Label>Phone</Label>
          <Input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        {/* DOB */}
        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <Label>Address</Label>
          <Input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="outlined"
          className="border-red-500 text-red-600 hover:bg-red-50"
          onClick={signOut}
        >
          Sign Out
        </Button>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}