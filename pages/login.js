import Head from "next/head";
import { useRouter } from "next/router";

// Firebase related

import { auth } from "../app/firebaseApp";
import styles from "../styles/Home.module.css";

export default function Login() {
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
            <button class="btn btn-primary">Login with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}
