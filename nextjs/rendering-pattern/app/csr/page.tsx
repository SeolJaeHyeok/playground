'use client';

import { useState, useEffect } from 'react';

export default function CSRPage() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dogapi.dog/api/v2/groups'); // API 엔드포인트에서 데이터 가져오기
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data[0].id);
      } catch (e: unknown) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Client-Side Rendered Page (App Router)</h1>
      <p>Data fetched from API: {JSON.stringify(data)}</p>
      <p>이 페이지는 브라우저에서 JavaScript를 통해 데이터가 로드되고 렌더링됩니다.</p>
    </div>
  );
}