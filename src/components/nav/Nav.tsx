import styles from "./Nav.module.css";
import PositiveButton from "../buttons/PositiveButton";
import TextButton from "../buttons/TextButton";

function Nav(props: navProps) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>WASSUP</div>
      <div className={styles.navItems}>
        <div className={styles.navItem}>
          <div className={styles.navItemText}>제품 소개</div>
          <div className={styles.navItemIcon} />
        </div>
        <div className={styles.navItem}>
          <div className={styles.navItemText}>요금 정책</div>
          <div className={styles.navItemIcon} />
        </div>
        <div className={styles.navItem}>
          <div className={styles.navItemText}>고객 지원</div>
          <div className={styles.navItemIcon} />
        </div>
      </div>
      <div className={styles.auth}>
        <TextButton text={props.text} />
        <PositiveButton text={props.positiveText} />
      </div>
    </div>
  );
}

export default Nav;
