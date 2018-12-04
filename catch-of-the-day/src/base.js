import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBgGrTisw58z24i9e9iIoksm2VXHimYt3c",
  authDomain: "catch-of-the-day-aditya-shah.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-aditya-shah.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;
