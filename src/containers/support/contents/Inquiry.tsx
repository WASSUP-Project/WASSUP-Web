"use client";

import React, { useState } from "react";
import styles from "./Inquiry.module.css";

export default function Inquiry() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert(`
      제목: ${title}
      이메일: ${email}
      문의 내용: ${inquiry}
    `);
  };

  return (
    <div className={styles.inquiryContainer}>
      <h1 className={styles.inquiryTitle}>문의하기</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="title" className={styles.inquiryLabel}>
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.inquiryInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inquiryLabel}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="결과 알림을 받을 이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inquiryInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="inquiry" className={styles.inquiryLabel}>
            문의 내용
          </label>
          <textarea
            id="inquiry"
            name="inquiry"
            placeholder="문의 내용을 자세히 입력해주세요."
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            required
            className={styles.inquiryTextArea}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.inquiryButton}>
            문의하기
          </button>
        </div>
      </form>
    </div>
  );
}
