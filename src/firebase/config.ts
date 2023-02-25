import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDoOfRcoCi4FMjn1iL2nQ59_l5KxhXCerw",
  authDomain: "search-of-carnival-7-boracodar.firebaseapp.com",
  projectId: "search-of-carnival-7-boracodar",
  storageBucket: "search-of-carnival-7-boracodar.appspot.com",
  messagingSenderId: "819984580662",
  appId: "1:819984580662:web:f15b93a7b8dd1f9df3d897"
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage();

// Initialize Cloud Storage and get a reference to the service