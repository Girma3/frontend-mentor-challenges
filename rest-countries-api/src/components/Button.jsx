import styles from "./Button.module.css";
function Button({ children, className }) {
  return <button className={styles[className]}>{children}</button>;
}

export default Button;
