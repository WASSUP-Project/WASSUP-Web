import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import styles from "./Nav.module.css";

type navProps = {
  contentComponents: (() => JSX.Element)[];
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
        {props.contentComponents.map((item, index) => (
          <NavbarItem className={styles.nav_item_text} key={index}>
            {item()}
          </NavbarItem>
        ))}
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
