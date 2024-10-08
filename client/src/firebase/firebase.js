// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSUX9F-oAIqpWlG6-6ihZotsrX8nf8b6c",
  authDomain: "fddms-143aa.firebaseapp.com",
  projectId: "fddms-143aa",
  storageBucket: "fddms-143aa.appspot.com",
  messagingSenderId: "698113378669",
  appId: "1:698113378669:web:f3e4286fa18b97704eb264",
  measurementId: "G-HXDCSJ4JKV",
  databaseURL: "https://fddms-143aa-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  
const auth = getAuth(app);

// Export the auth object for use in other parts of the app
export { auth };
