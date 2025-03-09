import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjhl6oKpzhEDjXh-Scw8gVtHMpQnEQfIY",
  authDomain: "team-10-ca96f.firebaseapp.com",
  projectId: "team-10-ca96f",
  storageBucket: "team-10-ca96f.firebasestorage.app",
  messagingSenderId: "659417483201",
  appId: "1:659417483201:web:67ea46fa1d92c9911dd140",
  measurementId: "G-HDMN2FTE9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);