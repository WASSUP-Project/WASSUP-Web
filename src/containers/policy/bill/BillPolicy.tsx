/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Spacer from "@/components/Spacer";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";

import React, { useState, useEffect } from "react";
import { getAdminName } from "@/services/admin/admin";
import { useRecoilState } from "recoil";
import { logout } from "@/services/login/login";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Link,
} from "@nextui-org/react";
import styles from "./BillPolicy.module.css";
import { adminState } from "@/states/admin";

export default function BillPolicy() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
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
      <div className={styles.container}>
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

            <div className={styles.content}>
              <Spacer height={7} />

              <div className={styles.content_white}>
                <div className={styles.title}>요금 정책</div>
              </div>

              <Spacer height={5} />

              <div className={styles.bill_container}>
                <div className={styles.bill_info}>
                  <Card className="max-w-[400px]">
                    <CardHeader className={styles.card_header}>
                      <div className={styles.card}>
                        <p className="text-lg">
                          <b>Free</b>
                        </p>
                        <p className="text-sm">간단한 그룹 생성</p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className={styles.card_body}>
                      <div className={styles.card}>
                        <b>무료</b>로 시작할 수 있습니다. <br />
                        <b>그룹 생성</b>이 가능합니다. <br />
                        <b>최대 30명</b>의 인원을 추가할 수 있습니다. <br />
                        <b>출결 관리 기능</b>을 사용할 수 있습니다. <br />
                        <b>그룹 관리 기능</b>을 사용할 수 있습니다.
                      </div>
                    </CardBody>
                  </Card>

                  <Spacer height={1} />

                  <Card className={styles.pro_card}>
                    <CardHeader className={styles.card_header}>
                      <div className={styles.card}>
                        <p className="text-lg">
                          <div className={styles.pro_title}>
                            <b>Pro</b>
                          </div>
                        </p>
                        <p className="text-sm">고급 그룹 관리</p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className={styles.card_body}>
                      <div className={styles.card}>
                        <b>월 4,900원</b>으로 시작할 수 있습니다. <br />
                        <b>그룹 생성</b>이 가능합니다. <br />
                        <b>최대 200명</b>의 인원을 추가할 수 있습니다. <br />
                        <b>출결 관리 기능</b>을 사용할 수 있습니다. <br />
                        <b>고급 그룹 관리 기능</b>을 사용할 수 있습니다. <br />
                        <b>안심 등하원 메시지</b>를 사용할 수 있습니다.
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <Spacer height={7} />
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
