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
        <div className="d-flex flex-row bd-highlight mb-3 flex-wrap">
          <div className="p-2 bd-highlight">
            <CategoryCard name="Sports Photography" link="sports" />
          </div>
          <div className="p-2 bd-highlight">
            <CategoryCard name="Portrait Photography" link="sports" />
          </div>
          <div className="p-2 bd-highlight">
            <CategoryCard name="Wedding Photography" link="sports" />
          </div>
          <div className="p-2 bd-highlight">
            <CategoryCard
              img="/images/wedding.png"
              name="Family Photography"
              link="family"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
