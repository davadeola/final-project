// Firebase related

import styles from "../styles/Home.module.css";
import GoogleSignIn from "../components/GoogleSignIn";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className="container" style={{ width: "100vw" }}>
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/login.jpeg"
              alt="Login img"
              style={{ width: "100%", height: "30em" }}
            />
          </div>
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
            <h1>Login into your Account</h1>
            <p className="lead">Step into your account to start.</p>
            <GoogleSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
