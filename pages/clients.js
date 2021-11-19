import styles from "../styles/Home.module.css";
import Link from "next/link";
import ClientCard from "../components/ClientCard";

//firebase store
import { db, storage } from "../firebase/clientApp";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useState, useContext, useEffect } from "react";

//importing context
import { AuthContext } from "../context/AuthContext";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <section className="row section">
        <div className="col-md-9">
          <h2>Clients</h2>
          <p className="lead">Select a client to view their assigned images.</p>
        </div>
        <div className="col-md-3">
          <Link href="/newclient">
            <button className="btn btn-primary" type="button">
              Add New
            </button>
          </Link>
        </div>
      </section>
      <section className="row">
        {clients.map((client, i) => {
          return <ClientCard key={i} client={client} />;
        })}
      </section>
    </div>
  );
}
