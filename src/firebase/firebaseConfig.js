import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyD5YeMnJbYSgX_UbH_SJS0yYVkkjieK3Us",
  authDomain: "adopet-ab7a1.firebaseapp.com",
  databaseURL: "https://adopet-ab7a1-default-rtdb.firebaseio.com",
  projectId: "adopet-ab7a1",
  storageBucket: "adopet-ab7a1.appspot.com",
  messagingSenderId: "307603378149",
  appId: "1:307603378149:web:fb8a8623b2d50cfcbc690c",
  measurementId: "G-1WYB9PCCV5",
};
// Initialize Firebase

if (!firebase.default.apps.length) {
  firebase.default.initializeApp(firebaseConfig);
}

export { firebase };
