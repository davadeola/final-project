import { useState } from "react";
import Link from "next/link";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NewClientForm from "../components/NewClientForm";
import AuthRoute from "../HOC/authRoute";

import styles from "../styles/Home.module.css";

export default function NewClient() {
  return (
    <AuthRoute>
      <div className={`container ${styles.container}`}>
        <div className="row text-center">
          <div className="col-md-2">
            <div className="d-flex align-self-center">
              <Link href="/clients">
                <a>
                  <FontAwesomeIcon icon={faLongArrowAltLeft}></FontAwesomeIcon>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-md-10">
            <h2>Enter Your Client’s Details</h2>
          </div>
        </div>
        <div className="row">
          <NewClientForm />
        </div>
      </div>
    </AuthRoute>
  );
}
