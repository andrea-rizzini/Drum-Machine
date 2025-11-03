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

// MODEL
let leds_status = Array(16).fill(false)
let led_status_patterns = Array(2).fill(false)
let led_play_button_status = false
let time = 0
const colors = ["red", "orange", "yellow", "white"]; // 4
let bpm = 60
let timerId = null
let ms_from_bpm = 1000
let bpm_text = 0
let pattern_a = Array(16).fill(false)
let pattern_b = Array(16).fill(false)

// VIEW
function render() {
  document.querySelectorAll(".led").forEach(
    function (led, index) {
      led.classList.toggle("led-on", leds_status[index])
    }
  )
  document.querySelectorAll(".key").forEach(
    function (key, index) {
      key.classList.toggle("active-key", time == index)
    }
  )
  document.getElementById("speaker").classList.toggle("speaker-on", leds_status[time])
  document.querySelector(".monitor_bpm").textContent = bpm
  document.querySelector(".led_play_button").classList.toggle("led-on", led_play_button_status)
   document.querySelectorAll(".led_pattern_button").forEach(
    function(key, index) {
      key.classList.toggle("led-on", led_status_patterns[index])
    }
  )
}

// CONTROLLER
let keysContainer = document.getElementById("key_div")

leds_status.forEach(function(s, i) {
  let k = document.createElement("div")
  k.classList.add("key")

  let colorClass = colors[Math.floor(i / colors.length)];
  k.classList.add(colorClass);
  
  //if(time == i)
  //  k.classList.add("active-key")
  k.classList.toggle("active-key", time == i)
    
  let l = document.createElement("div")
  l.classList.add("led")
  if(s)
    l.classList.add("led-on")
  k.appendChild(l)
  
  keysContainer.appendChild(k);
  
})

document.querySelectorAll(".key").forEach(
  function(k, i) {
    k.onclick = function() {
        leds_status[i] = !leds_status[i]
        render()
      }
  }
)

document.getElementById("bpm-inc").onclick = function(){
  bpm = Math.min(300, bpm + 1);
  ms_from_bpm = 60000/bpm
  restartClock();
  render()
}

document.getElementById("bpm-dec").onclick = function(){
  bpm = Math.max(20, bpm - 1);
  ms_from_bpm = 60000/bpm
  restartClock();
  render()
}

document.querySelector(".play_button").onclick = function(){
  led_play_button_status = !led_play_button_status
  time = 0
  restartClock()
  render()
}

document.getElementById("bpm_text_button").onclick =
  function(){
    bpm_text = document.getElementById("bpm-text").value
    document.getElementById("bpm-text").value = null
    if(bpm_text >= 20 && bpm_text <=300){
      console.log(bpm_text)
      bpm = bpm_text
      ms_from_bpm = 60000/bpm
      restartClock()
      render()
    }
}

document.getElementById("pattern_a").onclick=
  async function(){
  led_status_patterns[0] = !led_status_patterns[0]
  led_status_patterns[1] = false
  if(led_status_patterns[0]){
    const q = query(collection(db, "patterns"), where("name", "==", "A"));
    const result = await getDocs(q)
    // leds_status = pattern_a.slice()
    leds_status = result.docs[0].data().pattern
  } else {
    leds_status = Array(16).fill(false)
  }
  render()
}

document.getElementById("pattern_b").onclick=
  async function(){
    led_status_patterns[0] = false;
    led_status_patterns[1] = !led_status_patterns[1]
    if(led_status_patterns[1]){
      const q = query(collection(db, "patterns"), where("name", "==", "B"));
      const result = await getDocs(q)
      // leds_status = pattern_b.slice()
      leds_status = result.docs[0].data().pattern
    }else {
      leds_status = Array(16).fill(false)
    }
    render()
}

document.getElementById("save_pattern_button_a").onclick = async function(){
  // pattern_a = leds_status.slice()
  // query to update pattern A in firebase
  await updateDoc(doc(db, "patterns", "HUIErDTWS1bKtO3NLObQ"), {
    pattern: leds_status.slice()
  });
  render()
}

document.getElementById("save_pattern_button_b").onclick = async function(){
  // pattern_b = leds_status.slice()
  // query to update pattern B in firebase
  await updateDoc(doc(db, "patterns", "up8n0zRFArEHanJbdnxt"), {
    pattern: leds_status.slice()
  });
  render()
}

function emit_sound(){
  // 
}

function nextTime() {
  time = (time + 1) % leds_status.length
  render()
  if(leds_status[time])
    emit_sound()
}

function restartClock() {
  clearInterval(timerId);
  if(led_play_button_status){
    timerId = setInterval(nextTime, ms_from_bpm);
  }
  
}

render()