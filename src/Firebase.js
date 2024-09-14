import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjMVhdh2rVm1smd2GuJ22fyvNun4aQh1s",
  authDomain: "operation-fe8ea.firebaseapp.com",
  projectId: "operation-fe8ea",
  storageBucket: "operation-fe8ea.appspot.com",
  messagingSenderId: "238426667078",
  appId: "1:238426667078:web:6fae04849b1df8e998f247",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, query, where, getDocs };
