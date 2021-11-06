import { initializeApp, getApps } from "firebase/app";
import firebase from "firebase/compat/app";

import { firebaseConfig } from "../config/firebaseApp.config.js";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { firebase, auth, provide };
