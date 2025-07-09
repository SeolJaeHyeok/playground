async function fetchSSGData() {
  // fetch 기본 동작은 'force-cache' (SSG와 유사)
  // 빌드 시점에 데이터를 가져와 캐시하고 재사용합니다.
  const response = await fetch('https://dogapi.dog/api/v2/groups');
  const result = await response.json();
  return result.data[0].id;
}

export default async function SSGPage() {
  const data = await fetchSSGData();

  return (
    <div>
      <h1>Static-Site Generated Page (App Router)</h1>
      <p>Data fetched at build time: {JSON.stringify(data)}</p>
      <p>이 페이지는 빌드 시점에 데이터가 로드되고 HTML로 미리 생성됩니다.</p>
      {/* 빌드 시간은 고정된 텍스트로 표시될 수 있습니다. */}
      <p>빌드 시간: {new Date().toLocaleString()}</p>
    </div>
  );
}