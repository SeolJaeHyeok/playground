"use client"

import styles from "./page.module.css";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) =>
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope,
        ),
      )
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);

  return (
    <div className={styles.page}>
      실시간 바뀌나?
    </div>
  );
}
