import Link from "next/link";
import styles from "./Nav.module.css";
import PositiveButton from "../buttons/PositiveButton";
import TextButton from "../buttons/TextButton";

type navProps = {
  text: string;
  positiveText: string;
};

function Nav(props: navProps) {
  return (
    <div className={styles.header}>
      <Link href="/" className={styles.logo}>
        WASSUP
      </Link>
      <div className={styles.navItems}>
        <div className={styles.navItem}>
          <Link href="/about" className={styles.navItemText}>
            제품 소개
          </Link>
          <div className={styles.navItemIcon} />
        </div>
        <div className={styles.navItem}>
          <Link href="/policy/bill" className={styles.navItemText}>
            요금 정책
          </Link>
          <div className={styles.navItemIcon} />
        </div>
        <div className={styles.navItem}>
          <Link href="/support" className={styles.navItemText}>
            고객 지원
          </Link>
          <div className={styles.navItemIcon} />
        </div>
      </div>
      <div className={styles.auth}>
        <Link href="/login" className={styles.authItem}>
          <TextButton text={props.text} />
        </Link>
        <Link href="/signup" className={styles.authItem}>
          <PositiveButton text={props.positiveText} />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
