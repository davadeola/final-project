import Image from "next/image";
import { useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Content } from "../components/Content";

import { db } from "../firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";
import AuthRoute from "../HOC/authRoute";

export default function Home() {
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    setDoc(doc(db, "photographers", AuthCtx.currentUser.email), {
      userName: AuthCtx.currentUser.displayName,
      userPhotoLink: AuthCtx.currentUser.photoURL,
    });
  }, []);
  return (
    <AuthRoute>
      <div className={styles.container}>
        <Content />
      </div>
    </AuthRoute>
  );
}
