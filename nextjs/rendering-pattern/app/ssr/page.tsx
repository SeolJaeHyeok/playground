async function fetchSSRData() {
  // 서버 컴포넌트에서 직접 데이터 페칭 (서버에서 실행됨)
  const response = await fetch('https://dogapi.dog/api/v2/groups', { cache: 'no-store' }); // 매 요청마다 새로 가져오도록 캐시 비활성화
  const result = await response.json();
  console.log('result',result)
  return result.data[0].id;
}

export default async function SSRPage() {
  const data = await fetchSSRData(); // 서버에서 데이터 가져오기

  return (
    <div>
      <h1>Server-Side Rendered Page (App Router)</h1>
      <p>Data fetched from server: {JSON.stringify(data)}</p>
      <p>이 페이지는 서버에서 데이터가 로드되고 렌더링된 후 클라이언트에 전송됩니다.</p>
    </div>
  );
}