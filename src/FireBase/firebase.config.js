

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdUitv2xWvhXJV2TmLquRlutzYb4Bb74w",
  authDomain: "house-hunter-ed1d3.firebaseapp.com",
  projectId: "house-hunter-ed1d3",
  storageBucket: "house-hunter-ed1d3.appspot.com",
  messagingSenderId: "1096044438171",
  appId: "1:1096044438171:web:5b13d36e6b6b38e4545c3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;