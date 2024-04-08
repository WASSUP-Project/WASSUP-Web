"use client";

import styles from "./Support.module.css";
import FAQ from "@/containers/support/contents/FAQ";
import Inquiry from "@/containers/support/contents/Inquiry";
import MyInquiry from "@/containers/support/contents/MyInquiry";
import React, { useState } from "react";

export default function Support() {
  const [activeMenu, setActiveMenu] = useState<string>("faq");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className={styles.supportContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.leftNav}>
          <h1 className={styles.navTitle}>고객 지원</h1>
          <ul>
            <li
              className={activeMenu === "faq" ? styles.active : ""}
              onClick={() => handleMenuClick("faq")}
            >
              <a href="#faq">자주 묻는 질문</a>
            </li>
            <li
              className={activeMenu === "inquiry" ? styles.active : ""}
              onClick={() => handleMenuClick("inquiry")}
            >
              <a href="#inquiry">문의하기</a>
            </li>
            <li
              className={activeMenu === "my-inquiries" ? styles.active : ""}
              onClick={() => handleMenuClick("my-inquiries")}
            >
              <a href="#my-inquiries">문의 내역</a>
            </li>
          </ul>
        </div>
        <div className={styles.rightContent}>
          {activeMenu === "faq" && <FAQ />}
          {activeMenu === "inquiry" && <Inquiry />}
          {activeMenu === "my-inquiries" && <MyInquiry />}
        </div>
      </div>
    </div>
  );
}
