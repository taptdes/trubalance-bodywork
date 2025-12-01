import { Router } from "express"
import { db, FieldValue } from "../lib/firebase/admin.js"
import { Article, Comment } from "../utils/types"

const router = Router()

// GET all articles
router.get("/", async (_req, res) => {
  try {
    const snapshot = await db.collection("articles").get()
    const articles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (Article & { id: string })[]

    res.json({ articles })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch articles" })
  }
})

// GET single article
router.get("/:id", async (req, res) => {
  try {
    const ref = db.collection("articles").doc(req.params.id)
    const doc = await ref.get()

    if (!doc.exists) {
      return res.status(404).json({ error: "Article not found" })
    }

    res.json({ article: { id: doc.id, ...doc.data() } })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch article" })
  }
})

// Increment view count
router.post("/:id/view", async (req, res) => {
  try {
    const ref = db.collection("articles").doc(req.params.id)

    await ref.update({
      views: FieldValue.increment(1),
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to increment view count" })
  }
})

// Get comments
router.get("/:id/comments", async (req, res) => {
  try {
    const ref = db.collection("articles").doc(req.params.id)
    const doc = await ref.get()

    const comments = (doc.data()?.comments || []) as Comment[]

    res.json({ comments })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" })
  }
})

// Add comment
router.post("/:id/comments", async (req, res) => {
  try {
    const { content, userName } = req.body

    if (!content) return res.status(400).json({ error: "Content required" })

    const ref = db.collection("articles").doc(req.params.id)

    const comment: Comment = {
      id: Date.now().toString(),
      userName: userName || "Guest",
      content,
      createdAt: new Date().toISOString(),
    }

    await ref.update({
      comments: FieldValue.arrayUnion(comment),
    })

    res.json({ comment })
  } catch (err) {
    res.status(500).json({ error: "Failed to post comment" })
  }
})

router.post("/:id/like", async (req, res) => {
  const { id } = req.params

  try {
    const articleRef = db.collection("articles").doc(id)

    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(articleRef)
      if (!doc.exists) throw new Error("Article not found")

      const currentLikes = doc.data()?.likes || 0
      transaction.update(articleRef, { likes: currentLikes + 1 })
    })

    const updatedDoc = await articleRef.get()
    const updatedLikes = updatedDoc.data()?.likes || 0

    res.json({ likes: updatedLikes })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to like article" })
  }
})

export default router