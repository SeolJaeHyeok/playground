"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";

// 사용자에게 업데이트 알림을 표시하는 함수 예시
function showUpdateNotification() {
  const updateBanner = document.createElement('div');
  updateBanner.innerText = '새로운 업데이트가 있습니다. 클릭하면 새로고침됩니다.';
  updateBanner.style.cssText = `
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #ffeb3b;
    color: #000;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    z-index: 1000;
  `;
  updateBanner.onclick = () => window.location.reload();
  document.body.appendChild(updateBanner);
}

export default function Home() {

//   useEffect(() => {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//           console.log('registration',registration)
//           // 업데이트가 발견되면 onupdatefound 이벤트가 발생합니다.
//           registration.onupdatefound = () => {
//             const installingWorker = registration.installing;
//             if (installingWorker) {
//               installingWorker.onstatechange = () => {
//                 // 새 서비스 워커가 설치된 상태일 때
//                 if (installingWorker.state === 'installed') {
//                 // 이미 활성화된 SW가 있는 경우 => 업데이트가 발생한 경우
//                 if (navigator.serviceWorker.controller) {
//                   console.log('새로운 업데이트가 적용되었습니다.');
//                   // 사용자에게 업데이트 알림 표시 (예: 배너, 모달 등)
//                   showUpdateNotification();
//                 } else {
//                   // 최초 설치 시
//                   console.log('콘텐츠가 오프라인 사용을 위해 캐시되었습니다.');
//                 }
//                 }
//               };
//             };
//           };
//         })
//         .catch(error => console.error('Service Worker 등록 실패:', error));
//     });
//   }
// }, []);


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
      <main className={styles.main}>
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
