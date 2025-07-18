

// import { initializeApp } from "firebase/app";


// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "blog-6b302.firebaseapp.com",
//   projectId: "blog-6b302",
//   storageBucket: "blog-6b302.appspot.com",
//   messagingSenderId: "622580154981",
//   appId: "1:622580154981:web:8663400d842a17c1cf3c8c",
//   measurementId: "G-8F29VK5WTR"
// };

// export const app = initializeApp(firebaseConfig);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-6b302.firebaseapp.com",
  projectId: "blog-6b302",
  storageBucket: "blog-6b302.appspot.com",
  messagingSenderId: "622580154981",
  appId: "1:622580154981:web:8663400d842a17c1cf3c8c",
  measurementId: "G-8F29VK5WTR"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);