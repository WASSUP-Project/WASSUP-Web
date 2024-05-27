"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import Nav from "@/components/nav/Nav";
import BillPolicy from "@/containers/policy/bill/BillPolicy";
import Support from "@/containers/support/Support";
import About from "@/containers/about/About";
import Home from "./contents/Home";
import { getAdminName } from "@/services/admin/admin";
import { logout } from "@/services/login/login";
import { adminState } from "@/states/admin";
import styles from "./Main.module.css";

type MenuType = "Home" | "About" | "BillPolicy" | "Support";

export default function Main() {
  const admin = useRecoilValue(adminState);
  const setAdmin = useSetRecoilState(adminState);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<MenuType>("Home");

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const data = await getAdminName();
        setAdmin(
          data
            ? { id: data.id, name: data.name, phoneNumber: data.phoneNumber }
            : null
        );
      } catch (error) {
        console.error("[Error] 관리자 정보 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (localStorage.getItem("accessToken") && !admin) {
      fetchAdminName();
    } else {
      setIsLoading(false);
    }
  }, [admin, setAdmin]);

  const requestLogout = () => {
    logout();
    setAdmin(null);
    window.location.href = "/";
  };

  const renderMenu = () => {
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
  };

  const renderFooter = () => (
    <div className={styles.footer}>
      <div className={styles["footer__frame-container"]}>
        <FooterFrame title="와썹">
          <FooterLink onClick={() => setSelectedMenu("About")}>
            제품 소개
          </FooterLink>
          <FooterExternalLink href="https://fern-lint-0a9.notion.site/da9cd8fff1e2438dba7a39c1a6a38309?pvs=4">
            인원 소개
          </FooterExternalLink>
        </FooterFrame>
        <FooterFrame title="지원">
          <FooterLink onClick={() => setSelectedMenu("Support")}>
            자주 묻는 질문
          </FooterLink>
        </FooterFrame>
        <FooterFrame title="정책">
          <FooterLink onClick={() => setSelectedMenu("BillPolicy")}>
            요금정책
          </FooterLink>
          <FooterExternalLink href="https://fern-lint-0a9.notion.site/Wassup-bb76f7f2211146888903a69279fdc1d9?pvs=4">
            개인정보 처리방침
          </FooterExternalLink>
        </FooterFrame>
        <FooterFrame title="사용">
          <FooterExternalLink href="/signup">회원가입</FooterExternalLink>
          <FooterExternalLink href="/login">로그인</FooterExternalLink>
        </FooterFrame>
      </div>
      <div className={styles["footer__copy-right-container"]}>
        <div className={styles["footer__copy-right"]}>
          © 2024 - All rights reserved Wassup
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      ) : (
        <div style={{ overflow: "scroll" }}>
          <Nav
            contentComponents={[
              () => (
                <NavLink href="/" onClick={() => setSelectedMenu("About")}>
                  제품 소개
                </NavLink>
              ),
              () => (
                <NavLink href="/" onClick={() => setSelectedMenu("BillPolicy")}>
                  요금 정책
                </NavLink>
              ),
              () => (
                <NavLink href="/" onClick={() => setSelectedMenu("Support")}>
                  고객 지원
                </NavLink>
              ),
            ]}
            textButtonComponent={
              admin
                ? () => (
                    <Dropdown>
                      <DropdownTrigger>{admin.name}</DropdownTrigger>
                      <DropdownMenu
                        onAction={(key) =>
                          key === "logout"
                            ? requestLogout()
                            : (window.location.href = "/profile")
                        }
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
          {renderMenu()}
          {selectedMenu !== "Support" && renderFooter()}
        </div>
      )}
    </>
  );
}

function NavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={onClick}>
      {children}
    </Link>
  );
}

function FooterFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles["footer__frame"]}>
      <div className={styles["footer__title"]}>{title}</div>
      {children}
    </div>
  );
}

function FooterLink({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={styles["footer__subtitle"]} onClick={onClick}>
      {children}
    </div>
  );
}

function FooterExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div className={styles["footer__subtitle"]}>{children}</div>
    </Link>
  );
}
