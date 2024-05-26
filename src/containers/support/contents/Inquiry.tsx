"use client";

import { Snippet } from "@nextui-org/react";
import styles from "./Inquiry.module.css";
import Spacer from "@/components/Spacer";

export default function Inquiry() {
  return (
    <div className={styles.inquiryContainer}>
      <h1 className={styles.inquiryTitle}>비즈니스 문의하기</h1>
      <br />
      <p className={styles.subTitle}>✅ 도입에 대한 자세한 논의하기</p>
      <br />
      <p className={styles.subTitle}>✅ 제품 및 솔루션 가격에 대해 상담하기</p>
      <br />
      <p className={styles.subTitle}>✅ 업종별 사용 사례 살펴보기</p>
      <Spacer height={3} />
      <div>
        <Snippet color="primary" size="lg" symbol="">
          skhu.wassup@gmail.com
        </Snippet>
        <Spacer height={3} />
        <p className={styles.inquiryGuide}>
          기업명, 연락처, 예상 인원 규모, 문의 내용 등 자세한 내용을 포함하여
          <br />
          문의해주시면 빠른 도움을 받아보실 수 있습니다.
        </p>
      </div>
    </div>
  );
}
