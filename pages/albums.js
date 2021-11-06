import styles from "../styles/Home.module.css";
import Link from "next/link";
import CategoryCard from "../components/CategoryCard";

export default function Albums() {
  return (
    <div className={`container ${styles.container}`}>
      <section className="row section">
        <div className="col-md-12">
          <h2>Albums</h2>
          <p className="lead">Select a category to view.</p>
        </div>
      </section>
      <div className="">
        <div className="d-flex flex-row bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <CategoryCard />
          </div>
          <div className="p-2 bd-highlight">Flex item 2</div>
          <div className="p-2 bd-highlight">Flex item 3</div>
        </div>
      </div>
    </div>
  );
}
