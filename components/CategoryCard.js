import Image from "next/image";

export default function CategoryCard({ name, link }) {
  return (
    <div className="" style={{ width: "12.5rem" }}>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          {name}
        </label>
      </div>
    </div>
  );
}
