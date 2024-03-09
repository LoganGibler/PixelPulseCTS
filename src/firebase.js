import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOjgzvBQmA2AdOlaCzYwXGcV09M5-e-CE",
  authDomain: "pixelpulsects-57759.firebaseapp.com",
  projectId: "pixelpulsects-57759",
  storageBucket: "pixelpulsects-57759.appspot.com",
  messagingSenderId: "355290369441",
  appId: "1:355290369441:web:688e478b65eb33ebf50fe0",
  measurementId: "G-9GSPC319PK",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
