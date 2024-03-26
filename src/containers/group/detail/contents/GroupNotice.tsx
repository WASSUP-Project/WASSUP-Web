import Image from "next/image";
import styles from "./GroupNotice.module.css";

export default function GroupNotice() {
  return (
    <>
      <h1 className={styles.title}>공지사항</h1>
      <div className={styles.container}>
        <div>
          <Image
            src="/noticeEx.png"
            alt="Image of something relevant"
            width={560}
            height={250}
          />
        </div>
      </div>
    </>
  );
}
