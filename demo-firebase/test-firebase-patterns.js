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
// const added_element = await addDoc(collection(db, "patterns"), {
//     name: "C",
//     pattern: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
//   });
// console.log("Created with ID:", added_element.id);

// delete one record
// await deleteDoc(doc(db, "patterns", "HDTLXutK1VxQ8PdUYL78"));

// read all
const elements = await getDocs(collection(db, "patterns"));
elements.forEach(function(doc) {
    console.log(doc.id)
    console.log(doc.data())
});

// read with filter
// const q = query(collection(db, "pattern"), where("patterns", "==", "A"));
// const result = await getDocs(q);
// result.forEach(function(doc) {
//   console.log(doc.id)
//   console.log(doc.data())
// });

// update
// await updateDoc(doc(db, "patterns", "cCLMy7YqfS1FV23V4SvR"), {
//   values: [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
// });

await terminate(db);
await deleteApp(app);

