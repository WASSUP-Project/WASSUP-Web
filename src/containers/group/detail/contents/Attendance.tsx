import { Button } from "@nextui-org/react";
import styles from "./Attendance.module.css";
import Link from "next/link";

export default function Attendance() {
  return (
    <>
      <h1 className={styles.title}>출결 관리</h1>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <Button className={styles.button}>
            <Link href="/attendance">출석</Link>
          </Button>
        </div>
        <div className={styles.summary}>
          <div className={styles.attendanceRate}>금일 출석률: 88% (22/25)</div>
          <div className={styles.absent}>
            <h3 className={styles.absentTitle}>금일 결석 인원</h3>
            <ul className={styles.absentList}>
              <li>김철수</li>
              <li>홍길동</li>
              <li>이영희</li>
            </ul>
          </div>
          <div className={styles.late}>
            <h3 className={styles.lateTitle}>금일 지각 인원</h3>
            <ul className={styles.lateList}>
              <li>박철수</li>
              <li>김영희</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
