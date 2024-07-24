import styles from "@/styles/Index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>SACI</span>!
        </h1>

        <p className={styles.description}>
          A dynamic malware analysis system
        </p>

        <div className={styles.grid}>
          <a href="/analyze" className={styles.card}>
            <h3>Analyze &rarr;</h3>
            <p>Submit a sample.</p>
          </a>

          <a
            href="/about"
            className={styles.card}
          >
            <h3>About &rarr;</h3>
            <p>Read more about SACI.</p>
          </a>

          <a className={styles.cardDisabled}>
            <h3>Database &rarr;</h3>
            <p>View previous analysis logs.</p>
          </a>

          <a
            className={styles.cardDisabled}
          >
            <h3>Login &rarr;</h3>
            <p>
              Login to access more features.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
