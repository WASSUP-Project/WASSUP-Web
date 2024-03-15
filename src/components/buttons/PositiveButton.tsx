import styles from "./PositiveButton.module.css";

function PositiveButton(props: ButtonProps) {
  return <button className={styles.positiveButton}>{props.text}</button>;
}

export default PositiveButton;
