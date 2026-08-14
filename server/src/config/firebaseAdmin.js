import { cert, getApps, initializeApp } from "firebase-admin/app";
import fs from "fs";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  );
} else {
  const path = new URL(
    "../../serviceAccountKey.json",
    import.meta.url
  );

  if (!fs.existsSync(path)) {
    throw new Error(
      "Missing server/serviceAccountKey.json or FIREBASE_SERVICE_ACCOUNT_JSON."
    );
  }

  serviceAccount = JSON.parse(
    fs.readFileSync(path, "utf8")
  );
}

const firebaseAdmin =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
      });

export { firebaseAdmin };