import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { FIREBASE_CONFIGURATION } from "../constants/firebaseConstantsConfig";

// Initialize Firebase
export const app = initializeApp(FIREBASE_CONFIGURATION);
export const db = getFirestore(app);
const auth = getAuth(app);

console.log(auth)