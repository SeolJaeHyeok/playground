async function fetchISRData() {
  // revalidate를 10초로 설정하여 10초마다 데이터를 다시 가져오도록 합니다.
  const response = await fetch('https://dogapi.dog/api/v2/groups', { next: { revalidate: 10 } });
  const result = await response.json();
  return result.data[0].id;
}

export default async function ISRPage() {
  const data = await fetchISRData();

  return (
    <div>
      <h1>Incremental Static Regeneration Page (App Router)</h1>
      <p>Data fetched with revalidation: {JSON.stringify(data)}</p>
      <p>이 페이지는 빌드 시점에 생성되거나 {`{revalidate: 10}`} 초마다 백그라운드에서 재생성됩니다.</p>
      <p>Last Data Fetch Time: {new Date().toLocaleString()}</p>
    </div>
  );
}