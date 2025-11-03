// Import the functions you need from the SDKs you need
import { initializeApp, deleteApp } from "firebase/app";
import {
  getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, onSnapshot,
  query, orderBy, serverTimestamp, terminate, where, doc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// insert
// const ref1 = await addDoc(collection(db, "users"), {
//     displayName: "Mario",
//     createdAt: serverTimestamp(),
//   });
//   console.log("Created with ID:", ref1.id);

// delete one record
// await deleteDoc(doc(db, "users", "Sx4dmdJBLyBHJCU7XzYF"));

// update
// await updateDoc(doc(db, "users", "alice"), {
//   displayName: "Alice aggiornata"
// });

// read all
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach(function(doc) {
    console.log(doc.id)
    console.log(doc.data())
});

// read with selector
const q = query(collection(db, "users"), where("displayName", "==", "Bob"));
const result = await getDocs(q);
result.forEach(function(doc) {
  console.log(doc.id)
  console.log(doc.data())
});

await terminate(db);
await deleteApp(app);

