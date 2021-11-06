import styles from "../styles/Home.module.css";
import Link from "next/link";
import ClientCard from "../components/ClientCard";

export default function Clients() {
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
        <ClientCard />
      </section>
    </div>
  );
}
