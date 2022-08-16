import firebase from "firebase/app";
import  "firebase/auth";

export const auth = firebase.initializeApp({
        apiKey: "AIzaSyA07BbISzq_fWyCeUSaELxasq1WMhi9r8o",
        authDomain: "unichat-3640e.firebaseapp.com",
        projectId: "unichat-3640e",
        storageBucket: "unichat-3640e.appspot.com",
        messagingSenderId: "312310828733",
        appId: "1:312310828733:web:5a6cde98731b1d85ed31d4"
      }).auth();
   
