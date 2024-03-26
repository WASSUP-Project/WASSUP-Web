import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import styles from "./Nav.module.css";

type navProps = {
  textButtonComponent: () => JSX.Element;
  buttonComponent: () => JSX.Element;
};

export default function Nav(props: navProps) {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className={styles.logo}>
          WASSUP
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center" className={styles.nav_content}>
        <NavbarItem>
          <Link href="/about" className={styles.nav_item_text}>
            제품 소개
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/policy/bill" className={styles.nav_item_text}>
            요금 정책
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/support" className={styles.nav_item_text}>
            고객 지원
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className={styles.nav_end_content_item}>
            <div className={styles.text_button}>
              {props.textButtonComponent()}
            </div>
          </div>
        </NavbarItem>
        <NavbarItem>
          <div className={styles.nav_end_content_item}>
            <div className={styles.button}>{props.buttonComponent()}</div>
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
