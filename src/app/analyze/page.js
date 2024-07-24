import styles from "@/styles/Analyze.module.css";
import UploadForm from "@/components/upload-form.js";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Submit a sample for <span>analysis</span>
        </h1>
        <UploadForm />
      </main>
    </div>
  );
}
