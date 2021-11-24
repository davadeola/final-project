import React from "react";
import Link from "next/link";
import ClientCard from "../components/ClientCard";

function ClientList({ clients }) {
  return (
    <>
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
    </>
  );
}

export default ClientList;
