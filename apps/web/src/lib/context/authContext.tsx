import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import axios from "axios"

export interface UserProfile {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
  signOut: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const API_URL = import.meta.env.VITE_BACKEND_URL || "https://trubalance-bodywork.onrender.com"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage if token exists
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      fetchUser().finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) return

      const uid = localStorage.getItem("uid")
      if (!uid) return

      const res = await axios.get(`${API_URL}/auth/profile/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setUser(res.data.user)
    } catch (err) {
      console.error("Failed to fetch user:", err)
      setUser(null)
    }
  }

const signIn = async (email: string, password: string) => {
  try {
    const uidRes = await axios.post(`${API_URL}/auth/signin-with-password`, { email, password })
    const { uid } = uidRes.data

    const tokenRes = await axios.post(`${API_URL}/auth/signin`, { uid })
    const { token } = tokenRes.data

    localStorage.setItem("uid", uid)
    localStorage.setItem("authToken", token)
    await fetchUser()
  } catch (err) {
    console.error("Sign in failed:", err)
    throw err
  }
}

const signUp = async (data: { email: string; password: string; firstName?: string; lastName?: string }) => {
  try {
    await axios.post(`${API_URL}/auth/signup`, data)
    await signIn(data.email, data.password)
  } catch (err: any) {
    console.error("Sign up failed:", err?.response?.data || err)
    throw err
  }
}

  const signOut = () => {
    localStorage.removeItem("authToken")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, signIn, signUp, signOut, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
