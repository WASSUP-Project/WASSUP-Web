"use client";

import styles from "./Support.module.css";
import FAQ from "@/containers/support/contents/FAQ";
import Inquiry from "@/containers/support/contents/Inquiry";
import React, { useEffect, useState } from "react";
import ChannelService from "@/containers/support/services/ChannelService";
import { useRecoilValue } from "recoil";
import { adminState } from "@/states/admin";

export default function Support() {
  const admin = useRecoilValue(adminState);
  const [activeMenu, setActiveMenu] = useState<string>("faq");

  useEffect(() => {
    const channelTalk = new ChannelService();
    if (admin == null) {
      channelTalk.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
      });
    } else {
      const { id, name, phoneNumber } = admin;
      channelTalk.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
        memberId: id,
        profile: {
          name,
          mobileNumber: phoneNumber,
        },
      });
    }
    return () => {
      channelTalk.shutdown();
    };
  }, [admin]);

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
              <a href="#inquiry">비즈니스 문의</a>
            </li>
            {/* 채널톡으로 변경함 */}
            {/* <li
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
            </li> */}
          </ul>
        </div>
        <div className={styles.rightContent}>
          {activeMenu === "faq" && <FAQ />}
          {activeMenu === "inquiry" && <Inquiry />}
        </div>
      </div>
    </div>
  );
}
