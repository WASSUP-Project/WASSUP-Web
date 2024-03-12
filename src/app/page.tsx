import Image from "next/image";
import styles from "./page.module.css";
import Main from "../containers/main/Main";

export default function Home() {
  return (
    <main className={styles.main}>
      <Main />
    </main>
  );
}
