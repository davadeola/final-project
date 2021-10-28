import { initializeApp, getApps } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../config/firebaseApp.config.js";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { firebase, auth };
