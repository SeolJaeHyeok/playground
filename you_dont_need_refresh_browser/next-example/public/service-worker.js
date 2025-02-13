// 설치 이벤트: 서비스 워커 설치 시 캐시할 파일들을 미리 저장
self.addEventListener('install', event => {
  console.log('install event triggered', event);

});

// 활성화 이벤트: 오래된 캐시 제거 및 컨트롤 즉시 획득
self.addEventListener('activate', event => {
  console.log('activate event triggered', event);
});

// fetch 이벤트: 네트워크 요청 가로채기 - 캐시된 파일 우선 제공
self.addEventListener('fetch', event => {
  console.log('fetch event triggered', event);
});
