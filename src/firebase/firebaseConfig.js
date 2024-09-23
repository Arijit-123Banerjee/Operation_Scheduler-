import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "operation-fe8ea.firebaseapp.com",
  projectId: "operation-fe8ea",
  storageBucket: "operation-fe8ea.appspot.com",
  messagingSenderId: "238426667078",
  appId: "1:238426667078:web:6fae04849b1df8e998f247",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export default app;
