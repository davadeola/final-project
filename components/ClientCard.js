import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ClientCard({ client, setSelClient }) {
  return (
    <div
      className="card mb-3"
      style={{
        textAlign: "center",
        padding: ".25em",
        margin: ".5em",
        width: "10em",
        cursor: "pointer",
      }}
    >
      <div className="row">
        <div className="col-md-12">
          <img
            src={client.profilePhoto}
            className="img"
            style={{
              width: "7.5rem",
              height: "7.5rem",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />

          <div className="card-body">
            <h5 className="card-title">{client.name}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex flex-row justify-content-evenly">
          <i>
            <FontAwesomeIcon icon={faPen} />
          </i>
          <i>
            <FontAwesomeIcon icon={faTrash} />
          </i>
        </div>
      </div>
    </div>
  );
}
