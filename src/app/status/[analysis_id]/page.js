"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/Status.module.css";

export default function Status({ params }) {
  const { analysis_id } = params;
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!analysis_id) {
      setError("No analysis ID provided.");
      setIsLoading(false);
      return;
    }

    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/status/${analysis_id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status === "error") {
          setIsLoading(false);
          setError(data.msg);
        } else if (data.status === "running") {
          setIsLoading(false);
          setStatus(data);
        } else {
          setIsLoading(false);
          setStatus(data);
          return true;
        }
      } catch (e) {
        console.error("Failed to fetch status:", e);
        setError(`An error occurred: ${e.message}`);
        setIsLoading(false);
      }
    };

    const statusIntervalId = setInterval(async () => {
      const isDone = await fetchStatus();
      if (isDone) {
        clearInterval(statusIntervalId);
        // redirect to /results/:analysis_id
      }
    }, 1000); // Poll every second

    return () => clearInterval(statusIntervalId);
  }, [analysis_id]);


  if (isLoading) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Loading...
          </h1>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <span>{error}</span>
          </h1>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Status: <span>{status.status}</span>
        </h1>
        <h1 className={styles.description}>Details</h1>
        <div className={styles.description}>
          <div>
            Analysis ID: <span>{analysis_id}</span>
          </div>
          <div>
            Filename: <span>{status.original_filename}</span>
          </div>
          <div>
            Template ID: <span>{status.template_id}</span>
          </div>
          <div>
            VM ID: <span>{status.vm_id}</span>
          </div>
          <div>
            VM IP: <span>{status.vm_ip}</span>
          </div>
          <div>
            Start time: <span>{status.start_time}</span>
          </div>
          <div>
            End time: <span>{status.end_time}</span>
          </div>
        </div>
        <h1 className={styles.description}>Activity Timeline</h1>
        <div className={styles.code}>
          {status.info_messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        {status.error_messages.length > 0 && (
          <>
            <h1 className={styles.description}>Error Messages</h1>
            <div className={styles.code}>
              {status.error_messages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
          </>
        )}
        {status.status === "done" && (
          <>
            <h1 className={styles.description}>Results</h1>
            <button onClick={() => window.location.href = `/results/view/${analysis_id}`}>View</button>
            <button onClick={() => window.location.href = `/results/download/${analysis_id}`}>Download</button>
          </>
        )}
      </main>
    </div>
  );
}
