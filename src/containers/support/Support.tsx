"use client";

import Nav from "@/components/nav/Nav";
import styles from "./Support.module.css";
import FAQ from "@/containers/support/contents/FAQ";
import Inquiry from "@/containers/support/contents/Inquiry";
import MyInquiry from "@/containers/support/contents/MyInquiry";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getAdminName } from "@/services/admin/admin";
import { logout } from "@/services/login/login";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import { tokenState } from "@/states/token";
import { adminState } from "@/states/admin";

export default function Support() {
  const [activeMenu, setActiveMenu] = useState<string>("faq");
  const accessToken = useRecoilValue(tokenState);
  const [admin, setAdmin] = useRecoilState(adminState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    if (admin?.id != null) {
      setIsLoading(false);
      return;
    }

    const response = getAdminName();
    response
      .then((data) => {
        setAdmin(
          data
            ? {
                id: data.id,
                name: data.name,
                phoneNumber: data.phoneNumber,
              }
            : null
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("[Error] 관리자 정보 불러오기 실패:", error);
        setIsLoading(false);
      });

    setIsLoading(true);
  }, [accessToken]);

  function requestLogout() {
    logout();
    window.location.href = "/";
  }

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className={styles.supportContainer}>
      {isLoading && (
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <Nav
              textButtonComponent={
                admin
                  ? () => (
                      <Dropdown>
                        <DropdownTrigger>{admin.name}</DropdownTrigger>
                        <DropdownMenu
                          onAction={(key) => {
                            if (key == "logout") {
                              requestLogout();
                            }
                            if (key == "my_info") {
                              window.location.href = "/profile";
                            }
                          }}
                        >
                          <DropdownItem key="my_info">내 정보</DropdownItem>
                          <DropdownItem
                            key="logout"
                            className="text-danger"
                            color="danger"
                          >
                            로그아웃
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    )
                  : () => <Link href="/login">로그인</Link>
              }
              buttonComponent={
                admin
                  ? () => (
                      <a href="/group" className={styles.button}>
                        내 그룹
                      </a>
                    )
                  : () => (
                      <a href="/signup" className={styles.button}>
                        회원가입
                      </a>
                    )
              }
            />
          </div>

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
        </>
      )}
    </div>
  );
}
