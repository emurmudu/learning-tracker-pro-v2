import admin from "firebase-admin";
import fs from "fs";

let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
} else {
  const path = new URL("../../serviceAccountKey.json", import.meta.url);
  if (!fs.existsSync(path)) {
    throw new Error("Missing server/serviceAccountKey.json or FIREBASE_SERVICE_ACCOUNT_JSON.");
  }
  credential = admin.credential.cert(JSON.parse(fs.readFileSync(path, "utf8")));
}

if (!admin.apps.length) {
  admin.initializeApp({ credential });
}

export const firebaseAdmin = admin;
