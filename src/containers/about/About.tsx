"use client";

import React from "react";
import styles from "./About.module.css";
import Image from "next/image";

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wassup 제품 소개</h1>

      <section className={styles.feature}>
        <h2 className={styles.featureTitle}>1. 그룹 기능</h2>
        <ul className={styles.featureList}>
          <li>그룹을 생성할 수 있습니다.</li>
          <li>대표 이미지를 설정할 수 있습니다.</li>
          <li>
            가입을 희망하는 인원에게 초대 메시지를 보내면 가입 페이지를 통해
            그룹에 가입 신청을 보낼 수 있습니다.
          </li>
          <Image
            src="/group.png"
            alt="Image of something relevant"
            width={900}
            height={450}
          ></Image>
        </ul>
      </section>

      <section className={styles.feature}>
        <h2 className={styles.featureTitle}>2. 인원 관리</h2>
        <ul className={styles.featureList}>
          <li>
            초대 메시지에는 가입 페이지 링크와 그룹 고유 코드가 포함됩니다.
          </li>
          <li>
            가입 페이지에서 멤버의 정보와 고유 코드를 통해 가입 신청이
            가능합니다.
          </li>
          <li>
            관리자는 가입 신청한 멤버들을 볼 수 있으며, 수락 또는 거절할 수
            있습니다.
          </li>
          <li>인원의 정보를 수정하거나 개인 메시지를 보낼 수 있습니다.</li>
          <Image
            src="/groupMember.png"
            alt="Image of something relevant"
            width={900}
            height={450}
          ></Image>
        </ul>
      </section>

      <section className={styles.feature}>
        <h2 className={styles.featureTitle}>3. 출결 관리</h2>
        <ul className={styles.featureList}>
          <li>
            비밀번호 4자리를 통해 데스크에서 출석할 수 있도록 하는 화면 링크를
            제공합니다.
          </li>
          <li>출석이 완료되면 등록된 전화번호로 알림 메시지가 전송됩니다.</li>
          <li>출석률이나 미출석 인원을 관리 페이지에서 확인할 수 있습니다.</li>
          <Image
            src="/groupAttendance.png"
            alt="Image of something relevant"
            width={900}
            height={450}
          ></Image>
        </ul>
      </section>

      <section className={styles.feature}>
        <h2 className={styles.featureTitle}>4. 공지사항 작성</h2>
        <ul className={styles.featureList}>
          <li>
            멤버들에게 일괄적으로 공지사항을 작성해서 문자로 발송할 수 있습니다.
          </li>
          <li>관리자는 보낸 이력을 확인할 수 있습니다.</li>
          <Image
            src="/groupNotice.png"
            alt="Image of something relevant"
            width={900}
            height={450}
          ></Image>
        </ul>
      </section>
    </div>
  );
}
