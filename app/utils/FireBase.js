import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCzwJuySBcbP3NfGoxkE2jgKasOUmH6SxY",
  authDomain: "graduados-a7240.firebaseapp.com",
  databaseURL: "https://graduados-a7240.firebaseio.com",
  projectId: "graduados-a7240",
  storageBucket: "graduados-a7240.appspot.com",
  messagingSenderId: "714619466530",
  appId: "1:714619466530:web:34cc5fb2b5dd61c77a6b7b"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
