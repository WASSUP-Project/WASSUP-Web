import styles from "./page.module.css";
import Main from "../containers/main/Main";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Main />
    </main>
  );
}
