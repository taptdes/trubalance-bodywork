import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { db, admin, bucket } from "./firebase.js"
import { fileURLToPath } from "url"
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise"
import { verifyRecaptcha } from "./src/utils/verifyRecaptcha.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../.env.staging") })

const app = express()

// bucket is now imported from firebase.js, no need to redeclare

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error("Not allowed by CORS"))
  },
  methods: ["GET", "POST", "OPTIONS"],
}))

app.use(express.json())

const recaptchaClient = new RecaptchaEnterpriseServiceClient()

// Contact route
app.post("/contact", async (req: Request, res: Response) => {
  const { name, email, phone, message, recaptchaToken } = req.body
  
  if (!recaptchaToken) {
    return res.status(400).json({ message: "Missing reCAPTCHA token" })
  }
  
  const result = await verifyRecaptcha(recaptchaToken, "contact_form")
  
  if (!result.valid) {
    return res.status(400).json({
      message: "Failed reCAPTCHA verification",
      reason: result.reason,
      score: result.score,
    })
  }
  
  const docRef = await db.collection("appointments").add({
    name,
    email,
    phone,
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })
  
  res.json({ message: "Success", id: docRef.id })
})

// Get signed URL for an image from Firebase Storage
app.get("/images/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params
    const file = bucket.file(`images/${filename}`)
    
    // Check if file exists
    const [exists] = await file.exists()
    if (!exists) {
      return res.status(404).json({ message: "Image not found" })
    }
    
    // Generate a signed URL (valid for 1 hour)
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    })
    
    // Redirect to the signed URL
    res.redirect(url)
  } catch (error) {
    console.error("Error fetching image:", error)
    res.status(500).json({ message: "Error fetching image" })
  }
})

// Alternative: Get public URL (if bucket is public)
app.get("/images/public/:filename", (req: Request, res: Response) => {
  const { filename } = req.params
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/images/${filename}`
  res.redirect(publicUrl)
})

app.get("/", (req, res) => res.send("🚀 Backend is running"))

const PORT = process.env.BACKEND_PORT || 3000
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))

export default app