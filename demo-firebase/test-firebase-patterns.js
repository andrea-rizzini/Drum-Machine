// Import the functions you need from the SDKs you need
import { initializeApp, deleteApp } from "firebase/app";
import {
  getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, onSnapshot,
  query, orderBy, serverTimestamp, terminate, where, doc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPnbzfTOigLTL60pDcQkM1eNbZtemv7IA",
  authDomain: "drum-machine-2-99c5b.firebaseapp.com",
  projectId: "drum-machine-2-99c5b",
  storageBucket: "drum-machine-2-99c5b.firebasestorage.app",
  messagingSenderId: "559427055249",
  appId: "1:559427055249:web:63e3261a78be9be50c9930"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// insert
// const added_element = await addDoc(collection(db, "patterns"), {
//     name: "B",
//     pattern: [false, false, false, false],
//   });
// console.log("Created with ID:", added_element.id);

// delete one record
// await deleteDoc(doc(db, "patterns", "HDTLXutK1VxQ8PdUYL78"));

// read all
// const elements = await getDocs(collection(db, "patterns"));
// elements.forEach(function(doc) {
//     console.log(doc.id)
//     console.log(doc.data())
// });

// read with filter
// const q = query(collection(db, "patterns"), where("name", "==", "A"));
// const result = await getDocs(q);
// result.forEach(function(doc) {
//   console.log(doc.id)
//   console.log(doc.data())
// });

// update
await updateDoc(doc(db, "patterns", "wHAsqbLTEPTVA2GAypv2"), {
  values: [true, false, true, false],
});

const q = query(collection(db, "patterns"), where("name", "==", "A"));
const result = await getDocs(q);
result.forEach(function(doc) {
  console.log(doc.id)
  console.log(doc.data())
});

await terminate(db);
await deleteApp(app);

