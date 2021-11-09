import Image from "next/image";

export default function CategoryCard({ img, name, link }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
    </div>
  );
}
