import EventSelection from "../../components/EventSelection";
import styles from "../../styles/Home.module.css";

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className="container" style={{ width: "100vw" }}>
        <div className="row">
          <div className="col-md-9">
            <h3>Jack's Images</h3>
            <div className="row">
              <EventSelection />
            </div>
          </div>
          <div className="col-md-3">Cerd</div>
        </div>
      </div>
    </div>
  );
}
