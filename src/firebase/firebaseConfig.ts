// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA697KuRBnNZTKb6aYGb7YOyZSFQPJ9k9c",
  authDomain: "scaleb-20ea5.firebaseapp.com",
  projectId: "scaleb-20ea5",
  storageBucket: "scaleb-20ea5.appspot.com",
  messagingSenderId: "69186931705",
  appId: "1:69186931705:web:6940246f41a0a443f84b28",
  measurementId: "G-EPE1DV2ML9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);