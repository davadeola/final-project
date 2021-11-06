// Firebase related

import { useState } from "react";
import { auth, provider } from "../app/firebaseApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import styles from "../styles/Home.module.css";

export default function Login() {
  const loginWithFirebase = () => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className="container" style={{ width: "100vw" }}>
        <div className="row">
          <div className="col-md-6"></div>
          <div
            className="col-md-6"
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              minHeight: "70vh",
              alignContent: "center",
            }}
          >
            <h2>Login into your Account</h2>
            <p className="lead">Step into your account to start.</p>
            <button className="btn btn-primary" onClick={loginWithFirebase}>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
