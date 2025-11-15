import { admin, bucket } from "./firebase.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function uploadImage(localPath: string, storagePath: string) {
  try {
    await bucket.upload(localPath, {
      destination: storagePath,
      metadata: {
        contentType: 'image/webp', // Adjust based on your image type
        cacheControl: 'public, max-age=31536000', // Cache for 1 year
      },
    })
    
    // Make the file public (optional)
    const file = bucket.file(storagePath)
    await file.makePublic()
    
    console.log(`✅ Uploaded: ${storagePath}`)
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`
    console.log(`   URL: ${publicUrl}`)
  } catch (error) {
    console.error(`❌ Error uploading ${localPath}:`, error)
  }
}

async function uploadAllImages() {
  // Changed from "../assets/images" to "./assets/images"
  const imagesDir = path.join(__dirname, "assets/images")
  
  // Check if directory exists
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Images directory not found: ${imagesDir}`)
    console.error(`   Current directory: ${__dirname}`)
    process.exit(1)
  }
  
  const files = fs.readdirSync(imagesDir)
  console.log(`📁 Found ${files.length} files in ${imagesDir}`)
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      const localPath = path.join(imagesDir, file)
      const storagePath = `images/${file}`
      await uploadImage(localPath, storagePath)
    }
  }
  
  console.log("\n✨ All images uploaded!")
}

uploadAllImages().catch(console.error)