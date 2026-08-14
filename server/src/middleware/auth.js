
import { getAuth } from "firebase-admin/auth";
import { firebaseAdmin } from "../config/firebaseAdmin.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Missing authentication token.",
      });
    }

    const token = header.substring(7);

    const decodedToken = await getAuth(firebaseAdmin)
      .verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Firebase authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}