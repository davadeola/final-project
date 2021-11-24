import styles from "../styles/Home.module.css";

//firebase store
import { db } from "../firebase/clientApp";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useState, useContext, useEffect } from "react";

//importing context
import { AuthContext } from "../context/AuthContext";
import ClientList from "../components/ClientList";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState("");

  const AuthCtx = useContext(AuthContext);
  const currentUser = AuthCtx.currentUser;

  const getClients = async () => {
    if (currentUser != null) {
      const q = query(
        collection(db, "clients"),
        where("photographer", "==", currentUser.email)
      );

      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setClients(arr);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className={`container ${styles.container}`}>
      <ClientList clients={clients} />
    </div>
  );
}
