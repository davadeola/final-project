import Image from "next/image";

export default function CategoryCard() {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src="/images/sports.png"
        className="card-img-top"
        alt="..."
        width=".05em"
      />
      <div className="card-body">
        <h5 className="card-title">Sports Photography</h5>
      </div>
    </div>
  );
}
