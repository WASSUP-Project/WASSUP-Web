/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import Footer from "@/components/footer/Footer";
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

type menuType = "about" | "BillPolicy" | "Support";

export default function Main() {
  const admin = useRecoilValue(adminState);
  const setAdmin = useSetRecoilState(adminState);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<menuType>("about");

  useEffect(() => {
    if (admin != null) {
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
      default:
        return <About />;
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
                  <Link href="/" onClick={() => handleMenuClick("about")}>
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

          {selectedMenu !== "Support" && <Footer />}
        </div>
      )}
    </>
  );
}
