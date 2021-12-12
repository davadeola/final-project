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
  const Router = useRouter();
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    if (AuthCtx.currentUser != null) {
      setDoc(doc(db, "photographers", AuthCtx.currentUser.email), {
        userName: AuthCtx.currentUser.displayName,
        userPhotoLink: AuthCtx.currentUser.photoURL,
      });
    } else {
      Router.push("/login");
    }
  }, []);
  return (
    <AuthRoute>
      <div className={`container ${styles.container}`}>
        <Content />
      </div>
    </AuthRoute>
  );
}
