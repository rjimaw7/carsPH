import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIjIW7u9OchlonWepTD04J_fCjrdA-JSs",
  authDomain: "carsph-7ba96.firebaseapp.com",
  projectId: "carsph-7ba96",
  storageBucket: "carsph-7ba96.appspot.com",
  messagingSenderId: "714567497079",
  appId: "1:714567497079:web:af847a79b0e39851e91d72",
  measurementId: "G-RS015D930C",
};
// Initialize Firebase

initializeApp(firebaseConfig);

export const db = getFirestore();
