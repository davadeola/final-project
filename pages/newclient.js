import { useState } from "react";

import NewClientForm from "../components/NewClientForm";
import AuthRoute from "../HOC/authRoute";

import styles from "../styles/Home.module.css";

export default function NewClient() {
  return (
    <AuthRoute>
      <div className={`container ${styles.container}`}>
        <div className="row text-center">
          <h2>Enter Your Client’s Details</h2>
        </div>
        <div className="row">
          <NewClientForm />
        </div>
      </div>
    </AuthRoute>
  );
}
