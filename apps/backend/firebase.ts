import admin from "firebase-admin"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env file FIRST (before anything else)
dotenv.config({ path: path.resolve(process.cwd(), ".env.staging") })

let serviceAccount: any // Use 'any' to access both snake_case and camelCase properties

// USE ONLY THIS METHOD FOR RENDER + LOCAL
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    console.log("✅ Using FIREBASE_SERVICE_ACCOUNT environment variable")
  } catch (error) {
    console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT:", error)
    process.exit(1)
  }
} else {
  console.error("❌ Missing FIREBASE_SERVICE_ACCOUNT environment variable")
  console.error("Please make sure .env.staging exists with FIREBASE_SERVICE_ACCOUNT set")
  process.exit(1)
}

if (!process.env.FIREBASE_STORAGE_BUCKET) {
  console.error("❌ Missing FIREBASE_STORAGE_BUCKET")
  process.exit(1)
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
}

const db = admin.firestore()
const bucket = admin.storage().bucket()

console.log("🔥 Firebase initialized")
console.log("   Project ID:", serviceAccount.project_id || serviceAccount.projectId)
console.log("   Storage Bucket:", process.env.FIREBASE_STORAGE_BUCKET)

export { db, admin, bucket }