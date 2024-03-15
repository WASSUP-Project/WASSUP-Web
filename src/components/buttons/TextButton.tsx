import styles from "./TextButton.module.css";

function TextButton(props: ButtonProps) {
  return <button className={styles.textButton}>{props.text}</button>;
}

export default TextButton;
