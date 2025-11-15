import { admin } from "../../firebase.js"
import { Request, Response, NextFunction } from "express"

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: "Missing auth token" })

  const token = authHeader.split(" ")[1]
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    (req as any).uid = decoded.uid
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}