/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import Spacer from "@/components/Spacer";
import PositiveButton from "@/components/buttons/PositiveButton";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";
import styles from "./Main.module.css";
import Image from "next/image";
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
import { useRecoilValue, useRecoilState } from "recoil";
import { tokenState } from "@/states/token";
import { adminState } from "@/states/admin";

export default function Main() {
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

          <Footer />
        </div>
      )}
    </>
  );
}
