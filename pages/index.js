import Image from "next/image";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { Content } from "../components/Content";

import { db } from "../firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";
import AuthRoute from "../HOC/authRoute";

export default function Home() {
  return (
    <AuthRoute>
      <div className={`container ${styles.container}`}>
        <Content />
      </div>
    </AuthRoute>
  );
}
