import { useState } from "react";

import NewClientForm from "../components/NewClientForm";

import styles from "../styles/Home.module.css";

export default function NewClient() {
  return (
    <div className={`container ${styles.container}`}>
      <div className="row">
        <h2>Enter Your Client’s Details</h2>
      </div>
      <div className="row">
        <NewClientForm />
      </div>
    </div>
  );
}
