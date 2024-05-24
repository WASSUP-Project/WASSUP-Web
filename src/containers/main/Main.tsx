/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import Nav from "@/components/nav/Nav";
import styles from "./Main.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAdminName } from "@/services/admin/admin";
import { logout } from "@/services/login/login";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminState } from "@/states/admin";
import BillPolicy from "@/containers/policy/bill/BillPolicy";
import Support from "@/containers/support/Support";
import About from "@/containers/about/About";
import Home from "./contents/Home";

type menuType = "Home" | "About" | "BillPolicy" | "Support";

export default function Main() {
  const admin = useRecoilValue(adminState);
  const setAdmin = useSetRecoilState(adminState);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<menuType>("Home");

  useEffect(() => {
    if (admin == null) {
      setIsLoading(false);
      return;
    }

    const response = getAdminName();
    response
      .then((data) => {
        setAdmin(
          data
            ? { id: data.id, name: data.name, phoneNumber: data.phoneNumber }
            : null
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("[Error] 관리자 정보 불러오기 실패:", error);
        setIsLoading(false);
      });

    setIsLoading(true);
  }, [admin]);

  function requestLogout() {
    logout();
    setAdmin(null);
  }

  function handleMenuClick(menu: menuType) {
    setSelectedMenu(menu);
  }

  function renderMenu() {
    switch (selectedMenu) {
      case "BillPolicy":
        return <BillPolicy />;
      case "Support":
        return <Support />;
      case "About":
        return <About />;
      default:
        return <Home />;
    }
  }

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && (
        <div style={{ overflow: "scroll" }}>
          <div>
            <Nav
              contentComponents={[
                () => (
                  <Link href="/" onClick={() => handleMenuClick("About")}>
                    제품 소개
                  </Link>
                ),
                () => (
                  <Link href="/" onClick={() => handleMenuClick("BillPolicy")}>
                    요금 정책
                  </Link>
                ),
                () => (
                  <Link href="/" onClick={() => handleMenuClick("Support")}>
                    고객 지원
                  </Link>
                ),
              ]}
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
                  ? () => <Link href="/group">내 그룹</Link>
                  : () => <Link href="/signup">회원가입</Link>
              }
            />
          </div>

          {renderMenu()}

          {selectedMenu !== "Support" && (
            <div className={styles.footer}>
              <div className={styles.frameContainer}>
                <div className={styles.frame}>
                  <div className={styles.footerTitle}>와썹</div>
                  <div
                    className={styles.footerSubTitle}
                    onClick={() => handleMenuClick("About")}
                  >
                    제품 소개
                  </div>
                  <Link href="https://fern-lint-0a9.notion.site/da9cd8fff1e2438dba7a39c1a6a38309?pvs=4">
                    <div className={styles.footerSubTitle}>인원 소개</div>
                  </Link>
                </div>
                <div className={styles.frame}>
                  <div className={styles.footerTitle}>지원</div>
                  {/* <div className={styles.footerSubTitle}>고객 센터</div> */}
                  <div
                    className={styles.footerSubTitle}
                    onClick={() => handleMenuClick("Support")}
                  >
                    자주 묻는 질문
                  </div>
                </div>
                <div className={styles.frame}>
                  <div className={styles.footerTitle}>정책</div>
                  <div
                    className={styles.footerSubTitle}
                    onClick={() => handleMenuClick("BillPolicy")}
                  >
                    요금정책
                  </div>
                  <Link href="https://fern-lint-0a9.notion.site/Wassup-bb76f7f2211146888903a69279fdc1d9?pvs=4">
                    <div className={styles.footerSubTitle}>
                      개인정보 처리방침
                    </div>
                  </Link>
                </div>
                <div className={styles.frame}>
                  <div className={styles.footerTitle}>사용</div>
                  <Link href={"/signup"}>
                    <div className={styles.footerSubTitle}>회원가입</div>
                  </Link>
                  <Link href={"/login"}>
                    <div className={styles.footerSubTitle}>로그인</div>
                  </Link>
                </div>
              </div>
              <div className={styles.copyRightContainer}>
                <div className={styles.copyRight}>
                  © 2024 - All rights reserved Wassup
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
