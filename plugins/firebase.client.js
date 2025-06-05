import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyA38AGtzjbqRDnrtXIZ1KJ7yzJPtKYX7hs",
    authDomain: "mood-tracking-f73b3.firebaseapp.com",
    projectId: "mood-tracking-f73b3",
    storageBucket: "mood-tracking-f73b3.firebasestorage.app",
    messagingSenderId: "1084589204114",
    appId: "1:1084589204114:web:a6bf0d255e7ae6745f7c4b",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return {
    provide: {
      firebaseApp: app,
      db,
      auth,
    },
  };
});
