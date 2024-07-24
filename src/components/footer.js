import styles from "@/styles/Index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://ufpr.br/">
        <img src="/ufpr.png" className={styles.logo} />
      </a>
      <a href="https://secret.inf.ufpr.br/">
        <img src="/secret.png" className={styles.logo} />
      </a>
    </footer>
  );
}
