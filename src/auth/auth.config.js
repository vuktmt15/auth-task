const { getAuth } = require("firebase/auth");
const { initializeApp } = require("firebase/app");

const appFirebase = initializeApp({
  apiKey: "AIzaSyDuRFpe8xDU-EEMRtc57IIhe-W12NvLlA4",
  authDomain: "auth-task-with-firebase.firebaseapp.com",
  projectId: "auth-task-with-firebase",
  storageBucket: "auth-task-with-firebase.appspot.com",
  messagingSenderId: "404870471921",
  appId: "1:404870471921:web:3ea4711d60bacc45130950",
  measurementId: "G-V6BQ1SD612",
});
const auth = getAuth(appFirebase);

module.exports = auth;
