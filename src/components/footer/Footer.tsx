import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.frameContainer}>
        <div className={styles.frame}>
          <div className={styles.title}>회사</div>
          <div className={styles.subTitle}>소개</div>
          <div className={styles.subTitle}>함께하기</div>
        </div>
        <div className={styles.frame}>
          <div className={styles.title}>지원</div>
          <div className={styles.subTitle}>고객 센터</div>
          <div className={styles.subTitle}>자주 묻는 질문</div>
        </div>
        <div className={styles.frame}>
          <div className={styles.title}>정책</div>
          <div className={styles.subTitle}>개인정보 처리방침</div>
          <div className={styles.subTitle}>이용약관</div>
        </div>
        <div className={styles.frame}>
          <div className={styles.title}>팔로우</div>
          <div className={styles.subTitle}>페이스북</div>
          <div className={styles.subTitle}>인스타그램</div>
        </div>
      </div>
      <div className={styles.copyRightContainer}>
        <div className={styles.copyRight}>© 2024 - All rights reserved</div>
      </div>
    </div>
  );
}

export default Footer;
