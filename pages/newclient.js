import NewClientForm from "../components/NewClientForm";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={`container ${styles.container}`}>
      <div className="row">
        <h2>Enter Your Client’s Details</h2>
      </div>
      <div className="row">
        <div class="col-md-4"></div>
        <div class="col-md-8">
          <form>
            <NewClientForm />
          </form>
        </div>
      </div>
    </div>
  );
}
