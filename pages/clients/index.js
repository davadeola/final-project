import styles from "../../styles/Home.module.css";
import Link from "next/link";
import ClientCard from "../../components/ClientCard";

//firebase store
import { db } from "../../firebase/clientApp";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useState, useContext, useEffect } from "react";

//importing context
import { AuthContext } from "../../context/AuthContext";
import ClientList from "../../components/ClientList";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState();
  const [photos, setPhotos] = useState([]);
  const [selClient, setSelClient] = useState("");

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

  const getPhotos = async () => {
    if (currentUser != null) {
      const q = query(
        collection(db, "photos"),
        where("photographer", "==", currentUser.email),
        where("clients", "array-contains", selClient)
      );

      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setPhotos(arr);
    }
  };

  const getClient = () => {
    var sel = clients.filter((el) => {
      return el.emailAddress == selClient;
    });

    setClient(sel);
  };

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    getPhotos();
    getClient();
  }, [selClient]);

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
              Add New Client
            </button>
          </Link>
        </div>
      </section>
      <section className="d-flex flex-row">
        {clients.map((client, i) => {
          return (
            <Link
              href="/clients/[id]"
              as={"/clients/" + client.emailAddress}
              key={client.emailAddress}
            >
              <a>
                <ClientCard client={client} setSelClient={setSelClient} />
              </a>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
