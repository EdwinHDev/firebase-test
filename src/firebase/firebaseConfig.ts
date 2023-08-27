import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { FIREBASE_CONFIGURATION } from "../constants/firebaseConstantsConfig";

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIGURATION);
const db = getFirestore(app);

export { db }