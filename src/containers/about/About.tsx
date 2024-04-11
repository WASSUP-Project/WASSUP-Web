"use client";

import React from "react";
import Spacer from "@/components/Spacer";
import PositiveButton from "@/components/buttons/PositiveButton";
import styles from "./About.module.css";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Spacer />
      <div className={styles.mainContainer_white}>
        <div className={styles.title}>
          스마트 출결 파트너
          <br />
          WASSUP
        </div>
        <div className={styles.message}>실시간 등하원 안심 메시지</div>
      </div>
      <Spacer />
      <div className={styles.mainContainer_gray}>
        <div className={styles.content1}>
          <div className={styles.content1_1}>
            <h1 className={styles.content1Title}>스마트한 출결관리</h1>
            <p className={styles.content1Description}>
              얼굴 인식으로 편하게 출결을 관리하세요. <br />
              안심 등하원 메시지로 자녀의 출결을 확인하세요
            </p>
            <Link href="/group">
              <PositiveButton text="그룹 미리보기" />
            </Link>
          </div>
          <div>
            <Image
              src="/image.png"
              alt="Image of something relevant"
              width={500}
              height={250}
              className={styles.content1_2}
            />
          </div>
        </div>
      </div>
      <Spacer />
      <div className={styles.mainContainer_white}>
        <div className={styles.semiTitle}>쉽고 간편한 기능들</div>
        <div>
          <Image
            src="/image1.png"
            alt="Image of something relevant"
            width={1300}
            height={650}
          ></Image>
        </div>
      </div>
      <Spacer />
      <div className={styles.mainContainer_gray}>
        <div className={styles.banner}>
          <Image
            src="/image2.png"
            alt="Image of something relevant"
            width={1000}
            height={200}
          ></Image>
        </div>
      </div>
    </>
  );
}