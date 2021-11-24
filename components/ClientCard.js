export default function ClientCard({ client }) {
  return (
    <div className="card" style={{ width: "40rem" }}>
      <div className="row">
        <div className="col-md-2">
          <img
            src={client.profilePhoto}
            className="img"
            style={{ width: "5em", height: "5em", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title">{client.name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
