import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_CONFIGS } from "../configs/firebase.configs";

// Chỉ khởi tạo 1 lần
const app =
  getApps().length === 0 ? initializeApp(FIREBASE_CONFIGS) : getApps()[0];
console.log("✅ Firebase App Initialized:", app.name); // 👈 Log khi init

export const auth = getAuth(app);
