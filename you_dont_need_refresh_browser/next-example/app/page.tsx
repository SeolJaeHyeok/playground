"use client"

import styles from "./page.module.css";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/service-worker.js");
          console.log("Service Worker registration successful with scope: ", registration.scope);

          // 서비스 워커 업데이트 확인
          registration.onupdatefound = () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.onstatechange = () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log("New content is available; please refresh.");
                  } else {
                    console.log("Content is cached for offline use.");
                  }
                }
              };
            }
          };

          // 강제로 업데이트 확인
          await registration.update();
        } catch (err) {
          console.log("Service Worker registration failed: ", err);
        }
      }
    };

    registerServiceWorker();
  }, []);

  return (
    <div className={styles.page}>
      실시간 바뀌나?
    </div>
  );
}
