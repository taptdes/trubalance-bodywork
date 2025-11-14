import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { db, admin } from "./firebase.js"
import { fileURLToPath } from "url"
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise"
import { verifyRecaptcha } from "./src/utils/verifyRecaptcha.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env (adjust path if needed)
dotenv.config({ path: path.resolve(__dirname, "../.env.staging") })

const app = express()

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

// Initialize reCAPTCHA client
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

  // Save to Firestore
  const docRef = await db.collection("appointments").add({
    name,
    email,
    phone,
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  res.json({ message: "Success", id: docRef.id })
})

// Serve static images (adjust path depending on your build)
app.use("/images", express.static(path.join(__dirname, "../assets/images")))

// Test endpoint
app.get("/test-image", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/images/services_swedish.webp"))
})
app.get("/", (req, res) => res.send("🚀 Backend is running"))

// Start server
const PORT = process.env.BACKEND_PORT || 3000
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))

export default app