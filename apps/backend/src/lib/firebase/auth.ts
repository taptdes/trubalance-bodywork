import { admin, db } from "../../../firebase.js"
import { Request, Response } from "express"

// User profile type
interface UserProfile {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  photoURL?: string;
}

// --- Sign up ---
export async function signUp(req: Request, res: Response) {
  try {
    const { email, password, firstName, lastName, phone, dateOfBirth } = req.body
    if (!email || !password) return res.status(400).json({ message: "Email and password required" })

    const userRecord = await admin.auth().createUser({ email, password })

    const profile: UserProfile = { uid: userRecord.uid, email, firstName, lastName, phone, dateOfBirth }
    await db.collection("users").doc(userRecord.uid).set(profile)

    res.status(201).json({ message: "User created", user: profile })
  } catch (error: any) {
    console.error("Error signing up:", error)
    res.status(500).json({ message: error.message })
  }
}

// --- Sign in (custom token) ---
export async function signIn(req: Request, res: Response) {
  try {
    const { uid } = req.body
    if (!uid) return res.status(400).json({ message: "UID required" })

    const token = await admin.auth().createCustomToken(uid)
    res.json({ token })
  } catch (error: any) {
    console.error("Error signing in:", error)
    res.status(500).json({ message: error.message })
  }
}

// --- Get profile ---
export async function getProfile(req: Request, res: Response) {
  try {
    const uid = (req as any).uid || req.params.uid
    const doc = await db.collection("users").doc(uid).get()

    if (!doc.exists) return res.status(404).json({ message: "User not found" })

    res.json({ user: doc.data() })
  } catch (error: any) {
    console.error("Error fetching profile:", error)
    res.status(500).json({ message: error.message })
  }
}

// --- Update profile ---
export async function updateProfile(req: Request, res: Response) {
  try {
    const uid = (req as any).uid || req.params.uid
    const data = req.body

    await db.collection("users").doc(uid).update(data)
    const updated = await db.collection("users").doc(uid).get()

    res.json({ user: updated.data() })
  } catch (error: any) {
    console.error("Error updating profile:", error)
    res.status(500).json({ message: error.message })
  }
}

// --- Delete user ---
export async function deleteUser(req: Request, res: Response) {
  try {
    const uid = (req as any).uid || req.params.uid

    await admin.auth().deleteUser(uid)
    await db.collection("users").doc(uid).delete()

    res.json({ message: "User deleted" })
  } catch (error: any) {
    console.error("Error deleting user:", error)
    res.status(500).json({ message: error.message })
  }
}