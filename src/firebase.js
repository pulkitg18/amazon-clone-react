import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrb1iLaxPcKryGIcH06XeaZOoQRz8xFUo",
  authDomain: "clone-69cc5.firebaseapp.com",
  databaseURL: "https://clone-69cc5.firebaseio.com",
  projectId: "clone-69cc5",
  storageBucket: "clone-69cc5.appspot.com",
  messagingSenderId: "701157642099",
  appId: "1:701157642099:web:473726e26ac0f0a05a7f06",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();

// export { db,auth};
