import Image from "next/image";

export default function CategoryCard({ name, link }) {
  return (
    <div className="card" style={{ width: "12.5rem" }}>
      <div className="card-bd">
        <h6 className="card-title">{name}</h6>
      </div>
    </div>
  );
}
