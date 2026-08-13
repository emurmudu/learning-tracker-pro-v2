import { firebaseAdmin } from "../config/firebaseAdmin.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing authentication token." });
    }

    const token = header.replace("Bearer ", "");
    req.user = await firebaseAdmin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired authentication token." });
  }
}
