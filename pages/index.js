import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Content } from "../components/Content";

export default function Home() {
  return (
    <div className={styles.container}>
      <Content />
    </div>
  );
}
